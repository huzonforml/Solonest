
import { useState } from "react";
import { useCRM, Lead, LeadStatus } from "../contexts/CRMContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit } from "lucide-react";
import { LeadDetailModal } from "./LeadDetailModal";
import { AddLeadForm } from "./AddLeadForm";

const statusColumns: LeadStatus[] = ['New Leads', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed'];

const statusColors = {
  'New Leads': 'bg-gray-100 text-gray-800 border-gray-200',
  'Qualified': 'bg-blue-100 text-blue-800 border-blue-200',
  'Proposal Sent': 'bg-amber-100 text-amber-800 border-amber-200',
  'Negotiation': 'bg-red-100 text-red-800 border-red-200',
  'Closed': 'bg-green-100 text-green-800 border-green-200'
};

const getStatusButtonClass = (status: LeadStatus) => {
  switch (status) {
    case 'Qualified': return 'status-btn-qualified';
    case 'Proposal Sent': return 'status-btn-proposal';
    case 'Negotiation': return 'status-btn-negotiation';
    case 'Closed': return 'status-btn-closed';
    default: return 'bg-gray-500 hover:bg-gray-600 text-white';
  }
};

const getCardClass = (status: LeadStatus) => {
  switch (status) {
    case 'New Leads': return 'pipeline-card pipeline-card-new';
    case 'Qualified': return 'pipeline-card pipeline-card-qualified';
    case 'Proposal Sent': return 'pipeline-card pipeline-card-proposal';
    case 'Negotiation': return 'pipeline-card pipeline-card-negotiation';
    case 'Closed': return 'pipeline-card pipeline-card-closed';
    default: return 'pipeline-card';
  }
};

export function LeadKanbanBoard() {
  const { leads, updateLead, getTotalPipelineValue } = useCRM();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status);
  };

  const handleStatusChange = (leadId: number, newStatus: LeadStatus) => {
    updateLead(leadId, { status: newStatus });
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailModalOpen(true);
  };

  const totalPipeline = getTotalPipelineValue();

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header with Pipeline Value */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-heading mb-2">Leads Pipeline</h2>
          <p className="text-lg lg:text-xl font-semibold text-section-header">
            Total Pipeline Value: <span className="text-green-600 font-bold">AED {totalPipeline.toLocaleString()}</span>
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700 hover:shadow-neo-glow px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Lead
        </Button>
      </div>

      {/* Mobile Stack View for smaller screens */}
      <div className="block lg:hidden space-y-6 space-x-2">
        {statusColumns.map((status) => {
          const statusLeads = getLeadsByStatus(status);
          const statusValue = statusLeads.reduce((sum, lead) => {
            const value = parseFloat(lead.value.replace(/[^\d.]/g, ''));
            return sum + (isNaN(value) ? 0 : value);
          }, 0);

          return (
            <div key={status} className="w-full">
              <div className="neo-card p-4 p-x-2 mb-4 bg-stage-bg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-primary-heading">{status}</h3>
                  <Badge variant="secondary" className={`${statusColors[status]} font-semibold px-3 py-1`}>
                    {statusLeads.length}
                  </Badge>
                </div>
                <p className="text-base font-semibold text-section-header">
                  AED {statusValue.toLocaleString()} 
                </p>
              </div>

              <div className="space-y-4 ">
                {statusLeads.map((lead) => (
                  <Card key={lead.id} className={getCardClass(lead.status)}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-semibold text-client-name">
                          {lead.name}
                        </CardTitle>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLeadClick(lead);
                            }}
                            className="h-7 w-7 p-0 hover:bg-gray-100"
                          >
                            <Eye size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <p className="text-label font-medium">{lead.company}</p>
                        <p className="text-secondary-info break-all">{lead.email}</p>
                        <p className="text-lg font-bold text-section-header">{lead.value}</p>
                        <p className="text-secondary-info">{lead.source}</p>
                      </div>
                      
                      {/* Status Change Buttons */}
                      {status !== 'Closed' && (
                        <div className="mt-4 flex gap-2 flex-wrap">
                          {statusColumns.slice(statusColumns.indexOf(status) + 1).map((nextStatus) => (
                            <Button
                              key={nextStatus}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(lead.id, nextStatus);
                              }}
                              className={`text-xs h-7 px-2 sm:px-3 font-medium ${getStatusButtonClass(nextStatus)}`}
                            >
                              → {nextStatus.replace(' ', '\n')}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Kanban Board - hidden on mobile */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 overflow-x-auto">
          {statusColumns.map((status) => {
            const statusLeads = getLeadsByStatus(status);
            const statusValue = statusLeads.reduce((sum, lead) => {
              const value = parseFloat(lead.value.replace(/[^\d.]/g, ''));
              return sum + (isNaN(value) ? 0 : value);
            }, 0);

            return (
              <div key={status} className="min-w-[320px]">
                <div className="neo-card p-3 mb-4 bg-stage-bg border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-primary-heading">{status}</h3>
                    <Badge variant="secondary" className={`${statusColors[status]} font-semibold px-3 py-1`}>
                      {statusLeads.length}
                    </Badge>
                  </div>
                  <p className="text-base font-semibold text-section-header">
                    AED {statusValue.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {statusLeads.map((lead) => (
                    <Card key={lead.id} className={getCardClass(lead.status)}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-semibold text-client-name">
                            {lead.name}
                          </CardTitle>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLeadClick(lead);
                              }}
                              className="h-7 w-7 p-0 hover:bg-gray-100"
                            >
                              <Eye size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm">
                          <p className="text-label font-medium">{lead.company}</p>
                          <p className="text-secondary-info">{lead.email}</p>
                          <p className="text-lg font-bold text-section-header">{lead.value}</p>
                          <p className="text-secondary-info">{lead.source}</p>
                        </div>
                        
                        {/* Status Change Buttons */}
                        {status !== 'Closed' && (
                          <div className="mt-4 flex gap-2 flex-wrap">
                            {statusColumns.slice(statusColumns.indexOf(status) + 1).map((nextStatus) => (
                              <Button
                                key={nextStatus}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(lead.id, nextStatus);
                                }}
                                className={`text-xs h-7 px-3 font-medium ${getStatusButtonClass(nextStatus)}`}
                              >
                                → {nextStatus}
                              </Button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedLead(null);
          }}
        />
      )}

      {showAddForm && (
        <AddLeadForm 
          onClose={() => setShowAddForm(false)}
          isOpen={showAddForm}
        />
      )}
    </div>
  );
}

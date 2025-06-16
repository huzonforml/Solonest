
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
  'New Leads': 'bg-blue-100 text-blue-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Proposal Sent': 'bg-yellow-100 text-yellow-800',
  'Negotiation': 'bg-orange-100 text-orange-800',
  'Closed': 'bg-purple-100 text-purple-800'
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
    <div className="space-y-6">
      {/* Header with Pipeline Value */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-neo-700">Leads Pipeline</h2>
          <p className="text-lg font-semibold text-neo-600">
            Total Pipeline Value: <span className="text-green-600">AED {totalPipeline.toLocaleString()}</span>
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700"
        >
          <Plus size={16} />
          Add Lead
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto">
        {statusColumns.map((status) => {
          const statusLeads = getLeadsByStatus(status);
          const statusValue = statusLeads.reduce((sum, lead) => {
            const value = parseFloat(lead.value.replace(/[^\d.]/g, ''));
            return sum + (isNaN(value) ? 0 : value);
          }, 0);

          return (
            <div key={status} className="min-w-[300px]">
              <div className="neo-card p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-neo-700">{status}</h3>
                  <Badge variant="secondary" className={statusColors[status]}>
                    {statusLeads.length}
                  </Badge>
                </div>
                <p className="text-sm text-neo-500">
                  AED {statusValue.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {statusLeads.map((lead) => (
                  <Card key={lead.id} className="neo-card hover:shadow-neo-outset transition-all duration-200 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm font-medium text-neo-700">
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
                            className="h-6 w-6 p-0"
                          >
                            <Eye size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-1 text-xs text-neo-500">
                        <p>{lead.company}</p>
                        <p>{lead.email}</p>
                        <p className="font-medium text-neo-700">{lead.value}</p>
                        <p className="text-neo-400">{lead.source}</p>
                      </div>
                      
                      {/* Status Change Buttons */}
                      {status !== 'Closed' && (
                        <div className="mt-3 flex gap-1 flex-wrap">
                          {statusColumns.slice(statusColumns.indexOf(status) + 1).map((nextStatus) => (
                            <Button
                              key={nextStatus}
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(lead.id, nextStatus);
                              }}
                              className="text-xs h-6 px-2"
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

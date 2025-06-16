
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead, LeadStatus, useCRM, TimelineEvent } from "../contexts/CRMContext";
import { Edit, Save, X, Clock, User, FileText, Calendar } from "lucide-react";

interface LeadDetailModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
}

const statusOptions: LeadStatus[] = ['New Leads', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed'];

export function LeadDetailModal({ lead, isOpen, onClose }: LeadDetailModalProps) {
  const { updateLead, getLeadTimeline } = useCRM();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead>(lead);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    setEditedLead(lead);
    setTimeline(getLeadTimeline(lead.id));
  }, [lead, getLeadTimeline]);

  const handleSave = () => {
    updateLead(lead.id, editedLead);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'created': return <User size={16} />;
      case 'status_changed': return <FileText size={16} />;
      case 'appointment_scheduled': return <Calendar size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-neo-700">
              {isEditing ? 'Edit Lead' : 'Lead Details'}
            </DialogTitle>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave} className="neo-button bg-green-600 text-white">
                    <Save size={16} />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X size={16} />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)} className="neo-button">
                  <Edit size={16} />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Information */}
          <div className="space-y-4">
            <Card className="neo-card">
              <CardHeader>
                <CardTitle className="text-lg text-neo-700">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedLead.name}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-neo-700 font-medium">{lead.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedLead.email}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="text-neo-700">{lead.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedLead.phone}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <p className="text-neo-700">{lead.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={editedLead.company || ''}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, company: e.target.value }))}
                    />
                  ) : (
                    <p className="text-neo-700">{lead.company}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="value">Value</Label>
                  {isEditing ? (
                    <Input
                      id="value"
                      value={editedLead.value}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, value: e.target.value }))}
                    />
                  ) : (
                    <p className="text-neo-700 font-semibold">{lead.value}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="source">Source</Label>
                  {isEditing ? (
                    <Input
                      id="source"
                      value={editedLead.source}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, source: e.target.value }))}
                    />
                  ) : (
                    <p className="text-neo-700">{lead.source}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  {isEditing ? (
                    <Select 
                      value={editedLead.status} 
                      onValueChange={(value: LeadStatus) => setEditedLead(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`
                      ${lead.status === 'New Leads' ? 'bg-blue-100 text-blue-800' : ''}
                      ${lead.status === 'Qualified' ? 'bg-green-100 text-green-800' : ''}
                      ${lead.status === 'Proposal Sent' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${lead.status === 'Negotiation' ? 'bg-orange-100 text-orange-800' : ''}
                      ${lead.status === 'Closed' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {lead.status}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  {isEditing ? (
                    <Textarea
                      id="notes"
                      value={editedLead.notes || ''}
                      onChange={(e) => setEditedLead(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                    />
                  ) : (
                    <p className="text-neo-700">{lead.notes || 'No notes added'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div>
            <Card className="neo-card">
              <CardHeader>
                <CardTitle className="text-lg text-neo-700">Timeline & Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {timeline.length > 0 ? (
                    timeline.map((event) => (
                      <div key={event.id} className="flex gap-3 p-3 neo-card">
                        <div className="flex-shrink-0 mt-1 text-neo-500">
                          {getTimelineIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-neo-700">{event.description}</p>
                          {event.oldValue && event.newValue && (
                            <p className="text-xs text-neo-500">
                              Changed from "{event.oldValue}" to "{event.newValue}"
                            </p>
                          )}
                          <p className="text-xs text-neo-400 mt-1">
                            {formatDate(event.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-neo-500 text-center py-4">No activity recorded yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

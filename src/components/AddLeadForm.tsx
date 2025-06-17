
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead, LeadStatus, useCRM } from "../contexts/CRMContext";
import { toast } from "sonner";

interface AddLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusOptions: LeadStatus[] = ['New Leads', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed'];

export function AddLeadForm({ isOpen, onClose }: AddLeadFormProps) {
  const { addLead } = useCRM();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    value: '',
    source: '',
    status: 'New Leads' as LeadStatus,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.value) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newLead: Lead = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addLead(newLead);
    toast.success("Lead added successfully!");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      value: '',
      source: '',
      status: 'New Leads',
      notes: ''
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neo-800">Add New Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-neo-700">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-neo-700">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-neo-700">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-neo-700">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="value" className="text-neo-700">Value (AED) *</Label>
            <Input
              id="value"
              placeholder="AED 10,000"
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="source" className="text-neo-700">Source</Label>
            <Input
              id="source"
              placeholder="Website, LinkedIn, Referral, etc."
              value={formData.source}
              onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-neo-700">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: LeadStatus) => setFormData(prev => ({ ...prev, status: value }))}
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
          </div>

          <div>
            <Label htmlFor="notes" className="text-neo-700">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700 flex-1">
              Add Lead
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

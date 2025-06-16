
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Lead {
  id: number;
  name: string;
  email: string;
}

interface AddContractFormProps {
  leads: Lead[];
  onAddContract: (contract: any) => void;
}

const AddContractForm = ({ leads, onAddContract }: AddContractFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    leadId: '',
    title: '',
    value: '',
    startDate: '',
    endDate: '',
    status: 'Draft',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLead = leads.find(lead => lead.id.toString() === formData.leadId);
    const newContract = {
      id: Date.now(),
      title: formData.title,
      client: selectedLead?.name || '',
      value: formData.value,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      description: formData.description
    };
    onAddContract(newContract);
    setFormData({
      leadId: '',
      title: '',
      value: '',
      startDate: '',
      endDate: '',
      status: 'Draft',
      description: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="neo-button px-6 py-2 text-neo-700 font-medium">
          New Contract
        </button>
      </DialogTrigger>
      <DialogContent className="neo-card max-w-md border-neo-300 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-neo-700">Create New Contract</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="lead" className="text-neo-600">Select Lead</Label>
            <Select value={formData.leadId} onValueChange={(value) => setFormData({...formData, leadId: value})}>
              <SelectTrigger className="neo-input text-neo-700">
                <SelectValue placeholder="Choose a lead" />
              </SelectTrigger>
              <SelectContent className="neo-card border-neo-300">
                {leads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id.toString()}>
                    {lead.name} ({lead.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title" className="text-neo-600">Contract Title</Label>
            <Input
              id="title"
              className="neo-input text-neo-700"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="value" className="text-neo-600">Contract Value</Label>
            <Input
              id="value"
              placeholder="$25,000"
              className="neo-input text-neo-700"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="startDate" className="text-neo-600">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              className="neo-input text-neo-700"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-neo-600">End Date</Label>
            <Input
              id="endDate"
              type="date"
              className="neo-input text-neo-700"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="status" className="text-neo-600">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger className="neo-input text-neo-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="neo-card border-neo-300">
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-neo-600">Description</Label>
            <Textarea
              id="description"
              className="neo-input text-neo-700 min-h-[80px]"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Contract details..."
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="neo-button flex-1 bg-neo-300 text-neo-700 font-medium">
              Create Contract
            </Button>
            <Button type="button" onClick={() => setOpen(false)} className="neo-button flex-1 text-neo-600">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContractForm;

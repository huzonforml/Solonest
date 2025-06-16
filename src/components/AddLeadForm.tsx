
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddLeadFormProps {
  onAddLead: (lead: any) => void;
}

const AddLeadForm = ({ onAddLead }: AddLeadFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Cold',
    source: 'Website',
    value: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: Date.now(),
      ...formData
    };
    onAddLead(newLead);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'Cold',
      source: 'Website',
      value: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="neo-button px-6 py-2 text-neo-700 font-medium">
          Add Lead
        </button>
      </DialogTrigger>
      <DialogContent className="neo-card max-w-md border-neo-300">
        <DialogHeader>
          <DialogTitle className="text-neo-700">Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-neo-600">Name</Label>
            <Input
              id="name"
              className="neo-input text-neo-700"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-neo-600">Email</Label>
            <Input
              id="email"
              type="email"
              className="neo-input text-neo-700"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-neo-600">Phone</Label>
            <Input
              id="phone"
              className="neo-input text-neo-700"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="source" className="text-neo-600">Source</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
              <SelectTrigger className="neo-input text-neo-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="neo-card border-neo-300">
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Cold Call">Cold Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="value" className="text-neo-600">Potential Value</Label>
            <Input
              id="value"
              placeholder="$10,000"
              className="neo-input text-neo-700"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="neo-button flex-1 bg-neo-300 text-neo-700 font-medium">
              Add Lead
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

export default AddLeadForm;

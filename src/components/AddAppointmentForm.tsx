
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Lead {
  id: number;
  name: string;
  email: string;
}

interface AddAppointmentFormProps {
  leads: Lead[];
  onAddAppointment: (appointment: any) => void;
}

const AddAppointmentForm = ({ leads, onAddAppointment }: AddAppointmentFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    leadId: '',
    date: '',
    time: '',
    type: 'Consultation',
    status: 'Pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLead = leads.find(lead => lead.id.toString() === formData.leadId);
    const newAppointment = {
      id: Date.now(),
      client: selectedLead?.name || '',
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: formData.status
    };
    onAddAppointment(newAppointment);
    setFormData({
      leadId: '',
      date: '',
      time: '',
      type: 'Consultation',
      status: 'Pending'
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="neo-button px-6 py-2 text-neo-700 font-medium">
          New Appointment
        </button>
      </DialogTrigger>
      <DialogContent className="neo-card max-w-md border-neo-300">
        <DialogHeader>
          <DialogTitle className="text-neo-700">Schedule New Appointment</DialogTitle>
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
            <Label htmlFor="date" className="text-neo-600">Date</Label>
            <Input
              id="date"
              type="date"
              className="neo-input text-neo-700"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-neo-600">Time</Label>
            <Input
              id="time"
              type="time"
              className="neo-input text-neo-700"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-neo-600">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger className="neo-input text-neo-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="neo-card border-neo-300">
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Presentation">Presentation</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="neo-button flex-1 bg-neo-300 text-neo-700 font-medium">
              Schedule
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

export default AddAppointmentForm;

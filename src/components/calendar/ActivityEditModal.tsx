
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarActivity } from "./calendarUtils";
import { useCRM } from "@/contexts/CRMContext";

interface ActivityEditModalProps {
  activity: CalendarActivity | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityEditModal = ({ activity, isOpen, onClose }: ActivityEditModalProps) => {
  const { updateContract, updateInvoice } = useCRM();
  const [editData, setEditData] = useState({
    title: activity?.title || "",
    notes: activity?.description || "",
    status: activity?.status || "",
  });

  const handleSave = () => {
    if (!activity) return;

    const id = parseInt(activity.id.split('-')[1]);
    
    switch (activity.type) {
      case 'contract':
        updateContract(id, {
          notes: editData.notes,
          status: editData.status,
        });
        break;
      case 'invoice':
        updateInvoice(id, {
          notes: editData.notes,
          status: editData.status as any,
        });
        break;
    }
    
    onClose();
  };

  const getStatusOptions = () => {
    switch (activity?.type) {
      case 'contract':
        return ['Draft', 'Pending', 'Active', 'Expiring', 'Completed'];
      case 'invoice':
        return ['Draft', 'Sent', 'Paid', 'Overdue'];
      default:
        return [];
    }
  };

  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-neo-600">
            Edit {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              className="neo-input"
              disabled
            />
          </div>


          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={editData.status} onValueChange={(value) => setEditData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="neo-input">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {getStatusOptions().map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={editData.notes}
              onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
              className="neo-input min-h-[100px]"
              placeholder="Add notes about this activity..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="neo-button">
            Cancel
          </Button>
          <Button onClick={handleSave} className="neo-button-primary">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Invoice, InvoiceItem, useCRM } from "../contexts/CRMContext";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface AddInvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddInvoiceForm({ isOpen, onClose }: AddInvoiceFormProps) {
  const { addInvoice, clients } = useCRM();
  const [formData, setFormData] = useState({
    clientId: '',
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    dueDate: '',
    status: 'Draft' as const
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const calculateItemAmount = (quantity: number, rate: number) => {
    return quantity * rate;
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleItemChange = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = calculateItemAmount(
            field === 'quantity' ? Number(value) : updatedItem.quantity,
            field === 'rate' ? Number(value) : updatedItem.rate
          );
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems(prev => [...prev, { id: newId, description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientId || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.some(item => !item.description || item.rate <= 0)) {
      toast.error("Please complete all invoice items");
      return;
    }

    const totalAmount = getTotalAmount();
    const newInvoice: Invoice = {
      id: Date.now(),
      clientId: Number(formData.clientId),
      invoiceNumber: formData.invoiceNumber,
      amount: `AED ${totalAmount.toLocaleString()}`,
      status: formData.status,
      dueDate: formData.dueDate,
      items: items,
      createdAt: new Date().toISOString()
    };

    addInvoice(newInvoice);
    toast.success("Invoice created successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neo-800">Create New Invoice</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="client" className="text-neo-700">Client *</Label>
              <Select 
                value={formData.clientId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} - {client.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="invoiceNumber" className="text-neo-700">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="dueDate" className="text-neo-700">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg text-neo-800">Invoice Items</Label>
              <Button type="button" onClick={addItem} variant="outline" size="sm">
                <Plus size={16} />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-end neo-card p-3">
                  <div className="col-span-5">
                    <Label className="text-neo-700">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      placeholder="Service or product description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-neo-700">Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-neo-700">Rate (AED)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-neo-700">Amount</Label>
                    <Input
                      value={`AED ${item.amount.toLocaleString()}`}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4">
              <div className="neo-card p-4 min-w-[200px]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-neo-700">Total:</span>
                  <span className="text-xl font-bold text-neo-800">
                    AED {getTotalAmount().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700 flex-1">
              Create Invoice
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

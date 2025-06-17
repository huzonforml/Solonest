
import { useState } from "react";
import { Receipt, Plus, Eye, Send, Check, AlertCircle } from "lucide-react";
import { useCRM } from "../contexts/CRMContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddInvoiceForm } from "../components/AddInvoiceForm";

const Invoices = () => {
  const { invoices, clients } = useCRM();
  const [showAddForm, setShowAddForm] = useState(false);

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <Check className="w-4 h-4" />;
      case 'Sent': return <Send className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalInvoiceAmount = invoices.reduce((sum, invoice) => {
    const amount = parseFloat(invoice.amount.replace(/[^\d.]/g, ''));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const paidAmount = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, invoice) => {
      const amount = parseFloat(invoice.amount.replace(/[^\d.]/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

  const pendingAmount = totalInvoiceAmount - paidAmount;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <Receipt className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-800">Invoices</h2>
          <p className="text-neo-600">Manage your billing and payments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="neo-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Total Invoiced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-800">
              AED {totalInvoiceAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              AED {paidAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              AED {pendingAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="neo-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-neo-800">All Invoices</h3>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700"
          >
            <Plus size={16} />
            Create Invoice
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-neo-700">Invoice #</TableHead>
                <TableHead className="text-neo-700">Client</TableHead>
                <TableHead className="text-neo-700">Amount</TableHead>
                <TableHead className="text-neo-700">Status</TableHead>
                <TableHead className="text-neo-700">Due Date</TableHead>
                <TableHead className="text-neo-700">Created</TableHead>
                <TableHead className="text-right text-neo-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-neo-100">
                  <TableCell className="font-medium text-neo-700">{invoice.invoiceNumber}</TableCell>
                  <TableCell className="text-neo-700">{getClientName(invoice.clientId)}</TableCell>
                  <TableCell className="font-semibold text-neo-700">{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(invoice.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neo-700">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-neo-700">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {showAddForm && (
        <AddInvoiceForm 
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Invoices;

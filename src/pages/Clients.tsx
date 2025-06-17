
import { useState } from "react";
import { UserCheck, Plus, Edit, Trash2 } from "lucide-react";
import { useCRM } from "../contexts/CRMContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddClientForm } from "../components/AddClientForm";

const Clients = () => {
  const { clients } = useCRM();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <UserCheck className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-600">Clients</h2>
          <p className="text-neo-500">Manage your client relationships</p>
        </div>
      </div>

      <div className="neo-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-neo-600">All Clients</h3>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700"
          >
            <Plus size={16} />
            Add Client
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-neo-500">Name</TableHead>
                <TableHead className="text-neo-500">Company</TableHead>
                <TableHead className="text-neo-500">Email</TableHead>
                <TableHead className="text-neo-500">Phone</TableHead>
                <TableHead className="text-neo-500">Created</TableHead>
                <TableHead className="text-right text-neo-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-neo-100">
                  <TableCell className="font-medium text-neo-500">{client.name}</TableCell>
                  <TableCell className="text-neo-500">{client.company}</TableCell>
                  <TableCell className="text-neo-500">{client.email}</TableCell>
                  <TableCell className="text-neo-500">{client.phone}</TableCell>
                  <TableCell className="text-neo-500">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 size={14} />
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
        <AddClientForm 
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Clients;

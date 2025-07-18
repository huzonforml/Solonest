
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="neo-card p-3">
          <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-heading">Clients</h2>
          <p className="text-sm sm:text-base text-secondary-info">Manage your client relationships</p>
        </div>
      </div>

      <div className="neo-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-section-header">All Clients</h3>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="neo-button bg-neo-600 text-neo-100 hover:bg-neo-700 w-full sm:w-auto"
          >
            <Plus size={16} />
            Add Client
          </Button>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4">
          {clients.map((client) => (
            <Card key={client.id} className="neo-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-semibold text-client-name">{client.name}</CardTitle>
                    <p className="text-sm text-label">{client.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit size={14} />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <p className="text-secondary-info break-all">{client.email}</p>
                  <p className="text-secondary-info">{client.phone}</p>
                  <p className="text-label">Created: {new Date(client.createdAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-label">Name</TableHead>
                <TableHead className="text-label">Company</TableHead>
                <TableHead className="text-label hidden md:table-cell">Email</TableHead>
                <TableHead className="text-label hidden lg:table-cell">Phone</TableHead>
                <TableHead className="text-label hidden lg:table-cell">Created</TableHead>
                <TableHead className="text-right text-label">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-neo-200">
                  <TableCell className="font-medium text-client-name">{client.name}</TableCell>
                  <TableCell className="text-secondary-info">{client.company}</TableCell>
                  <TableCell className="text-secondary-info hidden md:table-cell">{client.email}</TableCell>
                  <TableCell className="text-secondary-info hidden lg:table-cell">{client.phone}</TableCell>
                  <TableCell className="text-secondary-info hidden lg:table-cell">
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

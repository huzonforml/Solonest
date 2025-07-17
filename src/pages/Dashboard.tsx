
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Calendar, Users, FileText, TrendingUp, DollarSign, Clock, UserCheck, Receipt, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCRM } from "../contexts/CRMContext";

const Dashboard = () => {
  const { leads, appointments, contracts, clients, invoices } = useCRM();

  // Analytics data
  const leadsByStatus = [
    { name: 'New Leads', value: leads.filter(l => l.status === 'New Leads').length, color: '#3b82f6' },
    { name: 'Qualified', value: leads.filter(l => l.status === 'Qualified').length, color: '#10b981' },
    { name: 'Proposal Sent', value: leads.filter(l => l.status === 'Proposal Sent').length, color: '#f59e0b' },
    { name: 'Negotiation', value: leads.filter(l => l.status === 'Negotiation').length, color: '#f97316' },
    { name: 'Closed', value: leads.filter(l => l.status === 'Closed').length, color: '#8b5cf6' }
  ];

  const monthlyData = [
    { month: 'Jan', leads: 12, appointments: 8, contracts: 3 },
    { month: 'Feb', leads: 19, appointments: 12, contracts: 5 },
    { month: 'Mar', leads: 15, appointments: 9, contracts: 4 },
    { month: 'Apr', leads: 22, appointments: 15, contracts: 7 },
    { month: 'May', leads: 28, appointments: 18, contracts: 9 },
    { month: 'Jun', leads: 25, appointments: 16, contracts: 8 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 28000 },
    { month: 'Jun', revenue: 32000 }
  ];

  const totalRevenue = contracts.reduce((sum, contract) => sum + parseFloat(contract.value.replace(/[^\d.]/g, '')), 0);
  const totalInvoices = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace(/[^\d.]/g, '')), 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'Paid').reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace(/[^\d.]/g, '')), 0);
  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue').length;

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date() && new Date(apt.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const recentLeads = leads
    .filter(lead => new Date(lead.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <TrendingUp className="w-6 h-6 text-neo-800" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-800">Dashboard</h2>
          <p className="text-neo-600">Your CRM analytics and insights</p>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-900">Total Leadsa</CardTitle>
            <Users className="h-4 w-4 text-neo-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-800">
              {leads.length}
            </div>
            <p className="text-xs text-neo-500">Active prospects</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Clients</CardTitle>
            <UserCheck className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-800">{clients.length}</div>
            <p className="text-xs text-neo-500">Active clients</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-800">{appointments.length}</div>
            <p className="text-xs text-neo-500">Scheduled meetings</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Contracts</CardTitle>
            <FileText className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-800">{contracts.length}</div>
            <p className="text-xs text-neo-500">Active contracts</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-800">AED {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-neo-500">Total contract value</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Total Invoiced</CardTitle>
            <Receipt className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-neo-800">AED {totalInvoices.toLocaleString()}</div>
            <p className="text-xs text-neo-500">{invoices.length} invoices</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Paid Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">AED {paidInvoices.toLocaleString()}</div>
            <p className="text-xs text-neo-500">Received payments</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-700">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">{overdueInvoices}</div>
            <p className="text-xs text-neo-500">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Status */}
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-800">Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-800">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
                <Bar dataKey="appointments" fill="#10b981" name="Appointments" />
                <Bar dataKey="contracts" fill="#f59e0b" name="Contracts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card className="neo-card">
        <CardHeader>
          <CardTitle className="text-neo-800">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`AED ${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 neo-card">
                    <div>
                      <p className="font-medium text-neo-800">{appointment.client}</p>
                      <p className="text-sm text-neo-600">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neo-700">{appointment.date}</p>
                      <p className="text-xs text-neo-500">{appointment.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neo-600 text-center py-4">No upcoming activities</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 neo-card">
                  <div>
                    <p className="font-medium text-neo-800">{lead.name}</p>
                    <p className="text-sm text-neo-600">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neo-700">{lead.value}</p>
                    <Badge className={`text-xs ${
                      lead.status === 'New Leads' ? 'bg-blue-100 text-blue-800' : 
                      lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                      lead.status === 'Proposal Sent' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-800 flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Invoice Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 neo-card">
                  <div>
                    <p className="font-medium text-neo-800">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-neo-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neo-700">{invoice.amount}</p>
                    <Badge className={`text-xs ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

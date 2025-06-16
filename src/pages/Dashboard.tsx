
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Calendar, Users, FileText, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCRM } from "../contexts/CRMContext";

const Dashboard = () => {
  const { leads, appointments, contracts } = useCRM();

  // Analytics data
  const leadsByStatus = [
    { name: 'Hot', value: leads.filter(l => l.status === 'Hot').length, color: '#ef4444' },
    { name: 'Warm', value: leads.filter(l => l.status === 'Warm').length, color: '#f97316' },
    { name: 'Cold', value: leads.filter(l => l.status === 'Cold').length, color: '#3b82f6' }
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

  const totalRevenue = contracts.reduce((sum, contract) => sum + parseFloat(contract.value.replace('$', '').replace(',', '')), 0);
  const avgDealSize = contracts.length > 0 ? totalRevenue / contracts.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <TrendingUp className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-700">Dashboard</h2>
          <p className="text-neo-500">Your CRM analytics and insights</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-600">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-700">{leads.length}</div>
            <p className="text-xs text-neo-500">Active prospects</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-600">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-700">{appointments.length}</div>
            <p className="text-xs text-neo-500">Scheduled meetings</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-600">Contracts</CardTitle>
            <FileText className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-700">{contracts.length}</div>
            <p className="text-xs text-neo-500">Active contracts</p>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neo-600">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neo-700">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-neo-500">Total contract value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Status */}
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-700">Leads by Status</CardTitle>
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
            <CardTitle className="text-neo-700">Monthly Performance</CardTitle>
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
          <CardTitle className="text-neo-700">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-700">Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 neo-card">
                  <div>
                    <p className="font-medium text-neo-700">{appointment.client}</p>
                    <p className="text-sm text-neo-500">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neo-600">{appointment.date}</p>
                    <p className="text-xs text-neo-500">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-neo-700">Top Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 neo-card">
                  <div>
                    <p className="font-medium text-neo-700">{lead.name}</p>
                    <p className="text-sm text-neo-500">{lead.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neo-600">{lead.value}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lead.status === 'Hot' 
                        ? 'bg-red-100 text-red-800' 
                        : lead.status === 'Warm'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lead.status}
                    </span>
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

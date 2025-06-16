
import { Users } from "lucide-react";

const leads = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    phone: "+1 (555) 123-4567",
    status: "Hot",
    source: "Website",
    value: "$15,000"
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob.wilson@email.com",
    phone: "+1 (555) 987-6543",
    status: "Warm",
    source: "Referral",
    value: "$8,500"
  },
  {
    id: 3,
    name: "Carol Brown",
    email: "carol.brown@email.com",
    phone: "+1 (555) 456-7890",
    status: "Cold",
    source: "LinkedIn",
    value: "$12,000"
  }
];

const Leads = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <Users className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-700">Leads</h2>
          <p className="text-neo-500">Track and manage potential customers</p>
        </div>
      </div>

      <div className="neo-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-neo-700">Active Leads</h3>
          <button className="neo-button px-6 py-2 text-neo-700 font-medium">
            Add Lead
          </button>
        </div>

        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="neo-card p-4 hover:shadow-neo-outset transition-all duration-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-neo-700 mb-1">{lead.name}</h4>
                  <p className="text-neo-500 text-sm">{lead.email}</p>
                  <p className="text-neo-500 text-sm">{lead.phone}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-neo-700">{lead.value}</p>
                  <p className="text-neo-500 text-sm">{lead.source}</p>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leads;

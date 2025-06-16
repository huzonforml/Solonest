
import { Users } from "lucide-react";
import { useCRM } from "../contexts/CRMContext";
import AddLeadForm from "../components/AddLeadForm";

const Leads = () => {
  const { leads, addLead } = useCRM();

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
          <AddLeadForm onAddLead={addLead} />
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

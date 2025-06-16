
import { FileText } from "lucide-react";
import { useCRM } from "../contexts/CRMContext";
import AddContractForm from "../components/AddContractForm";

const Contracts = () => {
  const { contracts, leads, addContract } = useCRM();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <FileText className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-700">Contracts</h2>
          <p className="text-neo-500">Manage client agreements and contracts</p>
        </div>
      </div>

      <div className="neo-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-neo-700">Contract Overview</h3>
          <AddContractForm leads={leads} onAddContract={addContract} />
        </div>

        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="neo-card p-4 hover:shadow-neo-outset transition-all duration-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-neo-700 mb-1">{contract.title}</h4>
                  <p className="text-neo-500 text-sm">{contract.client}</p>
                  <p className="text-neo-500 text-sm">{contract.startDate} - {contract.endDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neo-700 text-lg">{contract.value}</p>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    contract.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : contract.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {contract.status}
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

export default Contracts;

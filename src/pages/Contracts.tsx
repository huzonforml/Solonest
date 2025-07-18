
import { FileText } from "lucide-react";
import { useCRM } from "../contexts/CRMContext";
import AddContractForm from "../components/AddContractForm";

const Contracts = () => {
  const { contracts, leads, addContract } = useCRM();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="neo-card p-3">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-heading">Contracts</h2>
          <p className="text-sm sm:text-base text-secondary-info">Manage client agreements and contracts</p>
        </div>
      </div>

      <div className="neo-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-section-header">Contract Overview</h3>
          <AddContractForm leads={leads} onAddContract={addContract} />
        </div>

        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="neo-card p-4 hover:shadow-neo-outset transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-client-name mb-1">{contract.title}</h4>
                  <p className="text-label text-sm">{contract.client}</p>
                  <p className="text-label text-sm">{contract.startDate} - {contract.endDate}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-section-header text-lg">{contract.value}</p>
                  </div>
                  <div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contracts;


import { Users } from "lucide-react";
import { LeadKanbanBoard } from "../components/LeadKanbanBoard";

const Leads = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <Users className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-600">Leads</h2>
          <p className="text-neo-500">Track and manage potential customers</p>
        </div>
      </div>

      <LeadKanbanBoard />
    </div>
  );
};

export default Leads;

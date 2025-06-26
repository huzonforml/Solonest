
import { Users } from "lucide-react";
import { LeadKanbanBoard } from "../components/LeadKanbanBoard";

const Leads = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="neo-card p-4">
          <Users className="w-7 h-7 text-neo-600" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-primary-heading">Leads</h2>
          <p className="text-lg text-secondary-info mt-1">Track and manage potential customers</p>
        </div>
      </div>

      <LeadKanbanBoard />
    </div>
  );
};

export default Leads;

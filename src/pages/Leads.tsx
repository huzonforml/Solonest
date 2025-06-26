
import { Users } from "lucide-react";
import { LeadKanbanBoard } from "../components/LeadKanbanBoard";

const Leads = () => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-10">
        <div className="neo-card p-3 lg:p-4">
          <Users className="w-6 h-6 lg:w-7 lg:h-7 text-neo-600" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-heading">Leads</h2>
          <p className="text-base lg:text-lg text-secondary-info mt-1">Track and manage potential customers</p>
        </div>
      </div>

      <LeadKanbanBoard />
    </div>
  );
};

export default Leads;

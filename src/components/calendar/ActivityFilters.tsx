
import { Button } from "@/components/ui/button";

interface ActivityFiltersProps {
  activeFilters: {
    appointments: boolean;
    contracts: boolean;
    invoices: boolean;
    leads: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export const ActivityFilters = ({ activeFilters, onFiltersChange }: ActivityFiltersProps) => {
  const filterOptions = [
    { key: 'appointments', label: 'Appointments', color: 'bg-blue-100 text-blue-800' },
    { key: 'contracts', label: 'Contracts', color: 'bg-green-100 text-green-800' },
    { key: 'invoices', label: 'Invoices', color: 'bg-orange-100 text-orange-800' },
    { key: 'leads', label: 'Leads', color: 'bg-purple-100 text-purple-800' },
  ];

  const toggleFilter = (filterKey: string) => {
    onFiltersChange({
      ...activeFilters,
      [filterKey]: !activeFilters[filterKey as keyof typeof activeFilters],
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-neo-500 mr-2">Show:</span>
      {filterOptions.map((option) => (
        <Button
          key={option.key}
          variant="outline"
          size="sm"
          onClick={() => toggleFilter(option.key)}
          className={`neo-button text-xs ${
            activeFilters[option.key as keyof typeof activeFilters]
              ? `${option.color} border-current`
              : 'text-neo-400'
          }`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};


import { Contract, Invoice, Lead } from "@/contexts/CRMContext";

export interface CalendarActivity {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'contract' | 'invoice' | 'lead';
  status?: string;
  notes?: string;
}

export const getCalendarActivities = (
  contracts: Contract[],
  invoices: Invoice[],
  leads: Lead[],
  activeFilters: {
    contracts: boolean;
    invoices: boolean;
    leads: boolean;
  }
): CalendarActivity[] => {
  const activities: CalendarActivity[] = [];

  // Add contract events
  if (activeFilters.contracts) {
    contracts.forEach(contract => {
      // Contract start date
      activities.push({
        id: `contract-start-${contract.id}`,
        title: `Contract Start: ${contract.title}`,
        description: `Value: ${contract.value} | Status: ${contract.status}${contract.notes ? ` | ${contract.notes}` : ''}`,
        date: contract.startDate,
        type: 'contract',
        status: contract.status,
        notes: contract.notes,
      });

      // Contract end date
      activities.push({
        id: `contract-end-${contract.id}`,
        title: `Contract End: ${contract.title}`,
        description: `Value: ${contract.value} | Status: ${contract.status}${contract.notes ? ` | ${contract.notes}` : ''}`,
        date: contract.endDate,
        type: 'contract',
        status: contract.status,
        notes: contract.notes,
      });
    });
  }

  // Add invoice activities
  if (activeFilters.invoices) {
    invoices.forEach(invoice => {
      activities.push({
        id: `invoice-${invoice.id}`,
        title: `Invoice Due: ${invoice.invoiceNumber}`,
        description: `Amount: ${invoice.amount} | Status: ${invoice.status}${invoice.notes ? ` | ${invoice.notes}` : ''}`,
        date: invoice.dueDate,
        type: 'invoice',
        status: invoice.status,
        notes: invoice.notes,
      });
    });
  }

  // Add lead activities
  if (activeFilters.leads) {
    leads.forEach(lead => {
      // Lead creation date
      const createdDate = new Date(lead.createdAt).toISOString().split('T')[0];
      activities.push({
        id: `lead-created-${lead.id}`,
        title: `New Lead: ${lead.name}`,
        description: `Source: ${lead.source} | Value: ${lead.value}${lead.notes ? ` | ${lead.notes}` : ''}`,
        date: createdDate,
        type: 'lead',
        status: lead.status,
        notes: lead.notes,
      });

      // Lead update date (if different from creation)
      if (lead.updatedAt !== lead.createdAt) {
        const updatedDate = new Date(lead.updatedAt).toISOString().split('T')[0];
        activities.push({
          id: `lead-updated-${lead.id}`,
          title: `Lead Updated: ${lead.name}`,
          description: `Status: ${lead.status} | Value: ${lead.value}${lead.notes ? ` | ${lead.notes}` : ''}`,
          date: updatedDate,
          type: 'lead',
          status: lead.status,
          notes: lead.notes,
        });
      }
    });
  }

  // Sort activities by date and time
  return activities.sort((a, b) => {
    const dateComparison = a.date.localeCompare(b.date);
    if (dateComparison !== 0) return dateComparison;
    
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    
    return a.time ? -1 : b.time ? 1 : 0;
  });
};

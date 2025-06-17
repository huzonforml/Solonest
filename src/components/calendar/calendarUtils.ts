
import { Appointment, Contract, Invoice, Lead } from "@/contexts/CRMContext";

export interface CalendarActivity {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'appointment' | 'contract' | 'invoice' | 'lead';
  status?: string;
}

export const getCalendarActivities = (
  appointments: Appointment[],
  contracts: Contract[],
  invoices: Invoice[],
  leads: Lead[],
  activeFilters: {
    appointments: boolean;
    contracts: boolean;
    invoices: boolean;
    leads: boolean;
  }
): CalendarActivity[] => {
  const activities: CalendarActivity[] = [];

  // Add appointments
  if (activeFilters.appointments) {
    appointments.forEach(appointment => {
      activities.push({
        id: `appointment-${appointment.id}`,
        title: `${appointment.type}: ${appointment.client}`,
        description: `Status: ${appointment.status}`,
        date: appointment.date,
        time: appointment.time,
        type: 'appointment',
        status: appointment.status,
      });
    });
  }

  // Add contract events
  if (activeFilters.contracts) {
    contracts.forEach(contract => {
      // Contract start date
      activities.push({
        id: `contract-start-${contract.id}`,
        title: `Contract Start: ${contract.title}`,
        description: `Value: ${contract.value} | Status: ${contract.status}`,
        date: contract.startDate,
        type: 'contract',
        status: contract.status,
      });

      // Contract end date
      activities.push({
        id: `contract-end-${contract.id}`,
        title: `Contract End: ${contract.title}`,
        description: `Value: ${contract.value} | Status: ${contract.status}`,
        date: contract.endDate,
        type: 'contract',
        status: contract.status,
      });
    });
  }

  // Add invoice activities
  if (activeFilters.invoices) {
    invoices.forEach(invoice => {
      activities.push({
        id: `invoice-${invoice.id}`,
        title: `Invoice Due: ${invoice.invoiceNumber}`,
        description: `Amount: ${invoice.amount} | Status: ${invoice.status}`,
        date: invoice.dueDate,
        type: 'invoice',
        status: invoice.status,
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
        description: `Source: ${lead.source} | Value: ${lead.value}`,
        date: createdDate,
        type: 'lead',
        status: lead.status,
      });

      // Lead update date (if different from creation)
      if (lead.updatedAt !== lead.createdAt) {
        const updatedDate = new Date(lead.updatedAt).toISOString().split('T')[0];
        activities.push({
          id: `lead-updated-${lead.id}`,
          title: `Lead Updated: ${lead.name}`,
          description: `Status: ${lead.status} | Value: ${lead.value}`,
          date: updatedDate,
          type: 'lead',
          status: lead.status,
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

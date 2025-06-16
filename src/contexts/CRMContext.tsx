import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LeadStatus = 'New Leads' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Closed';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  value: string;
  company?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  createdAt: string;
}

export interface Invoice {
  id: number;
  clientId: number;
  invoiceNumber: string;
  amount: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: string;
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface TimelineEvent {
  id: number;
  entityType: 'lead' | 'client' | 'appointment' | 'contract' | 'invoice';
  entityId: number;
  type: 'created' | 'updated' | 'status_changed' | 'note_added' | 'appointment_scheduled' | 'contract_signed';
  description: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
  createdBy?: string;
}

export interface Appointment {
  id: number;
  client: string;
  date: string;
  time: string;
  status: string;
  type: string;
  leadId?: number;
  clientId?: number;
}

export interface Contract {
  id: number;
  title: string;
  client: string;
  value: string;
  status: string;
  startDate: string;
  endDate: string;
  leadId?: number;
  clientId?: number;
}

interface CRMContextType {
  leads: Lead[];
  clients: Client[];
  invoices: Invoice[];
  appointments: Appointment[];
  contracts: Contract[];
  timeline: TimelineEvent[];
  addLead: (lead: Lead) => void;
  updateLead: (id: number, updates: Partial<Lead>) => void;
  addClient: (client: Client) => void;
  updateClient: (id: number, updates: Partial<Client>) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: number, updates: Partial<Invoice>) => void;
  addAppointment: (appointment: Appointment) => void;
  addContract: (contract: Contract) => void;
  addTimelineEvent: (event: Omit<TimelineEvent, 'id' | 'createdAt'>) => void;
  getLeadTimeline: (leadId: number) => TimelineEvent[];
  getTotalPipelineValue: () => number;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    phone: "+1 (555) 123-4567",
    status: "New Leads",
    source: "Website",
    value: "AED 15,000",
    company: "Cooper Industries",
    createdAt: "2024-06-10T10:00:00Z",
    updatedAt: "2024-06-10T10:00:00Z"
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob.wilson@email.com",
    phone: "+1 (555) 987-6543",
    status: "Qualified",
    source: "Referral",
    value: "AED 8,500",
    company: "Wilson Corp",
    createdAt: "2024-06-11T14:00:00Z",
    updatedAt: "2024-06-12T09:00:00Z"
  },
  {
    id: 3,
    name: "Carol Brown",
    email: "carol.brown@email.com",
    phone: "+1 (555) 456-7890",
    status: "Proposal Sent",
    source: "LinkedIn",
    value: "AED 12,000",
    company: "Brown Enterprises",
    createdAt: "2024-06-08T16:00:00Z",
    updatedAt: "2024-06-14T11:00:00Z"
  }
];

const initialClients: Client[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 111-2222",
    company: "TechCorp Solutions",
    address: "123 Business St, Dubai, UAE",
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@startupxyz.com",
    phone: "+1 (555) 333-4444",
    company: "StartupXYZ Inc",
    address: "456 Innovation Ave, Abu Dhabi, UAE",
    createdAt: "2024-02-20T10:00:00Z"
  }
];

const initialInvoices: Invoice[] = [
  {
    id: 1,
    clientId: 1,
    invoiceNumber: "INV-2024-001",
    amount: "AED 25,000",
    status: "Sent",
    dueDate: "2024-07-15",
    items: [
      { id: 1, description: "Consulting Services", quantity: 1, rate: 25000, amount: 25000 }
    ],
    createdAt: "2024-06-15T09:00:00Z"
  },
  {
    id: 2,
    clientId: 2,
    invoiceNumber: "INV-2024-002",
    amount: "AED 18,500",
    status: "Draft",
    dueDate: "2024-07-30",
    items: [
      { id: 1, description: "Development Services", quantity: 1, rate: 18500, amount: 18500 }
    ],
    createdAt: "2024-06-16T11:00:00Z"
  }
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    client: "John Smith",
    date: "2024-06-17",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Consultation",
    clientId: 1
  },
  {
    id: 2,
    client: "Sarah Johnson",
    date: "2024-06-17",
    time: "2:00 PM",
    status: "Pending",
    type: "Follow-up",
    clientId: 2,
    leadId: 2
  },
  {
    id: 3,
    client: "Mike Davis",
    date: "2024-06-18",
    time: "11:30 AM",
    status: "Confirmed",
    type: "Consultation"
  }
];

const initialContracts: Contract[] = [
  {
    id: 1,
    title: "Service Agreement - TechCorp",
    client: "TechCorp Solutions",
    value: "AED 25,000",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    clientId: 1
  },
  {
    id: 2,
    title: "Maintenance Contract - StartupXYZ",
    client: "StartupXYZ Inc",
    value: "AED 18,500",
    status: "Pending",
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    clientId: 2
  },
  {
    id: 3,
    title: "Consulting Agreement - BigCorp",
    client: "BigCorp Enterprise",
    value: "AED 45,000",
    status: "Draft",
    startDate: "2024-07-01",
    endDate: "2024-12-31"
  }
];

export const CRMProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  const addTimelineEvent = (event: Omit<TimelineEvent, 'id' | 'createdAt'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setTimeline(prev => [newEvent, ...prev]);
  };

  const addLead = (lead: Lead) => {
    setLeads(prev => [...prev, lead]);
    addTimelineEvent({
      entityType: 'lead',
      entityId: lead.id,
      type: 'created',
      description: `Lead ${lead.name} created`
    });
  };

  const updateLead = (id: number, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const updatedLead = { ...lead, ...updates, updatedAt: new Date().toISOString() };
        
        // Track status changes
        if (updates.status && updates.status !== lead.status) {
          addTimelineEvent({
            entityType: 'lead',
            entityId: id,
            type: 'status_changed',
            description: `Status changed from ${lead.status} to ${updates.status}`,
            oldValue: lead.status,
            newValue: updates.status
          });
        }
        
        return updatedLead;
      }
      return lead;
    }));
  };

  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
    addTimelineEvent({
      entityType: 'client',
      entityId: client.id,
      type: 'created',
      description: `Client ${client.name} created`
    });
  };

  const updateClient = (id: number, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [...prev, invoice]);
    addTimelineEvent({
      entityType: 'invoice',
      entityId: invoice.id,
      type: 'created',
      description: `Invoice ${invoice.invoiceNumber} created`
    });
  };

  const updateInvoice = (id: number, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === id ? { ...invoice, ...updates } : invoice
    ));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
    addTimelineEvent({
      entityType: 'appointment',
      entityId: appointment.id,
      type: 'created',
      description: `Appointment scheduled with ${appointment.client}`
    });
  };

  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
    addTimelineEvent({
      entityType: 'contract',
      entityId: contract.id,
      type: 'created',
      description: `Contract ${contract.title} created`
    });
  };

  const getLeadTimeline = (leadId: number) => {
    return timeline.filter(event => 
      event.entityType === 'lead' && event.entityId === leadId
    );
  };

  const getTotalPipelineValue = () => {
    return leads.reduce((total, lead) => {
      const value = parseFloat(lead.value.replace(/[^\d.]/g, ''));
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  return (
    <CRMContext.Provider value={{
      leads,
      clients,
      invoices,
      appointments,
      contracts,
      timeline,
      addLead,
      updateLead,
      addClient,
      updateClient,
      addInvoice,
      updateInvoice,
      addAppointment,
      addContract,
      addTimelineEvent,
      getLeadTimeline,
      getTotalPipelineValue
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};

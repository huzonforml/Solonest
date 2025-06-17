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
  notes?: string;
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
  notes?: string;
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
  notes?: string;
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
  updateAppointment: (id: number, updates: Partial<Appointment>) => void;
  addContract: (contract: Contract) => void;
  updateContract: (id: number, updates: Partial<Contract>) => void;
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
    notes: "Interested in our premium package",
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
    notes: "Needs proposal by end of month",
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
    notes: "Waiting for feedback on pricing",
    createdAt: "2024-06-08T16:00:00Z",
    updatedAt: "2024-06-14T11:00:00Z"
  },
  {
    id: 4,
    name: "David Smith",
    email: "david.smith@email.com",
    phone: "+1 (555) 321-9876",
    status: "Negotiation",
    source: "Cold Call",
    value: "AED 25,000",
    company: "Smith & Associates",
    notes: "Negotiating contract terms",
    createdAt: "2024-06-15T09:00:00Z",
    updatedAt: "2024-06-16T14:00:00Z"
  },
  {
    id: 5,
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    phone: "+1 (555) 444-5555",
    status: "New Leads",
    source: "Social Media",
    value: "AED 18,000",
    company: "Johnson Consulting",
    notes: "Found us through Facebook ads",
    createdAt: "2024-06-18T13:00:00Z",
    updatedAt: "2024-06-18T13:00:00Z"
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 666-7777",
    status: "Qualified",
    source: "Trade Show",
    value: "AED 22,000",
    company: "Miller Industries",
    notes: "Met at Dubai Tech Expo",
    createdAt: "2024-06-19T16:00:00Z",
    updatedAt: "2024-06-20T10:00:00Z"
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@email.com",
    phone: "+1 (555) 888-9999",
    status: "Closed",
    source: "Referral",
    value: "AED 35,000",
    company: "Lee Enterprises",
    notes: "Successfully closed - premium package",
    createdAt: "2024-06-12T11:00:00Z",
    updatedAt: "2024-06-22T15:00:00Z"
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
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "mike@globaltech.com",
    phone: "+1 (555) 555-6666",
    company: "Global Tech Ltd",
    address: "789 Tech Park, Sharjah, UAE",
    createdAt: "2024-03-10T12:00:00Z"
  }
];

const initialInvoices: Invoice[] = [
  {
    id: 1,
    clientId: 1,
    invoiceNumber: "INV-2024-001",
    amount: "AED 25,000",
    status: "Sent",
    dueDate: "2024-06-25",
    items: [
      { id: 1, description: "Consulting Services", quantity: 1, rate: 25000, amount: 25000 }
    ],
    notes: "First quarter consulting services",
    createdAt: "2024-06-15T09:00:00Z"
  },
  {
    id: 2,
    clientId: 2,
    invoiceNumber: "INV-2024-002",
    amount: "AED 18,500",
    status: "Draft",
    dueDate: "2024-06-30",
    items: [
      { id: 1, description: "Development Services", quantity: 1, rate: 18500, amount: 18500 }
    ],
    notes: "Web development project milestone 1",
    createdAt: "2024-06-16T11:00:00Z"
  },
  {
    id: 3,
    clientId: 3,
    invoiceNumber: "INV-2024-003",
    amount: "AED 12,000",
    status: "Overdue",
    dueDate: "2024-06-20",
    items: [
      { id: 1, description: "Maintenance Services", quantity: 1, rate: 12000, amount: 12000 }
    ],
    notes: "Monthly maintenance - urgent payment required",
    createdAt: "2024-06-01T10:00:00Z"
  },
  {
    id: 4,
    clientId: 1,
    invoiceNumber: "INV-2024-004",
    amount: "AED 8,750",
    status: "Paid",
    dueDate: "2024-06-28",
    items: [
      { id: 1, description: "Additional Services", quantity: 1, rate: 8750, amount: 8750 }
    ],
    notes: "Additional services completed ahead of schedule",
    createdAt: "2024-06-18T14:00:00Z"
  },
  {
    id: 5,
    clientId: 2,
    invoiceNumber: "INV-2024-005",
    amount: "AED 15,000",
    status: "Sent",
    dueDate: "2024-06-26",
    items: [
      { id: 1, description: "Design Services", quantity: 1, rate: 15000, amount: 15000 }
    ],
    notes: "UI/UX design project - phase 1",
    createdAt: "2024-06-17T10:00:00Z"
  },
  {
    id: 6,
    clientId: 3,
    invoiceNumber: "INV-2024-006",
    amount: "AED 22,000",
    status: "Draft",
    dueDate: "2024-07-01",
    items: [
      { id: 1, description: "Integration Services", quantity: 1, rate: 22000, amount: 22000 }
    ],
    notes: "System integration project",
    createdAt: "2024-06-19T15:00:00Z"
  },
  {
    id: 7,
    clientId: 1,
    invoiceNumber: "INV-2024-007",
    amount: "AED 9,500",
    status: "Overdue",
    dueDate: "2024-06-21",
    items: [
      { id: 1, description: "Support Services", quantity: 1, rate: 9500, amount: 9500 }
    ],
    notes: "Technical support - Q2 2024",
    createdAt: "2024-06-05T12:00:00Z"
  },
  {
    id: 8,
    clientId: 2,
    invoiceNumber: "INV-2024-008",
    amount: "AED 31,000",
    status: "Sent",
    dueDate: "2024-06-29",
    items: [
      { id: 1, description: "Development Package", quantity: 1, rate: 31000, amount: 31000 }
    ],
    notes: "Full stack development - milestone 2",
    createdAt: "2024-06-20T08:00:00Z"
  }
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    client: "John Smith",
    date: "2024-06-17",
    time: "10:00",
    status: "Confirmed",
    type: "Consultation",
    clientId: 1,
    notes: "Discuss new project requirements"
  },
  {
    id: 2,
    client: "Sarah Johnson",
    date: "2024-06-17",
    time: "14:00",
    status: "Pending",
    type: "Follow-up",
    clientId: 2,
    leadId: 2,
    notes: "Review proposal feedback"
  },
  {
    id: 3,
    client: "Michael Davis",
    date: "2024-06-18",
    time: "11:30",
    status: "Confirmed",
    type: "Consultation",
    clientId: 3,
    notes: "Technical requirements discussion"
  },
  {
    id: 4,
    client: "Alice Cooper",
    date: "2024-06-19",
    time: "09:00",
    status: "Scheduled",
    type: "Demo",
    leadId: 1,
    notes: "Product demonstration and Q&A"
  },
  {
    id: 5,
    client: "Bob Wilson",
    date: "2024-06-20",
    time: "15:30",
    status: "Confirmed",
    type: "Negotiation",
    leadId: 2,
    notes: "Contract terms negotiation"
  },
  {
    id: 6,
    client: "Carol Brown",
    date: "2024-06-21",
    time: "13:00",
    status: "Tentative",
    type: "Presentation",
    leadId: 3,
    notes: "Final proposal presentation"
  },
  {
    id: 7,
    client: "Emma Johnson",
    date: "2024-06-22",
    time: "10:30",
    status: "Scheduled",
    type: "Initial Meeting",
    leadId: 5,
    notes: "First meeting to understand requirements"
  },
  {
    id: 8,
    client: "Frank Miller",
    date: "2024-06-24",
    time: "16:00",
    status: "Confirmed",
    type: "Consultation",
    leadId: 6,
    notes: "Technical consultation for new project"
  },
  {
    id: 9,
    client: "John Smith",
    date: "2024-06-25",
    time: "09:30",
    status: "Scheduled",
    type: "Progress Review",
    clientId: 1,
    notes: "Monthly progress review meeting"
  },
  {
    id: 10,
    client: "Grace Lee",
    date: "2024-06-26",
    time: "14:30",
    status: "Confirmed",
    type: "Kickoff Meeting",
    leadId: 7,
    notes: "Project kickoff after successful closing"
  },
  {
    id: 11,
    client: "Sarah Johnson",
    date: "2024-06-27",
    time: "11:00",
    status: "Pending",
    type: "Design Review",
    clientId: 2,
    notes: "Review design mockups and feedback"
  },
  {
    id: 12,
    client: "Michael Davis",
    date: "2024-06-28",
    time: "15:00",
    status: "Scheduled",
    type: "Integration Planning",
    clientId: 3,
    notes: "Plan system integration approach"
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
    clientId: 1,
    notes: "Annual service agreement with quarterly reviews"
  },
  {
    id: 2,
    title: "Maintenance Contract - StartupXYZ",
    client: "StartupXYZ Inc",
    value: "AED 18,500",
    status: "Pending",
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    clientId: 2,
    notes: "Pending client signature"
  },
  {
    id: 3,
    title: "Consulting Agreement - BigCorp",
    client: "BigCorp Enterprise",
    value: "AED 45,000",
    status: "Draft",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    notes: "Contract under legal review"
  },
  {
    id: 4,
    title: "Development Contract - Global Tech",
    client: "Global Tech Ltd",
    value: "AED 32,000",
    status: "Active",
    startDate: "2024-03-01",
    endDate: "2024-09-01",
    clientId: 3,
    notes: "6-month development project"
  },
  {
    id: 5,
    title: "Support Agreement - Wilson Corp",
    client: "Wilson Corp",
    value: "AED 15,000",
    status: "Expiring",
    startDate: "2023-06-25",
    endDate: "2024-06-25",
    notes: "Contract expiring soon - renewal needed"
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

  const updateAppointment = (id: number, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === id ? { ...appointment, ...updates } : appointment
    ));
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

  const updateContract = (id: number, updates: Partial<Contract>) => {
    setContracts(prev => prev.map(contract => 
      contract.id === id ? { ...contract, ...updates } : contract
    ));
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
      updateAppointment,
      addContract,
      updateContract,
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

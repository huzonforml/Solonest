
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  value: string;
}

interface Appointment {
  id: number;
  client: string;
  date: string;
  time: string;
  status: string;
  type: string;
}

interface Contract {
  id: number;
  title: string;
  client: string;
  value: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface CRMContextType {
  leads: Lead[];
  appointments: Appointment[];
  contracts: Contract[];
  addLead: (lead: Lead) => void;
  addAppointment: (appointment: Appointment) => void;
  addContract: (contract: Contract) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    phone: "+1 (555) 123-4567",
    status: "Hot",
    source: "Website",
    value: "$15,000"
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob.wilson@email.com",
    phone: "+1 (555) 987-6543",
    status: "Warm",
    source: "Referral",
    value: "$8,500"
  },
  {
    id: 3,
    name: "Carol Brown",
    email: "carol.brown@email.com",
    phone: "+1 (555) 456-7890",
    status: "Cold",
    source: "LinkedIn",
    value: "$12,000"
  }
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    client: "John Smith",
    date: "2024-06-17",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Consultation"
  },
  {
    id: 2,
    client: "Sarah Johnson",
    date: "2024-06-17",
    time: "2:00 PM",
    status: "Pending",
    type: "Follow-up"
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
    value: "$25,000",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-12-15"
  },
  {
    id: 2,
    title: "Maintenance Contract - StartupXYZ",
    client: "StartupXYZ Inc",
    value: "$18,500",
    status: "Pending",
    startDate: "2024-06-01",
    endDate: "2025-06-01"
  },
  {
    id: 3,
    title: "Consulting Agreement - BigCorp",
    client: "BigCorp Enterprise",
    value: "$45,000",
    status: "Draft",
    startDate: "2024-07-01",
    endDate: "2024-12-31"
  }
];

export const CRMProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);

  const addLead = (lead: Lead) => {
    setLeads(prev => [...prev, lead]);
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
  };

  return (
    <CRMContext.Provider value={{
      leads,
      appointments,
      contracts,
      addLead,
      addAppointment,
      addContract
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

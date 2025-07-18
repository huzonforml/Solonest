
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Leads from "./pages/Leads";
import Contracts from "./pages/Contracts";
import PortfolioMaker from "./pages/PortfolioMaker";
import Dashboard from "./pages/Dashboard";
import WebsiteMaker from "./pages/WebsiteMaker";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { CRMProvider } from "./contexts/CRMContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CRMProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Layout><Index /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/leads" element={<Layout><Leads /></Layout>} />
            <Route path="/clients" element={<Layout><Clients /></Layout>} />
            <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
            <Route path="/contracts" element={<Layout><Contracts /></Layout>} />
            <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
            <Route path="/portfolio-maker" element={<Layout><PortfolioMaker /></Layout>} />
            <Route path="/website-maker" element={<Layout><WebsiteMaker /></Layout>} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CRMProvider>
  </QueryClientProvider>
);

export default App;

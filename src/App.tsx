import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import Leads from "./pages/Leads";
import Contracts from "./pages/Contracts";
import PortfolioMaker from "./pages/PortfolioMaker";
import Dashboard from "./pages/Dashboard";
import WebsiteMaker from "./pages/WebsiteMaker";
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
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/portfolio-maker" element={<PortfolioMaker />} />
              <Route path="/website-maker" element={<WebsiteMaker />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </CRMProvider>
  </QueryClientProvider>
);

export default App;

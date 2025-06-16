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
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/portfolio-maker" element={<PortfolioMaker />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </CRMProvider>
  </QueryClientProvider>
);

export default App;


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neo-200">
        <AppSidebar />
        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
            <SidebarTrigger className="neo-button p-2" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-heading">SOLONEST Dashboard</h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

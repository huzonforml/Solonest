
import { Calendar, Users, FileText, User, Palette, BarChart3, Home, Receipt, UserCheck, ChevronDown, CalendarDays } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const mainMenuItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
];

const crmMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Leads",
    url: "/leads",
    icon: Users,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: UserCheck,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Contracts",
    url: "/contracts",
    icon: FileText,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: Receipt,
  },
];

const toolsMenuItems = [
  {
    title: "Portfolio Maker",
    url: "/portfolio-maker",
    icon: User,
  },
  {
    title: "Website Maker",
    url: "/website-maker",
    icon: Palette,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isCRMOpen, setIsCRMOpen] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Logo failed to load, showing fallback');
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <Sidebar className="bg-neo-200 border-r border-neo-300">
      <SidebarHeader className="p-6">
        <div className="neo-card p-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://i.postimg.cc/MHySpVVg/Screenshot-2025-06-16-at-1-29-57-PM.png" 
                alt="Solonest Logo" 
                className="w-8 h-8 object-contain"
                onError={handleLogoError}
                onLoad={() => console.log('Logo loaded successfully')}
              />
              <div 
                className="w-8 h-8 bg-neo-600 text-neo-100 rounded-full flex items-center justify-center font-bold text-lg hidden"
                style={{ display: 'none' }}
              >
                S
              </div>
            </div>
            <h2 className="text-xl font-bold text-neo-900">SOLONEST</h2>
          </div>
          <p className="text-sm text-neo-700 mt-1">Business Management Suite</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-neo-800 font-semibold px-6 py-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2">
                  <SidebarMenuButton
                    asChild
                    className={`neo-button p-3 w-full justify-start gap-3 ${
                      location.pathname === item.url
                        ? "neo-card-pressed text-neo-900 font-semibold"
                        : "text-neo-700 hover:text-neo-900 hover:bg-neo-300"
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* CRM Section */}
        <SidebarGroup>
          <Collapsible open={isCRMOpen} onOpenChange={setIsCRMOpen}>
            <SidebarGroupLabel className="text-neo-800 font-semibold px-6 py-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-neo-900">
                CRM
                <ChevronDown className={`h-4 w-4 transition-transform ${isCRMOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="px-4">
                <SidebarMenu>
                  {crmMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-2">
                      <SidebarMenuButton
                        asChild
                        className={`neo-button p-3 w-full justify-start gap-3 ${
                          location.pathname === item.url
                            ? "neo-card-pressed text-neo-900 font-semibold"
                            : "text-neo-700 hover:text-neo-900 hover:bg-neo-300"
                        }`}
                      >
                        <Link to={item.url}>
                          <item.icon size={20} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
            <SidebarGroupLabel className="text-neo-800 font-semibold px-6 py-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-neo-900">
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="px-4">
                <SidebarMenu>
                  {toolsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-2">
                      <SidebarMenuButton
                        asChild
                        className={`neo-button p-3 w-full justify-start gap-3 ${
                          location.pathname === item.url
                            ? "neo-card-pressed text-neo-900 font-semibold"
                            : "text-neo-700 hover:text-neo-900 hover:bg-neo-300"
                        }`}
                      >
                        <Link to={item.url}>
                          <item.icon size={20} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

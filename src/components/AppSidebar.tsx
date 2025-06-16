
import { Calendar, Users, FileText, User, Palette, BarChart3 } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Leads",
    url: "/leads",
    icon: Users,
  },
  {
    title: "Contracts",
    url: "/contracts",
    icon: FileText,
  },
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

  return (
    <Sidebar className="bg-neo-200 border-r border-neo-300">
      <SidebarHeader className="p-6">
        <div className="neo-card p-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-8 bg-neo-600 rounded-full flex items-center justify-center">
              <span className="text-neo-100 font-bold text-sm">S</span>
            </div>
            <h2 className="text-xl font-bold text-neo-700">Solonest</h2>
          </div>
          <p className="text-sm text-neo-500 mt-1">Business Management Suite</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-neo-600 font-semibold px-6 py-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2">
                  <SidebarMenuButton
                    asChild
                    className={`neo-button p-3 w-full justify-start gap-3 ${
                      location.pathname === item.url
                        ? "neo-card-pressed text-neo-800 font-semibold"
                        : "text-neo-600 hover:text-neo-800 hover:bg-neo-300"
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
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

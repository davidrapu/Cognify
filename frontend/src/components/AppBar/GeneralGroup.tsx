import { CircleGauge, Home, Gamepad2, Info, Mail } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router";

export default function GeneralGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/">
              <SidebarMenuButton tooltip="Home" className="cursor-pointer">
                <Home className="text-sidebar-primary" />
                <span className="tracking-widest">Home</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/games">
              <SidebarMenuButton tooltip="Games" className="cursor-pointer">
                <Gamepad2 className="text-sidebar-primary" />
                <span className="tracking-widest">Games</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/dashboard">
              <SidebarMenuButton tooltip="Dashboard" className="cursor-pointer">
                <CircleGauge className="text-sidebar-primary" />
                <span className="tracking-widest">Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/about">
              <SidebarMenuButton tooltip="About" className="cursor-pointer">
                <Info className="text-sidebar-primary" />
                <span className="tracking-widest">About</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/contact">
              <SidebarMenuButton tooltip="Contact Us" className="cursor-pointer">
                <Mail className="text-sidebar-primary" />
                <span className="tracking-widest">Contact Us</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

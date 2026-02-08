import AppBar from "@/components/AppBar/AppBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PanelRightClose } from "lucide-react";
import { Outlet } from "react-router";

export default function Games() {
  return (
    <div className="w-screen">
      <SidebarProvider>
        <AppBar />
        <SidebarInset>
          <SidebarTrigger className="ml-1 text-foreground">
            <PanelRightClose />
          </SidebarTrigger>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

import AppBar from "@/components/AppBar/AppBar";
import EmptyPage from "@/components/EmptyPage";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PanelRightClose } from "lucide-react";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppBar />
      <SidebarInset>
        <SidebarTrigger>
          <PanelRightClose />
        </SidebarTrigger>
        <EmptyPage />
      </SidebarInset>
    </SidebarProvider>
  );
}

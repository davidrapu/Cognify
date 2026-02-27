import AppBar from "@/components/AppBar/AppBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function Games() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <SidebarProvider>
        <AppBar />
        <SidebarInset className="flex flex-col min-h-screen">
          <div className="flex justify-between pr-2 pt-2 mb-2">
            <SidebarTrigger className="m-1 text-foreground" />
            <Avatar className="border-2 size-9 flex items-center justify-center">
              <AvatarImage src="USER_IMAGE" alt="USER_NAME" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 overflow-y-hidden">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

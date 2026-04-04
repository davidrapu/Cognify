import AppBar from "@/components/AppBar/AppBar";
import PageLoader from "@/components/PageLoader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserAvatar from "@/components/UserAvatar";
import { Suspense } from "react";
import { Outlet } from "react-router";

export default function Games() {
  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <AppBar />
        <SidebarInset className="flex flex-col min-h-screen">
          <div className="flex justify-between pr-2 pt-2 mb-2">
            <SidebarTrigger className="m-1 text-foreground" />
            <UserAvatar size={9} />
          </div>
          <div className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

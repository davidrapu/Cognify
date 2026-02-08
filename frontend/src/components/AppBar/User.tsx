import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router";

export default function User() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to="/profile">
          <SidebarMenuButton
            className="cursor-pointer"
            tooltip="Profile"
            size="lg"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="USER_IMAGE" alt="USER_NAME" />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Joe Don</span>
              <span className="truncate text-xs">joe654@example.com</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

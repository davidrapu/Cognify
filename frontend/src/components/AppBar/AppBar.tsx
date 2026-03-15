import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import Header from "./Header";
import GeneralGroup from "./GeneralGroup";
import GameGroup from "./GameGroup";
import UserProfile from "./UserProfile";

export default function AppBar() {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Header />
        </SidebarHeader>

        <SidebarContent>
          <GeneralGroup />
          <GameGroup />
        </SidebarContent>

        <SidebarFooter>
          <UserProfile />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  );
}

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
import User from "./User";

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
          <User />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  );
}


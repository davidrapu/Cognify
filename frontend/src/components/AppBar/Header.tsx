import { Link } from "react-router";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { BrainCircuit } from "lucide-react";

export default function Header() {
  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Link to="/" className="flex items-center gap-x-2">
              <div className="aspect-square size-8 flex items-center justify-center">
                <BrainCircuit color="#0083a3" />
              </div>
              <span className="font-(family-name:--headings) text-xl tracking-widest">
                COG-NIFY
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
  );
}


import { Link } from "react-router";
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
    Binary, 
    LayoutGrid,
  ListOrdered,    
  Search,         
  Palette,        
  Zap,            
  Play,           
  GitBranch,      
  Puzzle,         
  Calculator,     
  Route           
} from "lucide-react";

const games = [
  {
    name: "Digital Span",
    icon: Binary,
    location: "/",
  },
  {
    name: "Card Matching",
    icon: LayoutGrid,
    location: "/games/card-match",
  },
  {
    name: "Sequence Recall",
    icon: ListOrdered,
    location: "/",
  },
  {
    name: "Visual Search Game",
    icon: Search,
    location: "/",
  },
  {
    name: "Stroop Test",
    icon: Palette,
    location: "/",
  },
  {
    name: "Reaction Time Test",
    icon: Zap,
    location: "/",
  },
  {
    name: "Go / No Go Task",
    icon: Play,
    location: "/",
  },
  {
    name: "Choice Reaction Time Test",
    icon: GitBranch,
    location: "/",
  },
  {
    name: "Pattern Puzzle",
    icon: Puzzle,
    location: "/",
  },
  {
    name: "Arithmetic Puzzle",
    icon: Calculator,
    location: "/",
  },
  {
    name: "PathFinding",
    icon: Route,
    location: "/",
  },
];
export default function GameGroup() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Games</SidebarGroupLabel>
      <SidebarContent>
        <SidebarMenu>
          {games.map((game) => (
            <SidebarMenuItem key={game.name}>
              <SidebarMenuButton asChild tooltip={game.name}>
                <Link to={game.location}>
                  <game.icon className="text-sidebar-primary" />
                  <span className="tracking-widest">{game.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  );
}

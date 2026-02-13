
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
  Route,
} from "@/components/icons";

const games = [
  {
    name: "Digital Span",
    icon: Binary,
    location: "/games/digital-span",
  },
  {
    name: "Card Matching",
    icon: LayoutGrid,
    location: "/games/card-match",
  },
  {
    name: "Sequence Recall",
    icon: ListOrdered,
    location: "/games/sequence-recall",
  },
  {
    name: "Visual Search Game",
    icon: Search,
    location: "/games/visual-search",
  },
  {
    name: "Stroop Test",
    icon: Palette,
    location: "/games/stroop-test",
  },
  {
    name: "Reaction Time Test",
    icon: Zap,
    location: "/games/reaction-time-test",
  },
  {
    name: "Go / No Go Task",
    icon: Play,
    location: "/games/go-no-go",
  },
  {
    name: "Choice Reaction Time Test",
    icon: GitBranch,
    location: "/games/choice-reaction-time-test",
  },
  {
    name: "Pattern Puzzle",
    icon: Puzzle,
    location: "/games/pattern-puzzle",
  },
  {
    name: "Arithmetic Puzzle",
    icon: Calculator,
    location: "/games/arithmetic-puzzle",
  },
  {
    name: "PathFinding",
    icon: Route,
    location: "/games/path-finding",
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

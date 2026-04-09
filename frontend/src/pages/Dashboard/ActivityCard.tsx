import { ChevronRight } from "@/components/icons";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function ActivityCard({ Icon, title, description, time, colorClass } : {Icon: LucideIcon, title: string, description: string, time: string, colorClass: string}) {
  const navigate = useNavigate()
  return (
  <div
    className="bg-muted p-6 rounded-xl border  hover:border-primary/30 transition-colors group cursor-pointer"
  >
    <div className="flex justify-between mb-4">
      <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}>
        <Icon className="w-6 h-6"  />
      </div>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{time}</span>
    </div>
    <h4 className="font-headline font-bold text-primary text-xl mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-6 text-wrap max-w-sm">{description}</p>
    <div
      className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => navigate("/games/pattern-puzzle")}
    >
      View Game <ChevronRight className="w-4 h-4" />
    </div>
  </div>
  )
}

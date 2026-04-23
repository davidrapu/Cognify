import { ChevronRight } from "@/components/icons";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function ActivityCard({ Icon, title, description, time, colorClass, location } : {Icon: LucideIcon, title: string, description: string, time: string, colorClass: string, location: string}) {
  const navigate = useNavigate()
  return (
  <div
    className="bg-muted p-6 rounded-xl border  hover:border-primary/30 transition-colors group cursor-pointer"
  >
    <div className="flex justify-between mb-4">
      <div className={`size-10 ${colorClass} rounded-lg flex items-center justify-center`}>
        <Icon className="size-5"  />
      </div>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{time}</span>
    </div>
    <h4 className="font-headline font-bold text-primary text-md mb-1">{title}</h4>
    <p className="text-[11px] text-muted-foreground mb-6 text-wrap max-w-sm">{description}</p>
    <div
      className="flex items-center gap-2 text-primary text-sm font-bold lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
      onClick={() => navigate(location)}
    >
      View Game <ChevronRight className="w-4 h-4" />
    </div>
  </div>
  )
}

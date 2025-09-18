import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = false,
  className
}: StatsCardProps) {
  return (
    <Card className={cn(
      "stats-card",
      gradient && "bg-gradient-card",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
            {change && (
              <p className={cn(
                "text-xs mt-1 font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-danger",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            gradient ? "bg-white/10" : "bg-primary/10"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              gradient ? "text-white" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
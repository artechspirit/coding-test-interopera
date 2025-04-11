import { Card, CardContent } from "@/components/ui/card";
import { Deal } from "@/types";

interface StatsCardsProps {
  data: Deal[] | undefined;
}

export function StatsCards({ data }: StatsCardsProps) {
  const stats = {
    "Total Deals": data?.length ?? 0,
    Won: data?.filter((d) => d.status === "Closed Won").length ?? 0,
    Lost: data?.filter((d) => d.status === "Closed Lost").length ?? 0,
    "In Progress": data?.filter((d) => d.status === "In Progress").length ?? 0,
    "Total Value": data?.reduce((sum, d) => sum + d.value, 0) ?? 0,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {Object.entries(stats).map(([label, value]) => (
        <Card
          key={label}
          className="shadow-lg rounded-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
        >
          <CardContent className="p-6 text-center space-y-2">
            <p className="text-sm text-gray-500 font-medium tracking-wide">
              {label}
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {label === "Total Value" ? `$${value?.toLocaleString()}` : value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

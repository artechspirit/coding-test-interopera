import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { SalesRep } from "@/types";

interface IRegionChart {
  name: string;
  totalValue: number;
  wonDeals: number;
  lostDeals: number;
  inProgress: number;
}

interface RegionChartProps {
  data: SalesRep[] | undefined;
}

export function RegionChart({ data }: RegionChartProps) {
  const chartData: IRegionChart[] =
    data?.reduce((acc: Record<string, IRegionChart>, rep) => {
      if (!acc[rep.region]) {
        acc[rep.region] = {
          name: rep.region,
          totalValue: 0,
          wonDeals: 0,
          lostDeals: 0,
          inProgress: 0,
        };
      }

      rep.deals.forEach((deal) => {
        acc[rep.region].totalValue += deal.value;

        if (deal.status === "Closed Won")
          acc[rep.region].wonDeals += deal.value;
        else if (deal.status === "Closed Lost")
          acc[rep.region].lostDeals += deal.value;
        else if (deal.status === "In Progress")
          acc[rep.region].inProgress += deal.value;
      });

      return acc;
    }, {}) || [];

  const formattedData = Object.values(chartData);

  return (
    <div className="w-full h-[480px] bg-white rounded-sm p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        📊 Sales by Region
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              fontSize: "0.875rem",
              borderColor: "#e5e7eb",
            }}
            formatter={(value: number) =>
              typeof value === "number" ? value.toLocaleString() : value
            }
          />
          <Legend
            wrapperStyle={{ fontSize: "0.875rem", paddingTop: 8 }}
            iconType="circle"
            iconSize={10}
          />
          <Bar
            dataKey="totalValue"
            name="Total Value"
            fill="#6366f1"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="wonDeals"
            name="Won Deals"
            fill="#34d399"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="lostDeals"
            name="Lost Deals"
            fill="#f87171"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="inProgress"
            name="In Progress"
            fill="#fbbf24"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

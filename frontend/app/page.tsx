"use client";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { RegionChart } from "@/components/RegionChart";
import SalesRepTable from "@/components/SalesRepTable";
import { StatsCards } from "@/components/StatsCards";
import { useGetDataQuery } from "@/services/api";

export default function Page() {
  const { data, error, isLoading } = useGetDataQuery();

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  const dealsData = data?.flatMap((rep) => rep.deals);

  return (
    <div className="space-y-8 p-6">
      <AnimatedContainer>
        <StatsCards data={dealsData} />
      </AnimatedContainer>
      <AnimatedContainer>
        <RegionChart data={data} />
      </AnimatedContainer>
      <AnimatedContainer>
        <SalesRepTable data={data ?? []} />
      </AnimatedContainer>
    </div>
  );
}

"use client";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { SkillMatrix } from "@/components/SkillMatrix";
import { useGetDataQuery } from "@/services/api";

export default function SkillMatrixPage() {
  const { data, error, isLoading } = useGetDataQuery();

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Skill Matrix</h1>
      <SkillMatrix data={data} />
    </div>
  );
}

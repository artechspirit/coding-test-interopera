"use client";
import { ClientsList } from "@/components/ClientsList";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useGetDataQuery } from "@/services/api";

export default function ClientsPage() {
  const { data, error, isLoading } = useGetDataQuery();

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <ClientsList data={data} />
    </div>
  );
}

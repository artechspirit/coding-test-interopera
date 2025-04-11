import { SalesRep } from "@/types";

interface ClientsListProps {
  data: SalesRep[] | undefined;
}

export function ClientsList({ data }: ClientsListProps) {
  const clients = data?.flatMap((rep) =>
    rep.clients.map((client) => ({
      ...client,
      repName: rep.name,
    }))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients?.map((client, idx) => (
        <div
          key={idx}
          className="p-6 rounded-sm shadow-md bg-white border border-gray-100 hover:shadow-lg transition duration-200 ease-in-out"
        >
          <div className="space-y-1 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {client.name}
            </h3>
            <p className="text-sm text-gray-500">{client.industry}</p>
            <p className="text-sm text-blue-600 underline">{client.contact}</p>
          </div>
          <p className="text-xs text-gray-400 text-right">
            Managed by{" "}
            <span className="font-medium text-gray-600">{client.repName}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

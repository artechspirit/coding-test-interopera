"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { SalesRep } from "@/types";

interface SalesRepTableProps {
  data: SalesRep[] | [];
}

export default function SalesRepTable({ data }: SalesRepTableProps) {
  const dataTable = useMemo(() => data, [data]);

  type SalesReps = (typeof data)[number];

  const columns = useMemo<ColumnDef<SalesReps>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "region",
        header: "Region",
      },
      {
        header: "Closed Won",
        accessorFn: (row) =>
          row.deals.filter((deal) => deal.status === "Closed Won").length,
      },
      {
        header: "Closed Lost",
        accessorFn: (row) =>
          row.deals.filter((deal) => deal.status === "Closed Lost").length,
      },
      {
        header: "In Progress",
        accessorFn: (row) =>
          row.deals.filter((deal) => deal.status === "In Progress").length,
      },
      {
        header: "Total Deal Value",
        accessorFn: (row) =>
          `$${row.deals.reduce((sum, d) => sum + d.value, 0).toLocaleString()}`,
      },
    ],
    []
  );

  const table = useReactTable<SalesReps>({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-sm border border-gray-200 shadow-sm bg-white p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        👥 Sales Reps Overview
      </h2>
      <table className="w-full text-sm text-left table-auto border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 font-medium border-b border-gray-200 text-wrap align-top"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-3 py-2 border-b border-gray-100 break-words align-top"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menu = [
  { name: "Dashboard", href: "/" },
  { name: "Skill Matrix", href: "/skill-matrix" },
  { name: "Clients", href: "/clients" },
  { name: "Chat with AI", href: "/ai" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed h-screen bg-white shadow-xl border-r border-gray-200 p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Sales Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Insights at a glance</p>
      </div>

      <nav className="flex flex-col space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Interopera
      </div>
    </aside>
  );
}

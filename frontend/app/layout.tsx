"use client";
import { Provider } from "react-redux";
import { store } from "@/store";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en" className={inter.className}>
        <body className="flex min-h-screen">
          <Sidebar />
          <main className=" ml-64 flex-1 p-2">{children}</main>
        </body>
      </html>
    </Provider>
  );
}

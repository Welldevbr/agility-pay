import { ReactNode } from "react";
import type { Metadata } from "next";

import { Header } from "@/components";

export const metadata: Metadata = {
  title: "Agility Pay | Dashboard",
  description: "Banco digital agility pay",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-[1192px] mx-auto">
      <Header />
      {children}
    </main>
  );
}

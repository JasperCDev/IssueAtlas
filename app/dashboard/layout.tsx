"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const section = pathname.split("/").at(-1) ?? "dashboard";

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-w-0 min-h-svh bg-background flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />
          <Tabs value={section}>
            <TabsList variant="line">
              <TabsTrigger
                nativeButton={false}
                value="overview"
                render={(props) => (
                  <Link href="/dashboard/overview" {...props}>
                    Overview
                  </Link>
                )}
              />
              <TabsTrigger
                nativeButton={false}
                value="board"
                render={(props) => (
                  <Link href="/dashboard/board" {...props}>
                    Board
                  </Link>
                )}
              />
              <TabsTrigger
                nativeButton={false}
                value="list"
                render={(props) => (
                  <Link href="/dashboard/list" {...props}>
                    List
                  </Link>
                )}
              />
            </TabsList>
          </Tabs>
        </header>
        <div className="flex-1 min-h-0 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

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
  const tabs = [
    { value: "overview", href: "/dashboard/overview", label: "Overview" },
    { value: "board", href: "/dashboard/board", label: "Board" },
    { value: "list", href: "/dashboard/list", label: "List" },
    { value: "timeline", href: "/dashboard/timeline", label: "Timeline" },
    { value: "calendar", href: "/dashboard/calendar", label: "Calendar" },
    { value: "workflow", href: "/dashboard/workflow", label: "Workflow" },
    { value: "files", href: "/dashboard/files", label: "Files" },
    { value: "reports", href: "/dashboard/reports", label: "Reports" },
  ];

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <DashboardSidebar />
      <SidebarInset className="min-w-0 h-svh overflow-hidden bg-background flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />
          <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
            <Tabs value={section}>
              <TabsList variant="line" className="min-w-max">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    nativeButton={false}
                    value={tab.value}
                    render={(props) => (
                      <Link href={tab.href} {...props}>
                        {tab.label}
                      </Link>
                    )}
                  />
                ))}
              </TabsList>
            </Tabs>
          </div>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto p-3 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const _pathName = usePathname();
  const pathName = _pathName.split("/").at(-1);

  return (
    <div className="flex flex-col h-dvh bg-background p-4">
      <Tabs value={pathName} className="mb-2" >
        <TabsList variant='line'>
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
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

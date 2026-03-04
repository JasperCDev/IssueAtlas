"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const _pathName = usePathname();
  const pathName = _pathName.split("/").at(-1);
  const params = useParams();
  console.log(pathName, params);

  return (
    <div className="min-h-dvh bg-background p-4">
      <Tabs value={pathName} className="py-4" >
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
        </TabsList>
      </Tabs>
      {children}
    </div>
  );
}

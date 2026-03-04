import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RiDeleteBinLine } from "@remixicon/react";

export default async function OverviewPage() {
  return (
    <div className="">
      <div
        className="
          grid
          w-full
          gap-4
          justify-start
          grid-cols-[repeat(auto-fit,320px)]
          auto-rows-[320px]
        "
      >
        {/* Sprint Burndown */}
        <Card className="group relative min-w-0 col-span-2 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Sprint Burndown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Team Velocity */}
        <Card className="group relative min-w-0 col-span-1 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Team Velocity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* My Tasks */}
        <Card className="group relative min-w-0 col-span-1 row-span-2 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">My Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Blocked Issues */}
        <Card className="group relative min-w-0 col-span-1 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Blocked Issues</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Cycle Time */}
        <Card className="group relative min-w-0 col-span-2 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cycle Time</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Workload by Assignee */}
        <Card className="group relative min-w-0 col-span-1 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Workload by Assignee</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Release Progress */}
        <Card className="group relative min-w-0 col-span-1 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Release Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="group relative min-w-0 col-span-1 row-span-2 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Priority Breakdown */}
        <Card className="group relative min-w-0 col-span-1 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <Card className="group relative min-w-0 col-span-2 row-span-1 flex flex-col overflow-hidden">
          <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

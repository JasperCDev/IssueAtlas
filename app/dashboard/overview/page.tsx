import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function OverviewPage() {
  return (
    <div className="min-h-dvh bg-background p-4">
      <div
        className="
          grid
          w-full
          gap-4
          grid-cols-[repeat(auto-fit,minmax(256px,1fr))]
          grid-rows-[repeat(auto-fit,minmax(350px,1fr))]
        "
      >
        {/* Portfolio */}
        <Card className="col-span-2 row-span-2 min-w-0 flex flex-col overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted"></div>
          </CardContent>
        </Card>

        {/* Cash Flow */}
        <Card className="col-span-2 row-span-1 min-w-0 flex flex-col overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Net Worth */}
        <Card className="col-span-2 row-span-2 min-w-0 flex flex-col overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Net Worth</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="col-span-2 min-w-0 flex flex-col overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Watchlist */}
        <Card className="col-span-2 min-w-0 flex flex-col overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-w-0">
            <div className="h-full w-full rounded-md bg-muted" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

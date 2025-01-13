import { Outlet } from "react-router-dom";
import { ConsortiumHeader } from "./consortium-header";
import { ConsortiumMainNav } from "./consortium-main-nav";

export function ConsortiumDashboardLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ConsortiumHeader />
      <div className="flex-1 items-start md:grid md:grid-cols-[240px_1fr]">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6">
            <ConsortiumMainNav />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="container flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Total Members</div>
                </div>
                <div className="text-2xl font-bold">10</div>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Performance Index</div>
                </div>
                <div className="text-2xl font-bold">25</div>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Active Projects</div>
                </div>
                <div className="text-2xl font-bold">5</div>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Collaboration Score</div>
                </div>
                <div className="text-2xl font-bold">85%</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4 rounded-xl border">
                <Outlet />
              </div>
              <div className="col-span-3 rounded-xl border">
                <div className="p-6">
                  <h3 className="font-semibold">Recent Activities</h3>
                  {/* Add activity feed here */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

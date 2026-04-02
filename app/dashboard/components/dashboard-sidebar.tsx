"use client";

import {
  RiMoonLine,
  RiSparklingLine,
  RiSunLine,
  RiTeamLine,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { TEAM_LIST } from "@/lib/mock-data";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="flex flex-row gap-1 items-center">
              <RiSparklingLine size={36} className="w-5! h-5! text-primary" />

              <h1 className="font-bold group-data-[collapsible=icon]:hidden text-2xl">
                Issue<span className="text-primary">Atlas</span>
              </h1>
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              className="pointer-events-none cursor-default font-medium text-sidebar-foreground hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground focus-visible:ring-0 data-open:hover:bg-transparent data-open:hover:text-sidebar-foreground"
            >
              <RiTeamLine className="text-sidebar-foreground" />
              <span>Teams</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {TEAM_LIST.map((team) => {
                const href = `/dashboard/${team.id}/overview`;
                const isTeamActive = pathname.startsWith(
                  `/dashboard/${team.id}`,
                );

                return (
                  <SidebarMenuSubItem key={team.id}>
                    <SidebarMenuSubButton
                      isActive={isTeamActive}
                      render={(props) => (
                        <Link href={href} {...props}>
                          <span>{team.name}</span>
                        </Link>
                      )}
                    />
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

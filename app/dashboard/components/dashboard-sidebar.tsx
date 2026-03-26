"use client";

import { RiMoonLine, RiSparklingLine, RiSunLine, RiTeamLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { TEAM_LIST } from "@/lib/mock-data";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
            <SidebarMenuButton size="lg">
              <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <RiSparklingLine size={16} />
              </span>
              <span className="font-semibold group-data-[collapsible=icon]:hidden">Pulse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-3">
        <SidebarGroup className="py-0">
          <SidebarGroupLabel className="h-6 text-[10px]">Teams</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TEAM_LIST.map((team) => {
                const href = `/dashboard/${team.id}/overview`;
                const isTeamActive = pathname.startsWith(`/dashboard/${team.id}`);

                return (
                  <SidebarMenuItem key={team.id}>
                    <SidebarMenuButton
                      size="sm"
                      isActive={isTeamActive}
                      render={(props) => (
                        <Link href={href} {...props}>
                          <RiTeamLine />
                          <span>{team.name}</span>
                        </Link>
                      )}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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

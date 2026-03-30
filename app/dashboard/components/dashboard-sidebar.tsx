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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
            <SidebarMenuButton size="lg">
              <span className="flex flex-row gap-1 items-center">
                <RiSparklingLine size={36} className="w-5! h-5! text-primary" />

                <h1 className="font-bold group-data-[collapsible=icon]:hidden text-xl">
                  Issue<span className="text-primary">Atlas</span>
                </h1>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-3">
        <SidebarGroup className="py-0">
          <SidebarGroupLabel className="h-6 text-[10px]">
            Teams
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="sm">
                  <RiTeamLine />
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

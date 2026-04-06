"use client";

import {
  RiMoonLine,
  RiSparklingLine,
  RiShapesLine,
  RiSunLine,
  RiFoldersLine,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { PROJECT_LIST } from "@/lib/mock-data";

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
              <RiFoldersLine className="text-sidebar-foreground" />
              <span>Projects</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {PROJECT_LIST.map((project) => {
                const href = `/dashboard/${project.id}/overview`;
                const isProjectActive = pathname.startsWith(
                  `/dashboard/${project.id}`,
                );

                return (
                  <SidebarMenuSubItem key={project.id}>
                    <SidebarMenuSubButton
                      isActive={isProjectActive}
                      render={(props) => (
                        <Link href={href} {...props}>
                          <span>{project.name}</span>
                        </Link>
                      )}
                    />
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/org-visualizer"}
              render={(props) => (
                <Link href="/org-visualizer" {...props}>
                  <RiShapesLine />
                  <span className="bg-linear-to-r from-rose-500 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                    Org Visualizer
                  </span>
                </Link>
              )}
            />
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

"use client";

import { useState } from "react";
import {
  RiBarChartBoxLine,
  RiCalendarLine,
  RiCheckboxLine,
  RiFileChartLine,
  RiHome4Line,
  RiInboxLine,
  RiListCheck3,
  RiMoonLine,
  RiProgress1Line,
  RiProjectorLine,
  RiSettings3Line,
  RiSparklingLine,
  RiSunLine,
  RiTeamLine,
  RiTimeLine,
  RiUserLine,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const NAV_MAIN = [
  { title: "Home", href: "/dashboard", icon: RiHome4Line },
  { title: "My Tasks", href: "/tasks", icon: RiCheckboxLine },
  { title: "Inbox", href: "/inbox", icon: RiInboxLine },
];

const NAV_INSIGHTS = [
  { title: "Reporting", href: "/reporting", icon: RiBarChartBoxLine },
  { title: "Portfolios", href: "/portfolios", icon: RiProjectorLine },
  { title: "Goals", href: "/goals", icon: RiProgress1Line },
];

const NAV_PROJECT = [
  { title: "List", href: "/dashboard/list", icon: RiListCheck3 },
  { title: "Timeline", href: "/timeline", icon: RiTimeLine },
  { title: "Calendar", href: "/calendar", icon: RiCalendarLine },
  { title: "Workflow", href: "/workflow", icon: RiFileChartLine },
];

const NAV_ADMIN = [
  { title: "Members", href: "/members", icon: RiUserLine },
  { title: "Teams", href: "/teams", icon: RiTeamLine },
  { title: "Settings", href: "/settings", icon: RiSettings3Line },
];

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: { title: string; href: string; icon: React.ElementType }[];
  pathname: string;
}) {
  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel className="h-6 text-[10px]">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  size="sm"
                  isActive={pathname === item.href}
                  render={(props) => (
                    <Link href={item.href} {...props}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  )}
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(
    () => typeof window !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
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
              <span className="font-semibold">Pulse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-3">
        <NavGroup label="General" items={NAV_MAIN} pathname={pathname} />
        <NavGroup label="Insights" items={NAV_INSIGHTS} pathname={pathname} />
        <NavGroup label="Project" items={NAV_PROJECT} pathname={pathname} />
        <NavGroup label="Admin" items={NAV_ADMIN} pathname={pathname} />
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

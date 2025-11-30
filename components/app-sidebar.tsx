"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import Logo from "@/public/logo-matrix.svg"

import { NavMain } from "@/components/nav-main"
import { NavQuickActions } from "@/components/nav-quick-actions"
import { NavSecondary } from "@/components/nav-secondary"
import { NavVideos } from "@/components/nav-videos"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Панель управления",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Анализ видео",
      url: "/videos",
      icon: IconCamera,
    },
    {
      title: "Аналитика",
      url: "/analytics",
      icon: IconChartBar,
    },
    {
      title: "Работники",
      url: "/workers",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {

    },
    {
      title: "AI Модели",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Распознавание действий",
          url: "#",
        },
        {
          title: "Обнаружение людей",
          url: "#",
        },
        {
          title: "Анализ безопасности",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Настройки",
      url: "/settings",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image src={Logo} alt="Matrix Vision Logo" className="!size-5" />
                <span className="text-base font-semibold">Matrix Vision</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavVideos />
        <NavQuickActions />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}

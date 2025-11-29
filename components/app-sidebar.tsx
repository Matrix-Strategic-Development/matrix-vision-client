"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import Logo from "@/public/logo-matrix.svg"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavQuickActions } from "@/components/nav-quick-actions"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { NavVideos } from "@/components/nav-videos"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Администратор завода",
    email: "admin@matrix-vision.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Зоны",
      url: "/zones",
      icon: IconFolder,
    },
    {
      title: "Работники",
      url: "/workers",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Мониторинг в реальном времени",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Все камеры",
          url: "#",
        },
        {
          title: "Зона А",
          url: "#",
        },
        {
          title: "Зона Б",
          url: "#",
        },
        {
          title: "Сборочные линии",
          url: "#",
        },
      ],
    },
    {
      title: "Отчеты",
      icon: IconReport,
      url: "#",
      items: [
        {
          title: "Ежедневные отчеты",
          url: "#",
        },
        {
          title: "Инциденты безопасности",
          url: "#",
        },
        {
          title: "Производительность",
          url: "#",
        },
      ],
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
    {
      title: "Справка",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Поиск",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Библиотека видео",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Отчеты безопасности",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Документация",
      url: "#",
      icon: IconFileWord,
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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

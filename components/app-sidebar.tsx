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
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
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
    name: "Factory Admin",
    email: "admin@matrix-vision.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Video Analysis",
      url: "#",
      icon: IconCamera,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Zones",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Workers",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Live Monitoring",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "All Cameras",
          url: "#",
        },
        {
          title: "Zone A",
          url: "#",
        },
        {
          title: "Zone B",
          url: "#",
        },
        {
          title: "Assembly Lines",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      icon: IconReport,
      url: "#",
      items: [
        {
          title: "Daily Reports",
          url: "#",
        },
        {
          title: "Safety Incidents",
          url: "#",
        },
        {
          title: "Productivity",
          url: "#",
        },
      ],
    },
    {
      title: "AI Models",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Action Recognition",
          url: "#",
        },
        {
          title: "Person Detection",
          url: "#",
        },
        {
          title: "Safety Analysis",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Video Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Safety Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Documentation",
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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

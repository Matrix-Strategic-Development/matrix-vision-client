"use client"

import { IconUpload } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavQuickActions() {
    const router = useRouter()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Быстрые действия</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={() => router.push('/videos')}
                        className="bg-primary/10 hover:bg-primary/20 text-primary"
                    >
                        <IconUpload />
                        <span>Загрузить видео</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}

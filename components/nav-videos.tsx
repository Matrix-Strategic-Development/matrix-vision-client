"use client"

import { IconVideo, IconCheck, IconLoader2, IconAlertTriangle, IconClock } from "@tabler/icons-react"
import { useVideo } from "@/contexts/video-context"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function NavVideos() {
    const { videos, selectedVideoId, setSelectedVideoId, isLoading } = useVideo()

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <IconCheck className="w-4 h-4 text-green-500" />
            case "processing":
                return <IconLoader2 className="w-4 h-4 text-orange-500 animate-spin" />
            case "pending":
                return <IconClock className="w-4 h-4 text-blue-500" />
            case "failed":
                return <IconAlertTriangle className="w-4 h-4 text-red-500" />
            default:
                return <IconVideo className="w-4 h-4" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge variant="default" className="bg-green-500 text-xs">Готово</Badge>
            case "processing":
                return <Badge variant="default" className="bg-orange-500 text-xs">Обработка</Badge>
            case "pending":
                return <Badge variant="default" className="bg-blue-500 text-xs">В очереди</Badge>
            case "failed":
                return <Badge variant="destructive" className="text-xs">Ошибка</Badge>
            default:
                return null
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit'
        })
    }

    const truncateFilename = (filename: string, maxLength: number = 25) => {
        if (filename.length <= maxLength) return filename

        const extension = filename.split('.').pop()
        const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'))
        const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4)

        return `${truncatedName}...${extension}`
    }

    if (isLoading && videos.length === 0) {
        return (
            <SidebarGroup>
                <SidebarGroupLabel>Загруженные видео</SidebarGroupLabel>
                <div className="flex items-center justify-center py-8">
                    <IconLoader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            </SidebarGroup>
        )
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Загруженные видео</SidebarGroupLabel>
            <SidebarMenu>
                {videos.length === 0 ? (
                    <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                        Нет загруженных видео
                    </div>
                ) : (
                    videos.map((video) => (
                        <SidebarMenuItem key={video.id}>
                            <SidebarMenuButton
                                onClick={() => video.status === 'completed' && setSelectedVideoId(video.id)}
                                isActive={selectedVideoId === video.id}
                                className={cn(
                                    "w-full h-auto py-2",
                                    video.status !== 'completed' && "opacity-50 cursor-not-allowed"
                                )}
                                disabled={video.status !== 'completed'}
                                tooltip={video.filename}
                            >
                                <div className="flex items-start gap-2 w-full min-w-0">
                                    <div className="shrink-0 mt-0.5">
                                        {getStatusIcon(video.status)}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex items-center justify-between gap-1">
                                            <span className="text-sm font-medium truncate block" title={video.filename}>
                                                {truncateFilename(video.filename)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {getStatusBadge(video.status)}
                                            {video.total_detections > 0 && (
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {video.total_detections} дет.
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {formatDate(video.uploaded_at)}
                                        </div>
                                    </div>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}

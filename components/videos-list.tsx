"use client"

import { useState, useEffect } from "react"
import { IconVideo, IconClock, IconCheck, IconLoader, IconAlertCircle } from "@tabler/icons-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Video {
    id: number
    filename: string
    status: string
    duration?: number
    fps?: number
    resolution?: string
    uploaded_at: string
    total_detections?: number
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed":
            return "border-green-500 text-green-500"
        case "processing":
            return "border-blue-500 text-blue-500"
        case "failed":
            return "border-red-500 text-red-500"
        default:
            return "border-yellow-500 text-yellow-500"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "completed":
            return <IconCheck className="w-4 h-4" />
        case "processing":
            return <IconLoader className="w-4 h-4 animate-spin" />
        case "failed":
            return <IconAlertCircle className="w-4 h-4" />
        default:
            return <IconClock className="w-4 h-4" />
    }
}

export function VideosList() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchVideos()
    }, [])

    const fetchVideos = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/videos/list")
            if (response.ok) {
                const data = await response.json()
                setVideos(data.slice(0, 10))
            }
        } catch (error) {
            console.error("Failed to fetch videos:", error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Последние видео</CardTitle>
                <CardDescription>
                    Последние загруженные видео с производства
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <IconLoader className="w-8 h-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                            <IconVideo className="w-12 h-12 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Видео пока не загружены</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                >
                                    <IconVideo className="w-10 h-10 text-primary mt-1" />
                                    <div className="flex-1 space-y-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-medium leading-none truncate">
                                                {video.filename}
                                            </p>
                                            <div className={getStatusColor(video.status)}>
                                                {getStatusIcon(video.status)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{formatDate(video.uploaded_at)}</span>
                                            {video.resolution && (
                                                <>
                                                    <span>•</span>
                                                    <span>{video.resolution}</span>
                                                </>
                                            )}
                                            {video.duration && (
                                                <>
                                                    <span>•</span>
                                                    <span>{Math.round(video.duration)}s</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${getStatusColor(video.status)}`}
                                            >
                                                {video.status.toUpperCase()}
                                            </Badge>
                                            {video.total_detections !== undefined && video.total_detections > 0 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {video.total_detections} обнаружений
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

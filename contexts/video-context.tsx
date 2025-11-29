"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Video {
    id: number
    filename: string
    status: string
    uploaded_at: string
    processed_at?: string
    duration?: number
    total_detections: number
}

interface VideoContextType {
    videos: Video[]
    selectedVideoId: number | null
    setSelectedVideoId: (id: number | null) => void
    isLoading: boolean
    refreshVideos: () => Promise<void>
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export function VideoProvider({ children }: { children: React.ReactNode }) {
    const [videos, setVideos] = useState<Video[]>([])
    const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchVideos = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:8000/api/v1/videos/list')
            if (response.ok) {
                const data = await response.json()
                setVideos(data)

                // Автоматически выбираем первое обработанное видео
                if (!selectedVideoId && data.length > 0) {
                    const completedVideo = data.find((v: Video) => v.status === 'completed')
                    if (completedVideo) {
                        setSelectedVideoId(completedVideo.id)
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching videos:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchVideos()
        // Обновляем список видео каждые 5 секунд
        const interval = setInterval(fetchVideos, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <VideoContext.Provider
            value={{
                videos,
                selectedVideoId,
                setSelectedVideoId,
                isLoading,
                refreshVideos: fetchVideos
            }}
        >
            {children}
        </VideoContext.Provider>
    )
}

export function useVideo() {
    const context = useContext(VideoContext)
    if (context === undefined) {
        throw new Error('useVideo must be used within a VideoProvider')
    }
    return context
}

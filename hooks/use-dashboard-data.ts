"use client"

import { useState, useEffect } from 'react'
import { useVideo } from '@/contexts/video-context'

interface DashboardData {
    overview: {
        total_videos: number
        total_detections: number
        total_people: number
        active_workers: number
        safety_alerts: number
        average_activity: number
    }
    action_distribution: Array<{
        action: string
        count: number
        percentage: number
        avg_duration: number
    }>
    time_series: Array<{
        timestamp: number
        count: number
        actions: Record<string, number>
    }>
    zone_heatmap: Array<{
        zone: string
        activity_count: number
        avg_people: number
        peak_time: string
    }>
    recent_alerts: Array<any>
    shift_comparison: Record<string, any>
}

export function useDashboardData() {
    const { selectedVideoId } = useVideo()
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                const url = selectedVideoId
                    ? `http://localhost:8000/api/v1/videos/analytics/dashboard/${selectedVideoId}`
                    : 'http://localhost:8000/api/v1/videos/analytics/dashboard'

                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data')
                }

                const dashboardData = await response.json()
                setData(dashboardData)
            } catch (err) {
                setError(err as Error)
                console.error('Error fetching dashboard data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [selectedVideoId])

    return { data, loading, error, selectedVideoId }
}

"use client"

import { IconTrendingDown, IconTrendingUp, IconUsers, IconAlertTriangle, IconActivity, IconEye } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useVideo } from "@/contexts/video-context"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface OverviewData {
  total_detections: number
  active_workers: number
  safety_alerts: number
  average_activity: number
}

export function SectionCards() {
  const { selectedVideoId } = useVideo()
  const [overview, setOverview] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPolling, setIsPolling] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        
        if (!overview) {
          setLoading(true)
        } else {
          setIsPolling(true)
        }

        const url = selectedVideoId
          ? `http://localhost:8000/api/v1/videos/analytics/dashboard/${selectedVideoId}`
          : 'http://localhost:8000/api/v1/videos/analytics/dashboard'

        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          console.log('Section cards - received data:', data)
          setOverview(data.overview)
        } else if (response.status === 400) {
          
          console.log('Video still processing, will retry...')
        } else {
          console.error('Failed to fetch dashboard data:', response.status)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
        setIsPolling(false)
      }
    }

    fetchDashboardData()

  }, [selectedVideoId])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-8 w-24" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Всего обнаружений</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.total_detections?.toLocaleString() || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500">
              <IconTrendingUp />
              AI детекция
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {selectedVideoId ? 'Данные выбранного видео' : 'Данные последнего видео'} <IconEye className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Распознавание действий и людей
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            Активных работников
            {isPolling && <span className="ml-2 text-xs text-muted-foreground">обновление...</span>}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.active_workers || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
              <IconUsers />
              Уникальных
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Обнаружено людей <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Трекинг по ID и действиям
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Оповещения безопасности</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.safety_alerts || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={
              (overview?.safety_alerts || 0) > 5
                ? "border-red-500/20 bg-red-500/10 text-red-500"
                : "border-orange-500/20 bg-orange-500/10 text-orange-500"
            }>
              <IconAlertTriangle />
              {(overview?.safety_alerts || 0) > 5 ? 'Высокий' : 'Средний'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {(overview?.safety_alerts || 0) > 0 ? 'Требует внимания' : 'Всё в порядке'} <IconAlertTriangle className="size-4" />
          </div>
          <div className="text-muted-foreground">Мониторинг безопасности</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Средняя активность</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.average_activity?.toFixed(1) || 0}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500">
              <IconTrendingUp />
              Активно
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Уровень активности <IconActivity className="size-4" />
          </div>
          <div className="text-muted-foreground">Интенсивность работы</div>
        </CardFooter>
      </Card>
    </div>
  )
}

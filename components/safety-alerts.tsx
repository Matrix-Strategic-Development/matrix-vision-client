"use client"

import { IconAlertTriangle, IconAlertCircle, IconInfoCircle, IconCheck } from "@tabler/icons-react"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

const getSeverityColor = (severity: string) => {
    switch (severity) {
        case "high":
            return "border-red-500 text-red-500"
        case "medium":
            return "border-orange-500 text-orange-500"
        case "low":
            return "border-yellow-500 text-yellow-500"
        default:
            return "border-gray-500 text-gray-500"
    }
}

const getSeverityIcon = (severity: string) => {
    switch (severity) {
        case "high":
            return <IconAlertTriangle className="w-4 h-4" />
        case "medium":
            return <IconAlertCircle className="w-4 h-4" />
        case "low":
            return <IconInfoCircle className="w-4 h-4" />
        default:
            return <IconInfoCircle className="w-4 h-4" />
    }
}

const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) return `${diffMins} мин назад`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} ч назад`
    return `${Math.floor(diffMins / 1440)} дн назад`
}

export function SafetyAlerts() {
    const { data, loading } = useDashboardData()

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    const alerts = data?.recent_alerts || []

    return (
        <Card>
            <CardHeader>
                <CardTitle>Оповещения безопасности</CardTitle>
                <CardDescription>
                    Недавние инциденты и предупреждения из выбранного видео
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                        {alerts.length === 0 ? (
                            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                                <div className="text-center">
                                    <IconCheck className="w-12 h-12 mx-auto mb-2 text-green-500" />
                                    <p>Нет предупреждений безопасности</p>
                                </div>
                            </div>
                        ) : (
                            alerts.map((alert: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                >
                                    <div className={`mt-0.5 ${getSeverityColor(alert.severity)}`}>
                                        {getSeverityIcon(alert.severity)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{alert.message}</p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                            <span>{alert.zone}</span>
                                            <span>•</span>
                                            <span>{formatTime(alert.timestamp)}</span>
                                        </div>
                                    </div>
                                    {alert.resolved ? (
                                        <IconCheck className="w-4 h-4 text-green-500 shrink-0" />
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${getSeverityColor(alert.severity)}`}
                                        >
                                            {alert.severity.toUpperCase()}
                                        </Badge>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

"use client"

import { IconAlertTriangle, IconAlertCircle, IconInfoCircle, IconCheck } from "@tabler/icons-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const alerts = [
    {
        id: 1,
        type: "safety",
        severity: "high",
        message: "Работник обнаружен в запретной зоне",
        zone: "Зона C",
        time: "15 мин назад",
        resolved: false,
    },
    {
        id: 2,
        type: "safety",
        severity: "medium",
        message: "Обнаружено длительное наклонение - риск напряжения",
        zone: "Сборочная линия 1",
        time: "1 час назад",
        resolved: true,
    },
    {
        id: 3,
        type: "activity",
        severity: "low",
        message: "Низкая активность в Зоне B",
        zone: "Зона B",
        time: "2 часа назад",
        resolved: false,
    },
    {
        id: 4,
        type: "safety",
        severity: "high",
        message: "Обнаружено падение около погрузочной площадки",
        zone: "Погрузочная площадка",
        time: "4 часа назад",
        resolved: true,
    },
    {
        id: 5,
        type: "safety",
        severity: "medium",
        message: "Обнаружена длительная активность подъема",
        zone: "Складская зона",
        time: "5 часов назад",
        resolved: true,
    },
];

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

export function SafetyAlerts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Safety Alerts</CardTitle>
                <CardDescription>
                    Recent safety incidents and activity warnings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className={`mt-0.5 ${getSeverityColor(alert.severity)}`}>
                                    {getSeverityIcon(alert.severity)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-medium leading-none">
                                            {alert.message}
                                        </p>
                                        {alert.resolved && (
                                            <IconCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{alert.zone}</span>
                                        <span>•</span>
                                        <span>{alert.time}</span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${getSeverityColor(alert.severity)}`}
                                    >
                                        {alert.severity.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

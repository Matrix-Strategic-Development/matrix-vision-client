"use client"

import { useState } from "react"
import { IconFilter, IconDownload, IconCalendar } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const ACTIONS = [
    { value: "all", label: "Все действия" },
    { value: "walking", label: "Ходьба" },
    { value: "standing", label: "Стояние" },
    { value: "sitting", label: "Сидение" },
    { value: "bending", label: "Наклон" },
    { value: "lifting", label: "Поднятие" },
    { value: "carrying", label: "Переноска" },
    { value: "reaching", label: "Дотягивание" },
    { value: "falling", label: "Падение" },
]

const ZONES = [
    { value: "all", label: "Все зоны" },
    { value: "Zone A", label: "Зона A" },
    { value: "Zone B", label: "Зона B" },
    { value: "Zone C", label: "Зона C" },
    { value: "Assembly Line 1", label: "Линия 1" },
    { value: "Assembly Line 2", label: "Линия 2" },
]

export function DataFilters() {
    const [selectedAction, setSelectedAction] = useState("all")
    const [selectedZone, setSelectedZone] = useState("all")
    const [exporting, setExporting] = useState(false)

    const handleExport = async (format: "json" | "excel") => {
        setExporting(true)
        try {
            const response = await fetch(`http://localhost:8000/api/v1/videos/1/export?format=${format}`)

            if (!response.ok) {
                throw new Error("Export failed")
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `matrix-vision-report.${format}`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            toast.success("Отчет успешно экспортирован!")
        } catch (error) {
            toast.error("Ошибка экспорта", {
                description: "Пожалуйста, попробуйте снова",
            })
        } finally {
            setExporting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <IconFilter className="w-5 h-5" />
                            Фильтры и экспорт
                        </CardTitle>
                        <CardDescription>
                            Фильтруйте данные и экспортируйте отчеты
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport("json")}
                            disabled={exporting}
                        >
                            <IconDownload className="w-4 h-4 mr-2" />
                            JSON
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Тип действия</Label>
                        <Select value={selectedAction} onValueChange={setSelectedAction}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {ACTIONS.map((action) => (
                                    <SelectItem key={action.value} value={action.value}>
                                        {action.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Зона завода</Label>
                        <Select value={selectedZone} onValueChange={setSelectedZone}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {ZONES.map((zone) => (
                                    <SelectItem key={zone.value} value={zone.value}>
                                        {zone.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        Выбрано: <strong>{selectedAction !== "all" ? ACTIONS.find(a => a.value === selectedAction)?.label : "Все действия"}</strong>
                        {" • "}
                        <strong>{selectedZone !== "all" ? ZONES.find(z => z.value === selectedZone)?.label : "Все зоны"}</strong>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

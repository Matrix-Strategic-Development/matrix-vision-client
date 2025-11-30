"use client"

import { useEffect, useState, useCallback } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { useVideo } from "@/contexts/video-context"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { IconUser, IconActivity, IconClock, IconFilter, IconWorld, IconUsers, IconScan, IconFingerprint } from "@tabler/icons-react"

interface Worker {
    id: number
    person_id: number
    name: string
    first_seen: string
    last_seen: string
    total_detections: number
    avatar_path: string | null
    most_common_action: string | null
    most_common_zone: string | null
    average_activity: number
}

interface WorkerStats {
    total_workers: number
    active_today: number
    new_this_week: number
    average_activity: number
}

export default function WorkersPage() {
    const { selectedVideoId, justProcessedVideoId, setJustProcessedVideoId } = useVideo()
    const [workers, setWorkers] = useState<Worker[]>([])
    const [stats, setStats] = useState<WorkerStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [filterMode, setFilterMode] = useState<'selected' | 'all'>('selected')
    const [isUpdating, setIsUpdating] = useState(false)

    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loadingStage, setLoadingStage] = useState('')
    const LOADING_DURATION = 35000 

    const startLoadingAnimation = useCallback(() => {
        setIsProcessing(true)
        setProgress(0)

        const startTime = Date.now()
        const stages = [
            { percent: 0, text: "Инициализация анализа видео..." },
            { percent: 10, text: "Загрузка модели YOLO..." },
            { percent: 20, text: "Обнаружение людей в кадрах..." },
            { percent: 35, text: "Извлечение признаков внешности..." },
            { percent: 50, text: "Трекинг по ID и действиям..." },
            { percent: 65, text: "Сопоставление Re-ID..." },
            { percent: 80, text: "Классификация действий..." },
            { percent: 90, text: "Формирование профилей работников..." },
            { percent: 95, text: "Сохранение аватаров..." },
            { percent: 100, text: "Готово!" },
        ]

        const updateProgress = () => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / LOADING_DURATION) * 100, 100)
            setProgress(newProgress)

            const currentStage = stages.find((stage, index) => {
                const nextStage = stages[index + 1]
                return newProgress >= stage.percent && (!nextStage || newProgress < nextStage.percent)
            })
            if (currentStage) {
                setLoadingStage(currentStage.text)
            }

            if (elapsed < LOADING_DURATION) {
                requestAnimationFrame(updateProgress)
            } else {
                setIsProcessing(false)
                setProgress(100)
                
                setJustProcessedVideoId(null)
            }
        }

        requestAnimationFrame(updateProgress)
    }, [setJustProcessedVideoId])

    const fetchWorkers = async (isBackgroundUpdate = false) => {
        try {
            
            if (!isBackgroundUpdate) {
                setLoading(true)
            } else {
                setIsUpdating(true)
            }

            const videoParam = filterMode === 'selected' && selectedVideoId
                ? `?video_id=${selectedVideoId}`
                : ''

            const [workersRes, statsRes] = await Promise.all([
                fetch(`http://localhost:8000/api/v1/workers/list${videoParam}`),
                fetch(`http://localhost:8000/api/v1/workers/stats${videoParam}`)
            ])

            if (workersRes.ok && statsRes.ok) {
                const workersData = await workersRes.json()
                const statsData = await statsRes.json()
                setWorkers(workersData)
                setStats(statsData)
            }
        } catch (error) {
            console.error('Error fetching workers:', error)
        } finally {
            setLoading(false)
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        if (justProcessedVideoId && justProcessedVideoId === selectedVideoId && !isProcessing) {
            startLoadingAnimation()
        }
    }, [justProcessedVideoId, selectedVideoId, isProcessing, startLoadingAnimation])

    useEffect(() => {
        
        fetchWorkers(false)

    }, [selectedVideoId, filterMode])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const actionLabels: Record<string, string> = {
        walking: "Ходьба",
        standing: "Стояние",
        lifting: "Подъем",
        bending: "Наклон",
        carrying: "Перенос",
        sitting: "Сидение",
        reaching: "Действия",
        falling: "Падение",
        running: "Передвижение",
        working: "Работа",
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h1 className="text-3xl font-bold mb-2">Работники</h1>
                                            {isUpdating && (
                                                <Badge variant="outline" className="mb-2">
                                                    <IconActivity className="w-3 h-3 mr-1 animate-spin" />
                                                    Обновление...
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground">
                                            {filterMode === 'selected' && selectedVideoId
                                                ? `Работники из выбранного видео #${selectedVideoId}`
                                                : 'Все обнаруженные работники со всех видео'
                                            }
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant={filterMode === 'selected' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setFilterMode('selected')}
                                            disabled={!selectedVideoId}
                                        >
                                            <IconFilter className="w-4 h-4 mr-2" />
                                            Выбранное видео
                                        </Button>
                                        <Button
                                            variant={filterMode === 'all' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setFilterMode('all')}
                                        >
                                            <IconWorld className="w-4 h-4 mr-2" />
                                            Все видео
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {isProcessing && (
                                <div className="px-4 lg:px-6">
                                    <Card className="border-blue-500/20 bg-blue-500/5">
                                        <CardContent className="py-8">
                                            <div className="flex flex-col items-center gap-6">
                                                
                                                <div className="relative">
                                                    <div className="w-24 h-24 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <IconScan className="w-10 h-10 text-blue-600 animate-pulse" />
                                                    </div>
                                                </div>

                                                <div className="text-center space-y-2">
                                                    <h3 className="text-lg font-semibold text-blue-600">
                                                        Анализ видео и трекинг работников
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground animate-pulse">
                                                        {loadingStage}
                                                    </p>
                                                </div>

                                                <div className="w-full max-w-md space-y-2">
                                                    <Progress value={progress} className="h-3" />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>{Math.round(progress)}%</span>
                                                        <span>~{Math.max(0, Math.round((LOADING_DURATION - (progress / 100 * LOADING_DURATION)) / 1000))} сек осталось</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4 mt-4">
                                                    <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-background/50">
                                                        <IconUsers className={`w-5 h-5 ${progress > 20 ? 'text-green-500' : 'text-muted-foreground'}`} />
                                                        <span className="text-xs font-medium">Детекция</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {progress > 20 ? '✓' : '...'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-background/50">
                                                        <IconFingerprint className={`w-5 h-5 ${progress > 50 ? 'text-green-500' : 'text-muted-foreground'}`} />
                                                        <span className="text-xs font-medium">Re-ID</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {progress > 50 ? '✓' : '...'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-background/50">
                                                        <IconActivity className={`w-5 h-5 ${progress > 80 ? 'text-green-500' : 'text-muted-foreground'}`} />
                                                        <span className="text-xs font-medium">Действия</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {progress > 80 ? '✓' : '...'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {!isProcessing && loading && !stats ? (
                                
                                <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Card key={i} className="relative overflow-hidden">
                                            <CardHeader className="pb-2">
                                                <div className="space-y-3">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-8 w-16" />
                                                </div>
                                            </CardHeader>
                                            
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-muted/10 to-transparent animate-shimmer"></div>
                                        </Card>
                                    ))}
                                </div>
                            ) : !isProcessing && stats && (
                                <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-4">
                                    <Card className="relative overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <CardDescription>
                                                Всего работников
                                                {isUpdating && <span className="ml-2 text-xs">↻</span>}
                                            </CardDescription>
                                            <CardTitle className="text-2xl tabular-nums">
                                                {stats.total_workers}
                                            </CardTitle>
                                        </CardHeader>
                                        {isUpdating && (
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/5 to-transparent animate-shimmer"></div>
                                        )}
                                    </Card>
                                    <Card className="relative overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <CardDescription>
                                                Активных сегодня
                                                {isUpdating && <span className="ml-2 text-xs">↻</span>}
                                            </CardDescription>
                                            <CardTitle className="text-2xl tabular-nums">
                                                {stats.active_today}
                                            </CardTitle>
                                        </CardHeader>
                                        {isUpdating && (
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/5 to-transparent animate-shimmer"></div>
                                        )}
                                    </Card>
                                    <Card className="relative overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <CardDescription>Новых за неделю</CardDescription>
                                            <CardTitle className="text-2xl tabular-nums">
                                                {stats.new_this_week}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                    <Card className="relative overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <CardDescription>Средняя активность</CardDescription>
                                            <CardTitle className="text-2xl tabular-nums">
                                                {stats.average_activity.toFixed(1)}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                </div>
                            )}

                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>
                                                    {filterMode === 'selected' && selectedVideoId
                                                        ? `Работники видео #${selectedVideoId}`
                                                        : 'Все работники'
                                                    }
                                                </CardTitle>
                                                <CardDescription>
                                                    {filterMode === 'selected' && selectedVideoId
                                                        ? 'Работники обнаруженные только в выбранном видео'
                                                        : 'Работники обнаруженные во всех загруженных видео'
                                                    }
                                                </CardDescription>
                                            </div>
                                            {!selectedVideoId && filterMode === 'selected' && (
                                                <Badge variant="outline" className="ml-4">
                                                    Выберите видео
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {loading ? (
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                                    <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                                                        <Skeleton className="w-16 h-16 rounded-full" />
                                                        <div className="flex-1 space-y-2">
                                                            <Skeleton className="h-4 w-32" />
                                                            <Skeleton className="h-3 w-24" />
                                                            <Skeleton className="h-3 w-28" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : workers.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                                {isUpdating || loading ? (
                                                    
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="relative">
                                                            
                                                            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                                            <IconUser className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
                                                        </div>

                                                        <div className="flex flex-col items-center gap-2">
                                                            <p className="font-medium text-lg">Загрузка работников...</p>
                                                            <p className="text-sm text-center max-w-md">
                                                                {loading
                                                                    ? 'Получение данных из базы...'
                                                                    : 'Работники появятся после обработки видео'
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                                            <IconUser className="w-10 h-10" />
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <p className="font-medium text-lg">Нет обнаруженных работников</p>
                                                            <p className="text-sm text-center max-w-md">
                                                                {filterMode === 'selected' && selectedVideoId
                                                                    ? 'Выберите другое видео или переключитесь на "Все видео"'
                                                                    : 'Загрузите и обработайте видео для обнаружения работников'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {workers.map((worker) => (
                                                    <div
                                                        key={worker.id}
                                                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                                    >
                                                        <Avatar className="w-16 h-16">
                                                            <AvatarImage
                                                                src={worker.avatar_path ? `http://localhost:8000/${worker.avatar_path}` : undefined}
                                                                alt={worker.name}
                                                            />
                                                            <AvatarFallback>
                                                                <IconUser className="w-8 h-8" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0 space-y-2">
                                                            <div>
                                                                <h3 className="font-semibold">{worker.name}</h3>
                                                                <p className="text-xs text-muted-foreground">
                                                                    ID: {worker.person_id}
                                                                </p>
                                                            </div>

                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                                    <IconActivity className="w-3 h-3" />
                                                                    <span>{worker.total_detections} детекций</span>
                                                                </div>

                                                                {worker.most_common_action && (
                                                                    <div className="flex items-center gap-1.5 text-xs">
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {actionLabels[worker.most_common_action] || worker.most_common_action}
                                                                        </Badge>
                                                                    </div>
                                                                )}

                                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                                    <IconClock className="w-3 h-3" />
                                                                    <span>Последний раз: {formatDate(worker.last_seen)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

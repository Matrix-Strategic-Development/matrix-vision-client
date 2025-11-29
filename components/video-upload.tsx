"use client"

import { useState, useEffect } from "react"
import { IconUpload, IconX, IconVideo, IconLoader2, IconCheck, IconAlertTriangle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useVideo } from "@/contexts/video-context"

interface VideoStatus {
    id: number
    filename: string
    status: "pending" | "processing" | "completed" | "failed"
}

export function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentVideo, setCurrentVideo] = useState<VideoStatus | null>(null)
    const [processingProgress, setProcessingProgress] = useState(0)
    const { refreshVideos, setSelectedVideoId } = useVideo()

    useEffect(() => {
        if (currentVideo && (currentVideo.status === "pending" || currentVideo.status === "processing")) {
            const interval = setInterval(async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/v1/videos/${currentVideo.id}`)
                    if (response.ok) {
                        const data = await response.json()
                        setCurrentVideo(prev => prev ? { ...prev, status: data.status } : null)

                        if (data.status === "processing") {
                            setProcessingProgress(prev => Math.min(prev + 5, 90))
                        } else if (data.status === "completed") {
                            setProcessingProgress(100)
                            toast.success("Видео успешно обработано!", {
                                description: "Результаты анализа доступны в дашборде",
                            })
                            // Обновляем список видео и выбираем это видео
                            await refreshVideos()
                            setSelectedVideoId(currentVideo.id)
                            setTimeout(() => {
                                setCurrentVideo(null)
                                setProcessingProgress(0)
                            }, 1500)
                        } else if (data.status === "failed") {
                            toast.error("Ошибка обработки видео", {
                                description: "Пожалуйста, попробуйте загрузить другое видео",
                            })
                            setCurrentVideo(null)
                            setProcessingProgress(0)
                        }
                    }
                } catch (error) {
                    console.error("Error checking video status:", error)
                }
            }, 2000)

            return () => clearInterval(interval)
        }
    }, [currentVideo])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (!selectedFile.type.startsWith("video/")) {
                toast.error("Пожалуйста, выберите видео файл")
                return
            }
            setFile(selectedFile)
            setProgress(0)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        setProgress(10)

        try {
            const formData = new FormData()
            formData.append("file", file)

            setProgress(30)

            const response = await fetch("http://localhost:8000/api/v1/videos/upload", {
                method: "POST",
                body: formData,
            })

            setProgress(70)

            if (!response.ok) {
                throw new Error("Upload failed")
            }

            const result = await response.json()
            setProgress(100)

            toast.success("Видео успешно загружено!", {
                description: `${result.filename} добавлено в очередь на анализ`,
            })

            setCurrentVideo({
                id: result.id,
                filename: result.filename,
                status: result.status
            })
            setProcessingProgress(10)

            // Обновляем список видео
            await refreshVideos()

            setTimeout(() => {
                setFile(null)
                setProgress(0)
                setUploading(false)
            }, 1000)
        } catch (error) {
            toast.error("Ошибка загрузки", {
                description: "Пожалуйста, попробуйте снова",
            })
            setUploading(false)
            setProgress(0)
        }
    }

    const getStatusIcon = () => {
        switch (currentVideo?.status) {
            case "pending":
                return <IconLoader2 className="w-5 h-5 animate-spin text-blue-500" />
            case "processing":
                return <IconLoader2 className="w-5 h-5 animate-spin text-orange-500" />
            case "completed":
                return <IconCheck className="w-5 h-5 text-green-500" />
            case "failed":
                return <IconAlertTriangle className="w-5 h-5 text-red-500" />
            default:
                return null
        }
    }

    const getStatusText = () => {
        switch (currentVideo?.status) {
            case "pending":
                return "В очереди на обработку..."
            case "processing":
                return "AI анализирует видео..."
            case "completed":
                return "Анализ завершен!"
            case "failed":
                return "Ошибка обработки"
            default:
                return ""
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Загрузка видео с завода</CardTitle>
                <CardDescription>
                    Загрузите видео с камер завода для AI-анализа
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {currentVideo && currentVideo.status !== "completed" && (
                        <Alert>
                            <div className="flex items-start gap-3">
                                {getStatusIcon()}
                                <div className="flex-1">
                                    <AlertTitle>{getStatusText()}</AlertTitle>
                                    <AlertDescription>
                                        {currentVideo.filename}
                                        {currentVideo.status === "processing" && (
                                            <div className="mt-2">
                                                <Progress value={processingProgress} className="h-2" />
                                                <p className="text-xs mt-1 text-muted-foreground">
                                                    Обработка: {processingProgress}%
                                                </p>
                                            </div>
                                        )}
                                    </AlertDescription>
                                </div>
                            </div>
                        </Alert>
                    )}

                    {!file ? (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <IconUpload className="w-12 h-12 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    MP4, AVI, MOV или MKV (МАКС. 500МБ)
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="video/*"
                                onChange={handleFileChange}
                                disabled={uploading || (currentVideo?.status === "processing")}
                            />
                        </label>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                                <IconVideo className="w-10 h-10 text-primary" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(file.size / (1024 * 1024)).toFixed(2)} МБ
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setFile(null)}
                                    disabled={uploading}
                                >
                                    <IconX className="w-4 h-4" />
                                </Button>
                            </div>

                            {uploading && (
                                <div className="space-y-2">
                                    <Progress value={progress} />
                                    <p className="text-xs text-center text-muted-foreground">
                                        Загрузка... {progress}%
                                    </p>
                                </div>
                            )}

                            <Button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="w-full"
                            >
                                {uploading ? (
                                    <>
                                        <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Загрузка...
                                    </>
                                ) : (
                                    <>
                                        <IconUpload className="w-4 h-4 mr-2" />
                                        Загрузить видео
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

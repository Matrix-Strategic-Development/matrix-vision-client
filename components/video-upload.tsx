"use client"

import { useState } from "react"
import { IconUpload, IconX, IconVideo, IconLoader2 } from "@tabler/icons-react"
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

export function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (!selectedFile.type.startsWith("video/")) {
                toast.error("Please select a valid video file")
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

            toast.success("Video uploaded successfully!", {
                description: `${result.filename} is queued for analysis`,
            })

            setTimeout(() => {
                setFile(null)
                setProgress(0)
                setUploading(false)
            }, 1000)
        } catch (error) {
            toast.error("Upload failed", {
                description: "Please try again",
            })
            setUploading(false)
            setProgress(0)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Factory Video</CardTitle>
                <CardDescription>
                    Upload video footage from factory cameras for AI analysis
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {!file ? (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <IconUpload className="w-12 h-12 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    MP4, AVI, MOV, or MKV (MAX. 500MB)
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="video/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </label>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                                <IconVideo className="w-10 h-10 text-primary" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
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
                                        Uploading... {progress}%
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
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <IconUpload className="w-4 h-4 mr-2" />
                                        Upload Video
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

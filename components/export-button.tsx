"use client"

import { IconDownload, IconFileTypePdf, IconFileTypeXls } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export function ExportButton() {
    const handleExportPDF = () => {
        toast.success("Экспорт в PDF", {
            description: "Ваш отчет генерируется...",
        })
    }

    const handleExportExcel = () => {
        toast.success("Экспорт в Excel", {
            description: "Ваш отчет генерируется...",
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <IconDownload className="w-4 h-4 mr-2" />
                    Экспорт отчета
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Формат экспорта</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportPDF}>
                    <IconFileTypePdf className="w-4 h-4 mr-2" />
                    Экспорт в PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportExcel}>
                    <IconFileTypeXls className="w-4 h-4 mr-2" />
                    Экспорт в Excel
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
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
        toast.success("Exporting to PDF", {
            description: "Your report is being generated...",
        })
    }

    const handleExportExcel = () => {
        toast.success("Exporting to Excel", {
            description: "Your report is being generated...",
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <IconDownload className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportPDF}>
                    <IconFileTypePdf className="w-4 h-4 mr-2" />
                    Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportExcel}>
                    <IconFileTypeXls className="w-4 h-4 mr-2" />
                    Export as Excel
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

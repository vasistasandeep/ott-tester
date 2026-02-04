"use client";

import { UploadCloud, CheckCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
    onFileSelect?: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            setFile(selectedFile);
            if (onFileSelect) onFileSelect(selectedFile);
        }
    }, [onFileSelect]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (onFileSelect) onFileSelect(selectedFile);
        }
    };

    return (
        <div
            className={cn(
                "relative border-2 border-dashed rounded-lg p-6 sm:p-10 transition-all duration-300 text-center cursor-pointer group",
                isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-white/10 hover:border-white/20 hover:bg-white/5",
                file ? "border-green-500/50 bg-green-500/5" : ""
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt,.md"
            />

            {file ? (
                <div className="flex flex-col items-center animate-fade-in">
                    <div className="p-3 bg-green-500/10 rounded-full mb-3 text-green-500">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className={cn(
                        "p-3 rounded-full mb-3 transition-colors",
                        isDragging ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-400 group-hover:text-white"
                    )}>
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        Upload Requirements
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Drag & drop PRD, User Stories, or Plans (PDF/Doc)
                    </p>
                </div>
            )}
        </div>
    );
}

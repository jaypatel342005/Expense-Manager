"use client";

import { cn } from "@/lib/utils";
import { Upload, X, File, Image as ImageIcon, Loader2 } from "lucide-react";
import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Assuming shadcn progress exists, if not I'll fallback

interface FileUploadProps {
    name?: string;
    accept?: string;
    maxSizeMB?: number;
    value?: File | null;
    currentFilePath?: string | null;
    onChange?: (file: File | null) => void;
    onUploadComplete?: (url: string) => void;
    className?: string;
    customName?: string;
    folder?: string;
}

export function FileUpload({
    name = "file",
    accept = "image/*",
    maxSizeMB = 4,
    value,
    currentFilePath,
    onChange,
    onUploadComplete,
    className,
    customName,
    folder,
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    
    // Upload State
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // Add isDeleting state
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(currentFilePath || null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

    React.useEffect(() => {
        if (!value && currentFilePath && !uploadedFileUrl) {
           setUploadedFileUrl(currentFilePath);
        } else if (value) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value, currentFilePath]);

    // ... (keep handleDrag and validateFile as is) ...
    // Note: Since replace_file_content replaces a chunk, I need to be careful with context. 
    // I will replace the state definition block first.
    
    // Actually, I'll do this in multiple chunks to be safe or just target specific small blocks if possible.
    // But the instructions say "use multi_replace" for non-contiguous. Here I need to touch state, removeFile, and verify render.
    // They are separated. So I should use multi_replace.
    
    // Switching to multi_replace tool in separate call? 
    // Wait, I am in one tool call. I should use multi_replace_file_content directly.


    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateFile = (file: File): boolean => {
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return false;
        }
        
        setError(null);
        return true;
    };

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        setUploadProgress(0);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);
        if (customName) formData.append("customName", customName);
        if (folder) formData.append("folder", folder);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload", true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setUploadProgress(percentComplete);
            }
        };

        xhr.onload = () => {
             if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                setUploadedFileUrl(response.url);
                setUploadedFileName(response.name || file.name);
                setUploadedFileId(response.fileId); // Save file ID for deletion
                setUploadProgress(100);
                if (onUploadComplete) onUploadComplete(response.url);
                if (onChange) onChange(null); // Clear raw file from parent since we have URL now
            } else {
                setError("Upload failed.");
            }
            setIsUploading(false);
        };

        xhr.onerror = () => {
            setError("Upload failed.");
            setIsUploading(false);
        };

        xhr.send(formData);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                // updateFile(file); // Don't just update, upload!
                // set preview immediately
                const objectUrl = URL.createObjectURL(file);
                setPreview(objectUrl);
                
                uploadFile(file);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file)) {
               const objectUrl = URL.createObjectURL(file);
               setPreview(objectUrl);
               
               uploadFile(file);
            } else {
                if (inputRef.current) inputRef.current.value = "";
            }
        }
    };

    const removeFile = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsDeleting(true);

        try {
            // 1. If we have a file ID, delete it from the server
            if (uploadedFileId) {
                await fetch("/api/upload", {
                    method: "DELETE",
                    headers: {
                       "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ fileId: uploadedFileId })
                });
            }

            if (inputRef.current) {
                inputRef.current.value = "";
            }
            setUploadedFileUrl(null);
            setUploadedFileName(null);
            setUploadedFileId(null);
            setPreview(null);
            setUploadProgress(0);
            
            if (onUploadComplete) onUploadComplete(""); // Clear URL
            if (onChange) onChange(null);
            setError(null);
            
        } catch (err) {
            console.error("Failed to delete file on cancel:", err);
            // Optionally set an error state here if needed
        } finally {
            setIsDeleting(false);
        }
    };

    const triggerSelect = () => {
        if (!uploadedFileUrl) {
            inputRef.current?.click();
        }
    };

    return (
        <div className={cn("space-y-2", className)}>
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center w-full min-h-[150px] p-6 border-2 border-dashed rounded-lg transition-colors bg-background",
                    dragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25",
                     !uploadedFileUrl && !isUploading && "cursor-pointer hover:border-primary/50 hover:bg-muted/25",
                     error ? "border-destructive/50 bg-destructive/5" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerSelect}
            >
                <input
                    ref={inputRef}
                    type="file" // We keep this for selection, but we won't use it for form submission directly now
                    className="hidden"
                    onChange={handleChange}
                    accept={accept}
                />

                {/* Content View */}
                <div className="flex flex-col items-center justify-center gap-2 text-center w-full">
                    
                    {/* State 1: Uploading */}
                    {isUploading && (
                        <div className="w-full max-w-xs flex flex-col items-center gap-4">
                             {preview && (
                                <div className="w-16 h-16 rounded-md overflow-hidden border">
                                    <img src={preview} alt="Uploading" className="w-full h-full object-cover opacity-50" />
                                </div>
                            )}
                            <div className="w-full space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Uploading...</span>
                                    <span>{Math.round(uploadProgress)}%</span>
                                </div>
                                <Progress value={uploadProgress} className="h-2" />
                            </div>
                        </div>
                    )}

                    {/* State 2: Uploaded (Show the Card style from screenshot) */}
                    {!isUploading && uploadedFileUrl && (
                        <div className="flex items-center gap-4 w-full max-w-sm p-2 border rounded-lg bg-card shadow-sm cursor-default">
                            <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                {uploadedFileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) || preview ? (
                                     <img 
                                        src={uploadedFileUrl || preview || ""} 
                                        alt="Uploaded" 
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center">
                                        <File className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium truncate">
                                    {uploadedFileName || "Uploaded File"}
                                </p>
                                <div className="flex items-center gap-2">
                                     <Progress value={100} className="h-1.5 flex-1" />
                                     <span className="text-[10px] text-muted-foreground">100%</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={removeFile}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <X className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    )}

                    {/* State 3: Idle / Empty */}
                    {!isUploading && !uploadedFileUrl && (
                        <>
                            <div className="p-3 bg-muted rounded-full">
                                <Upload className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-foreground">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    SVG, PNG, JPG (max {maxSizeMB}MB)
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
             {error && (
                <p className="text-xs text-destructive font-medium">{error}</p>
            )}
        </div>
    );
}

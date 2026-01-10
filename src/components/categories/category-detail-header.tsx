"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash, Folder } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryDetailHeaderProps {
    category: any;
}

export function CategoryDetailHeader({ category }: CategoryDetailHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex-none px-4 py-3 md:px-6 border-b border-border/60 bg-background/90 backdrop-blur-xl z-50 shadow-sm sticky top-0">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0 rounded-full hover:bg-muted/60">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 shadow-sm">
                            <Folder className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold tracking-tight">{category.CategoryName}</h1>
                                {!category.IsActive && (
                                    <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">Inactive</Badge>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">Category Options</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-2 hidden sm:flex hover:bg-muted/60">
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

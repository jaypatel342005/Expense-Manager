"use client";

import Link from "next/link";
import { MoreHorizontal, Edit, Trash, Eye, Trash2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteRow } from "@/actions/delete-action";
import { toast } from "sonner";
import AlertSoftSuccessDemo from "@/components/ui/alert-23";

interface ActionMenuProps {
    editHref?: string;
    editLabel?: string;
    viewHref?: string;
    deleteLabel?: string;
    className?: string;
    align?: "end" | "start" | "center";
    model?: string;
    id?: string;
    deletePath?: string;
    redirectTo?: string;
}

export function ActionMenu({
    editHref,
    editLabel = "Edit",
    viewHref,
    
    deleteLabel = "Delete",
    className,
    align = "end",
    model,
    id,
    deletePath,
    redirectTo,
}: ActionMenuProps) {
    const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!model || !id) return;
        setIsDeleting(true);
        try {
            await deleteRow(model, id, deletePath);
            setShowDeleteDialog(false);
            toast.custom(() => (
                <AlertSoftSuccessDemo 
                    title={`${model} deleted`}
                    description={`${model} has been deleted successfully.`}
                />
            ));
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            console.error(error);
            toast.custom(() => (
                <AlertSoftSuccessDemo 
                    title="Something went wrong"
                    description="Failed to delete the item. Please try again."
                    variant="error"
                />
            ));
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                        "h-8 w-8 rounded-full bg-transparent hover:bg-muted/50 data-[state=open]:bg-muted/50", 
                        className
                    )}
                >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="min-w-[160px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {viewHref && (
                    <DropdownMenuItem asChild>
                        <Link href={viewHref}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Link>
                    </DropdownMenuItem>
                )}

                {editHref && (
                    <DropdownMenuItem asChild>
                        <Link href={editHref}>
                            <Edit className="mr-2 h-4 w-4" />
                            {editLabel}
                        </Link>
                    </DropdownMenuItem>
                )}

                {(viewHref || editHref) && (model && id) && <DropdownMenuSeparator />}
                {(model && id) && (
                    <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20 cursor-pointer"
                        onSelect={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deleteLabel}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this {model}? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
}

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Copy, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { categories, sub_categories } from "@prisma/client"
import Link from "next/link"

// Define the shape of data including the relation
export type CategoryWithSubCategories = categories & {
    sub_categories: sub_categories[]
}

export const columns: ColumnDef<CategoryWithSubCategories>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "CategoryID",
        header: "ID",
        cell: ({ row }) => <div className="w-[40px]">{row.getValue("CategoryID")}</div>,
    },
    {
        accessorKey: "CategoryName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "type",
        header: "Type",
        cell: ({ row }) => {
            const isExpense = row.original.IsExpense
            const isIncome = row.original.IsIncome
            
            return (
                <div className="flex gap-1">
                    {isExpense && (
                        <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            Expense
                        </Badge>
                    )}
                    {isIncome && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Income
                        </Badge>
                    )}
                </div>
            )
        }
    },
    {
        id: "sub_categories",
        header: "Sub-Categories",
        cell: ({ row }) => {
            const subCats = row.original.sub_categories
            
            if (!subCats || subCats.length === 0) {
                return <span className="text-muted-foreground text-sm italic">None</span>
            }

            return (
                <div className="flex flex-wrap gap-1 max-w-[300px]">
                    {subCats.slice(0, 3).map((sub) => (
                        <Badge key={sub.SubCategoryID} variant="outline" className="text-xs">
                            {sub.SubCategoryName}
                        </Badge>
                    ))}
                    {subCats.length > 3 && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                            +{subCats.length - 3} more
                        </Badge>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "IsActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("IsActive")
            return (
                <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={
                        isActive
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-100 dark:bg-slate-800 dark:text-slate-300"
                    }
                >
                    {isActive ? "Active" : "Inactive"}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(category.CategoryID.toString())}
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/categories/${category.CategoryID}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

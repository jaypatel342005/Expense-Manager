"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Copy, Edit, Trash, FileText } from "lucide-react"
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
import { peoples, users } from "@prisma/client"
import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { User } from "lucide-react"

export type PeopleWithUser = peoples & {
    users: users
}

export const columns: ColumnDef<PeopleWithUser>[] = [
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
        accessorKey: "PeopleID",
        header: "ID",
        cell: ({ row }) => <div className="w-[40px]">{row.getValue("PeopleID")}</div>,
    },
    {
        accessorKey: "PeopleName",
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
        cell: ({ row }) => {
            const user = row.original.users;
            const name = row.getValue("PeopleName") as string;
            return (
                <div className="flex items-center gap-3">
                     <div className="h-9 w-9 min-w-[2.25rem]">
                        <Logo 
                            path={user?.ProfileImage} 
                            alt={name} 
                            fallbackClassName="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border"
                            fallbackIcon={<User className="h-4 w-4" />}
                        />
                    </div>
                    <span className="font-medium">{name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "Email",
        header: "Email",
    },
    {
        accessorKey: "MobileNo",
        header: "Mobile",
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
        accessorKey: "Description",
        header: "Description",
        cell: ({ row }) => {
            const description: string = row.getValue("Description")
            return <div className="truncate max-w-[200px]" title={description}>{description}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const person = row.original

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
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/people/${person.PeopleID}`}>
                                <FileText className="mr-2 h-4 w-4" />
                                Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/people/${person.PeopleID}`}>
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

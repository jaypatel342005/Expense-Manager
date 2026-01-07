import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
    MoreHorizontal, 
    Edit, 
    Trash, 
    Copy, 
    TrendingUp, 
    TrendingDown,
    Calendar,
    CheckCircle2,
    XCircle,
    Tag
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { categories, sub_categories } from "@prisma/client"
import { cn } from "@/lib/utils"

export type CategoryWithSubCategories = categories & {
    sub_categories: sub_categories[]
}

interface CategoryCardProps {
    category: CategoryWithSubCategories
}

export function CategoryCard({ category }: CategoryCardProps) {
    const isExpense = category.IsExpense
    const isIncome = category.IsIncome
    const isActive = category.IsActive

    return (
        <Card className={cn(
            "group relative overflow-hidden transition-all duration-300",
            "hover:shadow-xl hover:-translate-y-1 border",
            // Dynamic background based on type
            isExpense ? "bg-gradient-to-br from-white to-red-50/50 dark:from-slate-950 dark:to-red-950/20 border-red-100 dark:border-red-900/30" : 
            isIncome ? "bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-950 dark:to-emerald-950/20 border-emerald-100 dark:border-emerald-900/30" : 
            "bg-card hover:bg-slate-50 dark:hover:bg-slate-900/50"
        )}>
            {/* Background Decorator Icon */}
            <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                {isExpense ? <TrendingDown className="h-32 w-32 text-red-500" /> : 
                 isIncome ? <TrendingUp className="h-32 w-32 text-emerald-500" /> : 
                 <Tag className="h-32 w-32 text-slate-500" />}
            </div>

            <div className="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/90 dark:bg-slate-950/90 shadow-sm backdrop-blur-sm">
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
            </div>

            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 relative z-10">
                        <Badge 
                            variant="secondary" 
                            className={cn("mb-2 w-fit px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider", 
                                isExpense ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : 
                                isIncome ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : 
                                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            )}
                        >
                            {isExpense ? "Expense" : isIncome ? "Income" : "Other"}
                        </Badge>
                        <CardTitle className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
                            {category.CategoryName}
                        </CardTitle>
                    </div>
                    <div className={cn(
                        "p-2 rounded-xl shadow-sm relative z-10",
                        isExpense ? "bg-red-100 text-red-600 dark:bg-red-900/30" : 
                        isIncome ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" : 
                        "bg-slate-100 text-slate-600 dark:bg-slate-800"
                    )}>
                        {isExpense ? <TrendingDown className="h-5 w-5" /> : 
                         isIncome ? <TrendingUp className="h-5 w-5" /> : 
                         <Tag className="h-5 w-5" />}
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5" title="Date Created">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(category.Created).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                         {isActive ? (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Active
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-slate-500 font-medium">
                                <XCircle className="h-3.5 w-3.5" /> Inactive
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                        {category.sub_categories && category.sub_categories.length > 0 ? (
                            <>
                                {category.sub_categories.slice(0, 4).map((sub) => (
                                    <span 
                                        key={sub.SubCategoryID} 
                                        className="inline-flex items-center px-2 py-1 rounded-md bg-background/80 border text-xs text-muted-foreground shadow-sm"
                                    >
                                        {sub.SubCategoryName}
                                    </span>
                                ))}
                                {category.sub_categories.length > 4 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                                        +{category.sub_categories.length - 4}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-xs text-muted-foreground/50 italic px-1">No sub-categories</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

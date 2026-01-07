"use client"
import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const paths = pathname === "/" ? [] : pathname.split("/").filter((path) => path);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {paths.map((path, index) => {
                                const href = `/${paths.slice(0, index + 1).join("/")}`;
                                const isLast = index === paths.length - 1;
                                const title = path.charAt(0).toUpperCase() + path.slice(1);

                                return (
                                    <React.Fragment key={path}>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage>{title}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={href}>
                                                    {title}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto">
                        <ModeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

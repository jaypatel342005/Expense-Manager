import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStats } from "@/components/projects/project-stats";

export default async function ProjectsPage() {
    const data = await prisma.projects.findMany({
        orderBy: {
            Created: 'desc'
        }
    });

    const totalProjects = data.length;
    const activeProjects = data.filter(p => p.IsActive).length;
    const completedProjects = totalProjects - activeProjects;
    const completionRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">
                        Manage and track your projects.
                    </p>
                </div>
            </div>

            <ProjectStats
                totalProjects={totalProjects}
                activeProjects={activeProjects}
                completedProjects={completedProjects}
                completionRate={completionRate}
            />

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>All Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable 
                            columns={columns} 
                            data={data} 
                            filterKeys={[
                                { id: "ProjectName", title: "Project Name" },
                                { id: "Description", title: "Description" },
                            ]} 
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

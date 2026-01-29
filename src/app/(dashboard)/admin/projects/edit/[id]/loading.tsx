import { ProjectFormSkeleton } from "@/components/skeletons/project-form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                 <Skeleton className="h-8 w-48" />
            </div>
            <ProjectFormSkeleton /> 
        </div>
    );
}

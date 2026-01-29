import { ProjectFormSkeleton } from "@/components/skeletons/project-form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-6">
            <Skeleton className="h-8 w-48 mb-4" /> {/* Title Skeleton */}
            <ProjectFormSkeleton /> 
        </div>
    );
}

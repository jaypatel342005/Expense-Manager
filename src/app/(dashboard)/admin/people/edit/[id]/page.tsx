import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PeopleForm from "@/components/forms/people-form";

// Define PageProps strictly based on Next.js 15+ App Router types
type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EditPeoplePage({ params }: PageProps) {
    // Await params as required in newer Next.js versions
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    if (isNaN(id)) {
        return notFound();
    }

    const person = await prisma.peoples.findUnique({
        where: {
            PeopleID: id
        }
    });

    if (!person) return notFound();

    return (
        <div className="container mx-auto py-10">
            <PeopleForm person={person} />
        </div>
    );
}

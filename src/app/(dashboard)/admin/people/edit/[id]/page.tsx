// // import { auth } from "@/auth";
// import { redirect, notFound } from "next/navigation";
// import PeopleForm from "@/components/forms/people-form";
// import { prisma } from "@/lib/prisma";

// // Define PageProps strictly based on Next.js 15+ App Router types
// type PageProps = {
//     params: Promise<{ id: string }>;
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };

// export default async function EditPeoplePage({ params, searchParams }: PageProps) {
//     // const session = await auth();
//     // if (!session?.user) return redirect("/sign-in");

//     // Await params as required in newer Next.js versions
//     const resolvedParams = await params;
    
//     if (!resolvedParams.id || isNaN(Number(resolvedParams.id))) {
//         return notFound();
//     }

//     const person = await prisma.peoples.findUnique({
//         where: {
//             PeopleID: Number(resolvedParams.id)
//         }
//     });

//     if (!person) return notFound();

//     return (
//         <div className="container mx-auto py-10">
//             <PeopleForm person={person} />
//         </div>
//     );
// }

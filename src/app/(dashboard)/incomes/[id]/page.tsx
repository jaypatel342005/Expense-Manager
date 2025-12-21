import React from "react";

export default async function EditIncomePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Income</h1>
            <p>Edit form for income ID: {id}</p>
        </div>
    );
}

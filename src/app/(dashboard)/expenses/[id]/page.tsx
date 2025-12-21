import React from "react";

export default function EditExpensePage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>
            <p>Edit form for expense ID: {params.id}</p>
        </div>
    );
}

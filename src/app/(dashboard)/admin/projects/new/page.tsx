import ProjectForm from '@/components/forms/project-form';
import React from 'react';

export default function AddProjectPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
            <ProjectForm /> 
        </div>
    );
}

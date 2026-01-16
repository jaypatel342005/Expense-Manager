"use client"
import { SaveIncomeAction } from '@/actions/SaveIncomeAction';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Type definitions
type Category = { CategoryID: number; CategoryName: string };
type SubCategory = { SubCategoryID: number; CategoryID: number; SubCategoryName: string };
type People = { PeopleID: number; PeopleName: string };
type Project = { ProjectID: number; ProjectName: string };

type IncomeData = {
    IncomeID?: number;
    Amount?: any;
    IncomeDate?: Date | string;
    Description?: string | null;
    UserID?: number;
    CategoryID?: number | null;
    SubCategoryID?: number | null;
    PeopleID?: number | null;
    ProjectID?: number | null;
    IncomeDetail?: string | null;
    AttachmentPath?: string | null;
}

interface IncomeFormProps {
    income?: IncomeData;
    categories: Category[];
    subCategories: SubCategory[];
    people: People[];
    projects: Project[];
}

export default function IncomeForm({ income, categories, subCategories, people, projects }: IncomeFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(income?.CategoryID?.toString() || "");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>(income?.SubCategoryID?.toString() || "");
    const [selectedPeople, setSelectedPeople] = useState<string>(income?.PeopleID?.toString() || "");
    const [selectedProject, setSelectedProject] = useState<string>(income?.ProjectID?.toString() || "");

    // Filter subcategories based on selected category
    const filteredSubCategories = subCategories.filter(
        sc => sc.CategoryID.toString() === selectedCategory
    );

    // Reset subcategory when category changes
    useEffect(() => {
        if (selectedCategory !== income?.CategoryID?.toString()) {
             // If manual change, might want to reset, but if it's initial load we keep it.
             // Simple logic: if current subcat doesn't belong to new cat, clear it.
             const isValid = subCategories.find(sc => sc.SubCategoryID.toString() === selectedSubCategory && sc.CategoryID.toString() === selectedCategory);
             if (!isValid) setSelectedSubCategory("");
        }
    }, [selectedCategory, subCategories, selectedSubCategory, income]);

    const formatDate = (date?: Date | string) => {
        if (!date) return new Date().toISOString().split('T')[0];
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    return (
        <Card className="w-full md:w-[85%] mx-auto shadow-lg border-t-4 border-t-primary">
            <CardContent>
                <form action={SaveIncomeAction} className="space-y-6">
                    <input type="hidden" name="id" value={income?.IncomeID || ""} />
                    <input type="hidden" name="UserID" value={income?.UserID || "1"} />
                    
                    <input type="hidden" name="CategoryID" value={selectedCategory} />
                    <input type="hidden" name="SubCategoryID" value={selectedSubCategory} />
                    <input type="hidden" name="PeopleID" value={selectedPeople} />
                    <input type="hidden" name="ProjectID" value={selectedProject} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="IncomeDate">Income Date</Label>
                            <Input 
                                type="date" 
                                id="IncomeDate"
                                name="IncomeDate" 
                                defaultValue={formatDate(income?.IncomeDate)}
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="Amount">Amount</Label>
                            <Input 
                                type="number" 
                                step="0.01" 
                                id="Amount"
                                name="Amount" 
                                defaultValue={income?.Amount ? Number(income.Amount) : ""} 
                                required 
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Payer/People</Label>
                            <Select onValueChange={setSelectedPeople} value={selectedPeople}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Payer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {people.map(p => (
                                        <SelectItem key={p.PeopleID} value={p.PeopleID.toString()}>
                                            {p.PeopleName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 2: Category, Sub Category, Project (3 columns to match or 2 columns if preferred, but let's stick to a grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.CategoryID} value={cat.CategoryID.toString()}>
                                            {cat.CategoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Sub Category</Label>
                            <Select onValueChange={setSelectedSubCategory} value={selectedSubCategory} disabled={!selectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Sub Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredSubCategories.map(sub => (
                                        <SelectItem key={sub.SubCategoryID} value={sub.SubCategoryID.toString()}>
                                            {sub.SubCategoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Project</Label>
                            <Select onValueChange={setSelectedProject} value={selectedProject}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Project" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projects.map(prj => (
                                        <SelectItem key={prj.ProjectID} value={prj.ProjectID.toString()}>
                                            {prj.ProjectName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="IncomeDetail">Income Detail (Short)</Label>
                        <Input 
                            type="text" 
                            id="IncomeDetail"
                            name="IncomeDetail" 
                            defaultValue={income?.IncomeDetail || ""} 
                            placeholder="Brief detail..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="Description">Description (Long)</Label>
                        <Textarea 
                            id="Description"
                            name="Description" 
                            defaultValue={income?.Description || ""} 
                            placeholder="Detailed description..."
                            className="h-24"
                        />
                    </div>

                    {/* Placeholder for Attachment - ideally a file upload */}
                    <div className="space-y-2">
                        <Label htmlFor="AttachmentPath">Attachment URL (Optional)</Label>
                        <Input 
                            type="text" 
                            id="AttachmentPath"
                            name="AttachmentPath" 
                            defaultValue={income?.AttachmentPath || ""} 
                            placeholder="/path/to/file"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="w-full md:w-auto">
                            {income ? "Update Income" : "Save Income"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

'use client'

import { useActionState, useState, useEffect } from 'react'
import { updateProfile } from '@/actions/update-profile'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Loader2, Save } from "lucide-react"

interface ProfileEditFormProps extends React.ComponentProps<"div"> {
    user: any;
    person: any;
    onSuccess?: () => void;
}

export function ProfileEditForm({
    className,
    user,
    person,
    onSuccess,
    ...props
}: ProfileEditFormProps) {
    const [state, action, isPending] = useActionState(updateProfile, undefined)
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.ProfileImage);

    // Effect to handle success
    useEffect(() => {
        if (state?.success) {
            onSuccess?.();
        }
    }, [state, onSuccess]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form action={action} className="flex flex-col gap-6">
                <FieldGroup>
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="relative group cursor-pointer">
                            <div className="size-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <Camera className="h-8 w-8 text-muted-foreground" />
                                )}
                            </div>
                            <input 
                                type="file" 
                                name="file" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                <Camera className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground">Click to change profile picture</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input 
                                id="username" 
                                name="username" 
                                type="text" 
                                defaultValue={user.UserName} 
                                required 
                            />
                            {state?.errors?.username && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.username}</p>
                            )}
                        </Field>

                         <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input 
                                id="name" 
                                name="name" 
                                type="text" 
                                defaultValue={person?.PeopleName || user.UserName} 
                                required 
                            />
                            {state?.errors?.name && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
                            )}
                        </Field>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                         <Field>
                            <FieldLabel htmlFor="mobile">Mobile Number</FieldLabel>
                            <Input 
                                id="mobile" 
                                name="mobile" 
                                type="tel" 
                                defaultValue={person?.MobileNo || user.MobileNo} 
                                required 
                            />
                            {state?.errors?.mobile && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.mobile}</p>
                            )}
                        </Field>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                         <Field>
                            <FieldLabel htmlFor="peopleCode">Employee Code</FieldLabel>
                            <Input 
                                id="peopleCode" 
                                name="peopleCode" 
                                type="text" 
                                defaultValue={person?.PeopleCode || `USR-${user.UserID}`} 
                                disabled
                                className="bg-muted text-muted-foreground"
                            />
                        </Field>
                        
                         <Field>
                            <FieldLabel htmlFor="email">Email Address</FieldLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                defaultValue={user.EmailAddress} 
                                disabled
                                className="bg-muted text-muted-foreground"
                            />
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="description">About You</FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={person?.Description || ""}
                            placeholder="Tell us a bit about yourself..."
                            className="resize-none min-h-[100px]"
                        />
                        {state?.errors?.description && (
                            <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>
                        )}
                    </Field>
                </FieldGroup>

                {state?.message && !state?.success && (
                    <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                        {state.message}
                    </div>
                )}
                
                {state?.success && (
                    <div className="p-3 bg-green-100 border border-green-200 text-green-700 rounded-md text-sm">
                        {state.message}
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

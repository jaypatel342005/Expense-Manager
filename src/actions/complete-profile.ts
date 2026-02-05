'use server'

import { z } from 'zod'
import { verifySession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { uploadImage } from '@/lib/imagekit'

const completeProfileSchema = z.object({
    mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
    description: z.string().optional(),
    // We will validate file manually or use z.instanceof(File) if zfd is available, 
    // but for now we accept formdata loosely and handle file in logic
})

export type CompleteProfileState = {
    errors?: {
        mobile?: string[];
        description?: string[];
    };
    message?: string;
} | undefined;

export async function completeProfile(prevState: CompleteProfileState, formData: FormData): Promise<CompleteProfileState> {
    const session = await verifySession()

    if (!session?.userId) {
        return {
            errors: {
                mobile: ['Unauthorized'],
            }
        }
    }

    if (formData.get('intent') === 'skip') {
         redirect('/')
    }

    const file = formData.get('file') as File | null;
    const mobile = formData.get('mobile') as string;
    const description = formData.get('description') as string;
    const userId = parseInt(session.userId as string)

    if (!mobile || mobile.length < 10) {
        return { errors: { mobile: ['Mobile number must be at least 10 digits'] } }
    }

    try {
        let profileImageUrl = null;

        if (file && file.size > 0 && file.name !== 'undefined') {
            try {
                const uploadResult = await uploadImage(file, `user-${userId}-profile`);
                if (uploadResult && uploadResult.url) {
                    profileImageUrl = uploadResult.url;
                }
            } catch (imageError) {
                console.error("Image Upload Failed:", imageError);
            }
        }

        const updateData: any = {
            MobileNo: mobile,
        };
        if (profileImageUrl) {
            updateData.ProfileImage = profileImageUrl;
        }

        const user = await prisma.users.update({
            where: { UserID: userId },
            data: updateData
        })

        const existingPerson = await prisma.peoples.findFirst({
            where: { Email: user.EmailAddress }
        })

        if (!existingPerson) {
            await prisma.peoples.create({
                data: {
                    PeopleName: user.UserName,
                    PeopleCode: `USR-${user.UserID}`,
                    Email: user.EmailAddress,
                    MobileNo: mobile,
                    Password: 'USER_LINKED_ACCOUNT', 
                    Description: description || 'Linked User Account',
                    IsActive: true,
                    UserID: userId,
                    Created: new Date(),
                    Modified: new Date(),
                }
            })
        } else {
            // Update Existing Person
            await prisma.peoples.update({
                where: { PeopleID: existingPerson.PeopleID },
                data: {
                    MobileNo: mobile,
                    Description: description || existingPerson.Description,
                    Modified: new Date()
                }
            })
        }

    } catch (error) {
        console.error("Complete Profile Error:", error)
        return {
            errors: {
                mobile: ['Failed to update profile. Please try again.'],
            }
        }
    }

    redirect('/')
}

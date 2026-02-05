import { CompleteProfileForm } from "@/components/forms/complete-profile-form"

export default function CompleteProfilePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <CompleteProfileForm />
      </div>
    </div>
  )
}

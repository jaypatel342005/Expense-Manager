'use client'

import { useActionState, useState, useEffect } from 'react'
import { signup } from '@/actions/auth'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import NextImage from "next/image"
import { ImageCropper } from "@/components/ui/image-cropper"
import { uploadFileToServer } from "@/lib/client-upload"
import { toast } from "sonner"
import { Camera, Loader2, Save, User as UserIcon, Check, X, Eye, EyeOff } from "lucide-react"

// ... imports

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, isPending] = useActionState(signup, undefined)
  
  // Client-side validation state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [passwordCriteria, setPasswordCriteria] = useState({
      length: false,
      number: false,
      special: false
  })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    setPasswordCriteria({
        length: password.length >= 8,
        number: /[0-9]/.test(password),
        special: /[^a-zA-Z0-9]/.test(password) // Simplified special char check
    })
  }, [password])

  useEffect(() => {
    if (confirmPassword) {
        setPasswordsMatch(password === confirmPassword)
    }
  }, [password, confirmPassword])

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean)
  const isFormValid = isPasswordValid && passwordsMatch && password && confirmPassword

  // Image Upload State
  const [fileToCrop, setFileToCrop] = useState<File | null>(null)
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFileToCrop(e.target.files[0])
          setIsCropperOpen(true)
          e.target.value = "" // Reset input
      }
  }

  const onCropComplete = async (croppedFile: File) => {
      // Set preview immediately
      const objectUrl = URL.createObjectURL(croppedFile)
      setPreviewUrl(objectUrl)
      
      // Upload
      setIsUploading(true)
      try {
          const result = await uploadFileToServer(croppedFile, "/expense-manager/users")
          if (result?.url) {
              setUploadedUrl(result.url)
              toast.success("Profile image uploaded!")
          }
      } catch (error) {
          console.error("Upload failed", error)
          toast.error("Failed to upload image")
      } finally {
          setIsUploading(false)
      }
  }

  // ... check validity

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <ImageCropper 
        imageFile={fileToCrop} 
        open={isCropperOpen} 
        onOpenChange={setIsCropperOpen} 
        onCropComplete={onCropComplete} 
        aspectRatio={1} // Square for profile
      />
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={action} className="p-6 md:p-8">
            <FieldGroup>
             {/* ... */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="relative group cursor-pointer mb-2">
                     <div className="size-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <UserIcon className="h-8 w-8 mb-1" />
                                <span className="text-[10px]">Add Photo</span>
                            </div>
                        )}
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 className="h-6 w-6 text-white animate-spin" />
                            </div>
                        )}
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        disabled={isUploading}
                    />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full z-0 pointer-events-none">
                        <Camera className="h-6 w-6 text-white" />
                    </div>
                </div>
                <input type="hidden" name="profileImage" value={uploadedUrl} />

                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up for ExpenXO
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="johndoe123" required />
                {state?.errors?.name && (
                  <p className="text-red-500 text-sm">{state.errors.name}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                {state?.errors?.email && (
                   <p className="text-red-500 text-sm">{state.errors.email}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                    <Input 
                        id="password" 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setIsTouched(true)
                        }}
                        className="pr-10"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>
                </div>
                {state?.errors?.password && (
                   <p className="text-red-500 text-sm">{state.errors.password}</p>
                )}
                {/* Client-side feedback */}
                {isTouched && (
                    <div className="text-xs space-y-1 mt-1 text-muted-foreground">
                        <div className={cn("flex items-center gap-1", passwordCriteria.length ? "text-green-600" : "")}>
                            {passwordCriteria.length ? <Check className="size-3"/> : <div className="size-3 rounded-full border" />}
                            At least 8 characters
                        </div>
                        <div className={cn("flex items-center gap-1", passwordCriteria.number ? "text-green-600" : "")}>
                            {passwordCriteria.number ? <Check className="size-3"/> : <div className="size-3 rounded-full border" />}
                            At least one number
                        </div>
                        <div className={cn("flex items-center gap-1", passwordCriteria.special ? "text-green-600" : "")}>
                            {passwordCriteria.special ? <Check className="size-3"/> : <div className="size-3 rounded-full border" />}
                            At least one special character
                        </div>
                    </div>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <div className="relative">
                    <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pr-10"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>
                </div>
                {!passwordsMatch && confirmPassword && (
                   <p className="text-red-500 text-sm flex items-center gap-1 mt-1"><X className="size-3"/> Passwords do not match</p>
                )}
                {state?.errors?.confirmPassword && (
                   <p className="text-red-500 text-sm">{state.errors.confirmPassword}</p>
                )}
              </Field>
              
              <Field>
                <Button type="submit" disabled={isPending || !isFormValid}>
                  {isPending ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </Field>
              <div className="text-center text-sm">
                Already have an account? <a href="/login" className="underline underline-offset-4">Log in</a>
              </div>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary/40 via-primary/20 to-background flex items-center justify-center text-muted-foreground p-10">
              <div className="text-center space-y-4">
                <NextImage
                  src="/expenXO_logo.png"
                  alt="Expenxo Logo"
                  width={150}
                  height={150}
                  className="object-contain opacity-50 mx-auto"
                />
                <h3 className="text-xl font-semibold opacity-70">Join ExpenXO</h3>
                <p className="text-sm opacity-60 max-w-xs mx-auto">
                  Create an account to start managing your finances and tracking expenses today.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


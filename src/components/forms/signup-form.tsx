'use client'

import { useActionState } from 'react'
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, isPending] = useActionState(signup, undefined)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={action} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-white p-1 mb-2">
                    <NextImage 
                        src="/expenXO_logo.png" 
                        alt="Expenxo Logo" 
                        width={40} 
                        height={40} 
                        className="object-contain" 
                        priority
                    />
                </div>
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up for ExpenXO
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="John Doe" required />
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
                <Input id="password" name="password" type="password" required />
                {state?.errors?.password && (
                   <p className="text-red-500 text-sm">{state.errors.password}</p>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </Field>
              <div className="text-center text-sm">
                Already have an account? <a href="/login" className="underline underline-offset-4">Log in</a>
              </div>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


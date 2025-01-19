"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "../lib/utils"
import { forgotPasswordAction } from "./actions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {success ? (
            <div className="flex flex-col items-center justify-center gap-6 p-6 text-center md:p-8">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold">Check your email</h1>
                <p className="text-balance text-muted-foreground">
                  We've sent you a link to reset your password. Please check your inbox.
                </p>
              </div>
              <Link href="/login" className="w-full">
                <Button className="w-full">Return to login</Button>
              </Link>
            </div>
          ) : (
            <form action={forgotPasswordAction} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="@gauntletai.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          )}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/splash.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

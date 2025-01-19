import { ForgotPasswordForm } from "@/components/auth/forgot-password"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

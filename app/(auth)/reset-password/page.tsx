import { ResetPasswordForm } from "@/components/auth/reset-password"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <ResetPasswordForm />
      </div>
    </div>
  )
}

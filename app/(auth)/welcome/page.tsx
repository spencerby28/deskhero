import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold">Welcome to Desk Hero!</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Customer Support Portal</h2>
            <p className="text-sm text-muted-foreground">
              Create and manage support tickets, track customer inquiries, and provide timely responses all in one place.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Knowledge Base</h2>
            <p className="text-sm text-muted-foreground">
              Build a comprehensive help center with articles, guides, and FAQs to empower customer self-service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Team Collaboration</h2>
            <p className="text-sm text-muted-foreground">
              Assign tickets, share notes, and collaborate with team members to resolve customer issues efficiently.
            </p>
          </div>
        </div>

        <div>
          <Link 
            href="/dashboard"
            className="inline-block px-6 py-3 bg-brand-theme hover:bg-brand-theme/90 text-white rounded-lg transition-colors font-medium"
          >
            Dive In
          </Link>
        </div>
      </div>
    </div>
  )
}


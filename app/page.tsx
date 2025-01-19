export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to DeskHero</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        A modern help desk solution that makes customer support simple and efficient. 
        Get started by signing up or signing in to manage your support tickets.
      </p>
      <div className="flex gap-4">
        <a 
          href="/signup"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </a>
        <a
          href="/login" 
          className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-md font-medium"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}

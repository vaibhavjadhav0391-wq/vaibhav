import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground">
      <h1 className="font-serif text-6xl md:text-8xl font-normal text-accent mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-medium mb-3">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been moved, removed, or does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

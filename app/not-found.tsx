import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground transition-colors duration-300">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5262c]/10 border border-[#e5262c]/20 text-[0.78rem] font-mono font-bold text-[#e5262c] mb-6">
        <span>●</span> Error 404
      </div>
      <h1 className="font-serif text-7xl md:text-9xl font-bold text-[#e5262c] mb-2 leading-none tracking-tight">
        404
      </h1>
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-foreground">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8 text-[0.95rem]">
        The page you are looking for might have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#e5262c] text-white text-sm font-semibold hover:brightness-110 transition-all shadow-md shadow-[#e5262c]/20"
      >
        Return to Home
      </Link>
    </div>
  )
}

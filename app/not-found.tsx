export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] p-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-white/65">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}

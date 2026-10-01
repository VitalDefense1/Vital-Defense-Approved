import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-heading text-[2rem] leading-[1.12] font-bold text-balance sm:text-5xl">
        That page is not in this preview.
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        The address may be mistyped, or the page has not been designed yet.
      </p>
      <p className="mt-8">
        <Link href="/" className="vd-link">
          Back to the homepage
        </Link>
      </p>
    </main>
  )
}

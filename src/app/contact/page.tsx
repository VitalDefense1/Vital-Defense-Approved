import type { Metadata } from "next"
import { ContactPanel } from "@/components/contact-panel"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Vital Defense in Lake City, Florida. This preview does not send messages.",
}

export default function ContactPage() {
  return (
    <main>
      <ContactPanel titleAs="h1" />
    </main>
  )
}

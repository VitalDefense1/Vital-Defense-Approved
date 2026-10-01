"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/lib/site"

export function ContactPanel({ titleAs }: { titleAs: "h1" | "h2" }) {
  const Title = titleAs
  const [notice, setNotice] = useState("")

  return (
    <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <span className="mx-auto mb-6 block h-px w-12 bg-gold" aria-hidden="true" />
        <Title className="font-heading text-4xl leading-tight md:text-5xl">
          Contact
        </Title>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          {site.name} is in {site.place}. Street address and opening hours are
          not listed in this preview.
        </p>
        <div className="mt-8 space-y-2 text-base">
          <p>
            <a href={site.phoneHref} className="vd-link">
              {site.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="vd-link">
              {site.email}
            </a>
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Phone and email are the details published on the current website.
          Confirm them before launch.
        </p>
        <form
          className="mt-12 grid gap-5 text-left"
          onSubmit={(event) => {
            event.preventDefault()
            setNotice(
              "This preview does not send messages. Call or email the shop instead.",
            )
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" autoComplete="name" className="h-11 bg-white" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              className="h-11 bg-white"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" name="message" className="min-h-32 bg-white" />
          </div>
          <Button type="submit" className="h-11 px-5">
            Send message
          </Button>
          {notice ? (
            <p role="status" className="text-sm leading-6 text-muted-foreground">
              {notice}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

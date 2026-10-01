"use client"

import { useState, type FormEvent } from "react"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { readSignedInProfile, reviewIdentityFromProfile } from "@/lib/account"

const NOT_SAVED =
  "This review was not saved. Persistent submission needs a review service that validates the entry, checks for spam, and moderates it before publication."

export function ReviewForm({ productId }: { productId: string }) {
  const identity = reviewIdentityFromProfile(readSignedInProfile())
  const [firstName, setFirstName] = useState(identity.firstName)
  const [lastInitial, setLastInitial] = useState(identity.lastInitial)
  const [body, setBody] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [errors, setErrors] = useState<{
    firstName?: string
    lastInitial?: string
    body?: string
    rating?: string
  }>({})
  const [notice, setNotice] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = {
      firstName: firstName.trim() ? undefined : "Enter a first name.",
      lastInitial: /^[A-Za-z]$/.test(lastInitial.trim())
        ? undefined
        : "Enter one last initial.",
      body: body.trim() ? undefined : "Enter a review.",
      rating: rating == null ? "Select a rating." : undefined,
    }
    setErrors(next)
    if (next.firstName || next.lastInitial || next.body || next.rating) {
      setNotice("")
      return
    }
    setNotice(NOT_SAVED)
  }

  const ratingHint = errors.rating ? `${productId}-rating-error` : undefined

  return (
    <form className="mt-12 grid max-w-xl gap-5" onSubmit={onSubmit} noValidate>
      <h3 className="font-heading text-2xl font-bold">Write a review</h3>
      <input type="hidden" name="productId" value={productId} />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${productId}-review-first`}>First name</Label>
          <Input
            id={`${productId}-review-first`}
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? `${productId}-first-error` : undefined}
            className="h-11 bg-white"
            onChange={(event) => setFirstName(event.target.value)}
          />
          {errors.firstName ? (
            <p id={`${productId}-first-error`} className="text-sm text-destructive">
              {errors.firstName}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${productId}-review-initial`}>Last initial</Label>
          <Input
            id={`${productId}-review-initial`}
            name="lastInitial"
            autoComplete="off"
            maxLength={1}
            value={lastInitial}
            aria-invalid={errors.lastInitial ? true : undefined}
            aria-describedby={errors.lastInitial ? `${productId}-initial-error` : undefined}
            className="h-11 bg-white"
            onChange={(event) => setLastInitial(event.target.value.slice(0, 1))}
          />
          {errors.lastInitial ? (
            <p id={`${productId}-initial-error`} className="text-sm text-destructive">
              {errors.lastInitial}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${productId}-review-body`}>Review</Label>
        <Textarea
          id={`${productId}-review-body`}
          name="body"
          value={body}
          aria-invalid={errors.body ? true : undefined}
          aria-describedby={errors.body ? `${productId}-body-error` : undefined}
          className="min-h-28 bg-white"
          onChange={(event) => setBody(event.target.value)}
        />
        {errors.body ? (
          <p id={`${productId}-body-error`} className="text-sm text-destructive">
            {errors.body}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label id={`${productId}-rating-label`}>Rating</Label>
        <StarRating
          value={rating}
          onChange={setRating}
          labelledBy={`${productId}-rating-label`}
          describedBy={ratingHint}
          invalid={Boolean(errors.rating)}
        />
        {errors.rating ? (
          <p id={`${productId}-rating-error`} className="text-sm text-destructive">
            {errors.rating}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="h-11 w-fit bg-gold px-5 text-white hover:bg-[#7a623c]">
        Submit review
      </Button>
      {notice ? (
        <p role="status" className="text-sm leading-6 text-muted-foreground">
          {notice}
        </p>
      ) : null}
    </form>
  )
}

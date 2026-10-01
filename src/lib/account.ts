/**
 * The signed-in customer, when this shop actually has an account session.
 * Signing in is not available, so this stays empty. Do not substitute a sample customer.
 */
export type SignedInProfile = {
  firstName?: string
  lastName?: string
  email?: string
}

export function readSignedInProfile(): SignedInProfile | null {
  return null
}

/** First name and last initial only. The full last name and email are not returned. */
export function reviewIdentityFromProfile(profile: SignedInProfile | null) {
  const firstName = profile?.firstName?.trim() ?? ""
  const lastName = profile?.lastName?.trim() ?? ""
  const lastInitial = /^[A-Za-z]/.test(lastName) ? lastName.charAt(0) : ""
  return { firstName, lastInitial }
}

// Clerk is enabled only when its publishable key is present, so the site
// still builds and runs (without sign-in) before keys are configured.
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

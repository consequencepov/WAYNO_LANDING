export type SeoLandingPage = {
  slug: string
  path: string
  navLabel: string
  title: string
  description: string
  keywords: string[]
  eyebrow: string
  headline: string
  lead: string
  badge: string
  audience: string[]
  outcomes: Array<{
    title: string
    description: string
  }>
  workflow: Array<{
    step: string
    title: string
    description: string
  }>
  proofPoints: string[]
  faq: Array<{
    question: string
    answer: string
  }>
  relatedSlugs: string[]
}
export interface Project {
  id: string
  number: string
  title: string
  category: ProjectCategory
  description: string
  color: string
}

export interface NavLink {
  label: string
  href?: string
  children?: NavLink[]
}

export interface ClientBrand {
  name: string
  size: 'sm' | 'md' | 'lg'
}

export type BrandMode = 'professional' | 'entrepreneur'
export type ProjectCategory = 'agency' | 'design' | 'startup'
export type ContactMethod = 'phone' | 'email'

export interface PromptLeadDraft {
  promptText?: string
  attachedUrls?: string[]
  attachedFileNames?: string[]
  selectedDesign?: string | null
}

export interface SubmitLeadInput extends PromptLeadDraft {
  name: string
  contactMethod: ContactMethod
  contact: string
  source?: string
}


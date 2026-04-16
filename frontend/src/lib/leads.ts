import type { SubmitLeadInput } from '@/types'

function normalizeText(value?: string | null) {
  return value?.trim() || null
}

function normalizeList(values?: string[]) {
  return values?.map((item) => item.trim()).filter(Boolean) ?? []
}

function getPageContext() {
  const url = new URL(window.location.href)

  return {
    pagePath: url.pathname,
    pageUrl: url.href,
    host: url.host,
  }
}

export async function submitLead(input: SubmitLeadInput) {
  const source = normalizeText(input.source) || 'site_cta'
  const promptText = normalizeText(input.promptText)
  const attachedUrls = normalizeList(input.attachedUrls)
  const attachedFileNames = normalizeList(input.attachedFileNames)
  const selectedDesign = normalizeText(input.selectedDesign)
  const name = normalizeText(input.name)
  const contact = normalizeText(input.contact)

  if (!name || !contact) {
    throw new Error('Name and contact are required.')
  }

  const payload = {
    name,
    contactMethod: input.contactMethod,
    contact: input.contactMethod === 'email' ? contact.toLowerCase() : contact,
    source,
    promptText,
    attachedUrls,
    attachedFileNames,
    selectedDesign,
    ...getPageContext(),
  }

  const response = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error ?? `Request failed (${response.status})`)
  }

  return { success: true }
}

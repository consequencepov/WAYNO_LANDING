import { getSupabaseBrowserClient } from '@/lib/supabase'
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
    page_path: url.pathname,
    page_url: url.href,
    host: url.host,
  }
}

export async function submitLead(input: SubmitLeadInput) {
  const supabase = getSupabaseBrowserClient()
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
    contact_method: input.contactMethod,
    phone: input.contactMethod === 'phone' ? contact : null,
    email: input.contactMethod === 'email' ? contact.toLowerCase() : null,
    source,
    prompt_text: promptText,
    attached_urls: attachedUrls,
    attached_file_names: attachedFileNames,
    selected_design: selectedDesign,
    ...getPageContext(),
  }

  const { error } = await supabase
    .from('leads')
    .insert(payload)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

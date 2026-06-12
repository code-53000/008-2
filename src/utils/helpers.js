export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export function formatDate(dateInput) {
  if (!dateInput) return '—'
  const date = new Date(dateInput)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function nowISO() {
  return new Date().toISOString()
}

export function daysSince(dateInput) {
  if (!dateInput) return null
  const then = new Date(dateInput).getTime()
  const now = Date.now()
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24))
  return diff
}

export function validateNote(value: string): string | null {
    const trimmed = value.trim()
    if (!trimmed) return 'Note is required'
    if (trimmed.length < 3) return 'Note must be at least 3 characters'
    if (trimmed.length > 100) return 'Note must be 100 characters or fewer'
    return null
}
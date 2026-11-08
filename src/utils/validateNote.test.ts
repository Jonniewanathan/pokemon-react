import { validateNote } from './validateNote'

describe('validateNote', () => {
    it.each(['', '   '])('requires a value (%j)', (value) => {
        expect(validateNote(value)).toBe('Note is required')
    })

    it('rejects notes under 3 characters', () => {
        expect(validateNote('ab')).toBe('Note must be at least 3 characters')
    })

    it('measures the length after trimming', () => {
        expect(validateNote('  a  ')).toBe('Note must be at least 3 characters')
    })

    it('rejects notes over 100 characters', () => {
        expect(validateNote('a'.repeat(101))).toBe('Note must be 100 characters or fewer')
    })

    it('accepts a valid note', () => {
        expect(validateNote('abc')).toBeNull()
        expect(validateNote('a'.repeat(100))).toBeNull()
    })
})
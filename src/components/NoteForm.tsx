import { useState } from 'react'
import type { FormEvent } from 'react'
import { useFavouritesStore } from '../stores/favouritesStore'
import { validateNote } from '../utils/validateNote'

type Props = {
    name: string
}

export function NoteForm({ name }: Props) {
    const savedNote = useFavouritesStore((s) => s.notes[name] ?? '')
    const setNote = useFavouritesStore((s) => s.setNote)
    const [value, setValue] = useState(savedNote)
    const [touched, setTouched] = useState(false)

    const error = validateNote(value)
    const showError = touched && error !== null

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setTouched(true)
        if (error) return
        setNote(name, value.trim())
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="note">Note</label>
            <br />
            <textarea
                id="note"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={showError}
                aria-describedby={showError ? 'note-error' : undefined}
                rows={3}
            />
            <br />
            <small>{value.length}/100</small>
            {showError && (
                <p id="note-error" role="alert">
                    {error}
                </p>
            )}
            <button type="submit">Save note</button>
            {savedNote && <p>Saved note: {savedNote}</p>}
        </form>
    )
}
import { useState, type FormEvent } from 'react'
import type { TodoInput } from '../api/todos'

interface Props {
  initial?: TodoInput
  submitLabel: string
  onSubmit: (input: TodoInput) => Promise<unknown>
  onCancel?: () => void
}

// Used for both adding a todo and editing one inline.
export default function TodoForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return setError('Please enter a title')
    setSaving(true)
    try {
      await onSubmit({ title: title.trim(), description: description.trim() })
      if (!initial) {
        setTitle('')
        setDescription('')
      }
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        maxLength={120}
        aria-label="Title"
        autoFocus={!!initial}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        maxLength={500}
        rows={2}
        aria-label="Description"
      />
      {error && <p className="error" role="alert">{error}</p>}
      <div className="actions">
        <button type="submit" disabled={saving}>{saving ? 'Saving…' : submitLabel}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

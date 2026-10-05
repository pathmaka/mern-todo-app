import { useCallback, useEffect, useState } from 'react'
import { api, type Todo, type TodoInput } from '../api/todos'

const message = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong')

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setTodos(await api.list())
      setError(null)
    } catch (e) {
      setError(message(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Optimistic update: apply `change` now, call the API, roll back on failure.
  async function optimistic(change: (list: Todo[]) => Todo[], call: () => Promise<unknown>) {
    const previous = todos
    setTodos(change)
    setError(null)
    try {
      await call()
    } catch (e) {
      setTodos(previous)
      setError(message(e))
      throw e
    }
  }

  async function add(input: TodoInput) {
    const created = await api.create(input)
    setTodos((list) => [created, ...list])
  }

  const edit = (id: string, input: TodoInput) =>
    optimistic(
      (list) => list.map((t) => (t._id === id ? { ...t, ...input } : t)),
      () => api.update(id, input)
    )

  const toggle = (id: string) =>
    optimistic(
      (list) => list.map((t) => (t._id === id ? { ...t, done: !t.done } : t)),
      () => api.toggle(id)
    ).catch(() => {})

  const remove = (id: string) =>
    optimistic(
      (list) => list.filter((t) => t._id !== id),
      () => api.remove(id)
    ).catch(() => {})

  return { todos, loading, error, reload: load, add, edit, toggle, remove }
}

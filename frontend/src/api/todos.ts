export interface Todo {
  _id: string
  title: string
  description: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export type TodoInput = Pick<Todo, 'title' | 'description'>

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api/todos${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?')
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Request failed (${res.status})`)
  }
  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  list: () => request<Todo[]>(''),
  create: (input: TodoInput) => request<Todo>('', { method: 'POST', body: JSON.stringify(input) }),
  update: (id: string, input: TodoInput) =>
    request<Todo>(`/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  toggle: (id: string) => request<Todo>(`/${id}/done`, { method: 'PATCH' }),
  remove: (id: string) => request<void>(`/${id}`, { method: 'DELETE' }),
}

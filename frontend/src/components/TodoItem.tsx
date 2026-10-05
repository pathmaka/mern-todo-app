import { useState } from 'react'
import type { Todo, TodoInput } from '../api/todos'
import TodoForm from './TodoForm'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, input: TodoInput) => Promise<unknown>
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)

  if (editing) {
    return (
      <li className="todo">
        <TodoForm
          initial={todo}
          submitLabel="Save"
          onSubmit={async (input) => {
            await onEdit(todo._id, input)
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
        />
      </li>
    )
  }

  return (
    <li className={`todo${todo.done ? ' done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo._id)}
        aria-label={`Mark "${todo.title}" as ${todo.done ? 'not done' : 'done'}`}
      />
      <div className="content">
        <span className="title">{todo.title}</span>
        {todo.description && <p className="description">{todo.description}</p>}
      </div>
      {confirming ? (
        <div className="confirm">
          <span>Delete?</span>
          <button className="danger" onClick={() => onDelete(todo._id)}>Yes</button>
          <button className="secondary" onClick={() => setConfirming(false)}>No</button>
        </div>
      ) : (
        <>
          <button className="secondary" onClick={() => setEditing(true)}>Edit</button>
          <button className="danger" onClick={() => setConfirming(true)}>Delete</button>
        </>
      )}
    </li>
  )
}

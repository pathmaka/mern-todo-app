import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { useTodos } from './hooks/useTodos'
import './styles/App.css'

export default function App() {
  const { todos, loading, error, reload, add, edit, toggle, remove } = useTodos()

  return (
    <main>
      <h1>Todos</h1>
      <TodoForm submitLabel="Add todo" onSubmit={add} />

      {error && (
        <p className="banner error" role="alert">
          {error} <button className="secondary" onClick={reload}>Retry</button>
        </p>
      )}

      {loading ? (
        <p className="muted">Loading…</p>
      ) : todos.length === 0 && !error ? (
        <p className="muted">Nothing to do yet. Add your first todo above.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} onToggle={toggle} onEdit={edit} onDelete={remove} />
          ))}
        </ul>
      )}
    </main>
  )
}

import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(null)

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!edit) {
            setTasks([...tasks, { id: new Date().getTime(), task, completed: false }])
            setTask('')
          } else {
            const newTasks = tasks.map((t) =>
              t.id === id ? { ...t, task } : t
            )
            setTasks(newTasks)
            setEdit(false)
            setTask('')
          }
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">{edit ? 'Edit' : 'Add'}</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => {
                setTasks(tasks.map(task =>
                  task.id === t.id ? { ...task, completed: !task.completed } : task
                ))
              }}
            />
            {t.task}
            <button
              onClick={() => {
                setTask(t.task)
                setEdit(true)
                setId(t.id)
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setTasks(tasks.filter((ts) => ts.id !== t.id))
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

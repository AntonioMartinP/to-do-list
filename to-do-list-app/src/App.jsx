import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState("");
const [tasks, setTasks] = useState(() => {
    // Cargar tareas desde localStorage al iniciar
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  
  function handleInputChange(event) {
    const newTask = event.target.value;
    if (newTask.trim() !== "") {
      setTask(newTask);
    } else {
      alert("Por favor, escribe una tarea.");
    }
  }

  const emptyList = tasks.length === 0;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  const handleAddTask = (event) => {
    event.preventDefault();


    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <>
      <h1>Aplicacion To-Do-List</h1>
      <form action="">
        <input type="text" value={task} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Escribe una tarea"></input>
        <button onClick={handleAddTask}>Enviar tarea</button>
      </form>
      <ul>

        {tasks.map((task) => (
          <li key={task.id} >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'red' : 'black' }}>
              {task.text}
            </span>
            <button className="delete-button"
              onClick={() => handleDeleteTask(task.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p class="empty-message">{emptyList ? "La lista esta vacia, introduce una tarea." : null}</p>
      <p class="pending-tasks">{pendingTasks === 0 ? (emptyList ? null : "No hay tareas pendientes.") : `Tienes ${pendingTasks} ${pendingTasks === 1 ? "tarea pendiente" : "tareas pendientes"}`}</p>
    </>
  )

}
export default App;

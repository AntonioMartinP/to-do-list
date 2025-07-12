import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [task, setTask] = useState("");
const [tasks, setTasks] = useState([]);
function handleInputChange(event) {
  const newTask = event.target.value;
  if (newTask.trim() !== "") {
    setTask(newTask);
  } else {
    alert("Por favor, escribe una tarea.");
  }
}
// function handleAddTask(event) {
//   event.preventDefault();
//   if (task.trim() !== "") {
//     settasks([...tasks, task]);

//     console.log("Tarea agregada:", task);
//     setTask("");
//   } else {
//     alert("Por favor, escribe una tarea.");
//   }
// }
const handleAddTask = (event) => {
  event.preventDefault();
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };
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
      <input type="text" value={task} onChange={handleInputChange} placeholder="Escribe una tarea"></input>
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
    </>
  )

}
export default App;

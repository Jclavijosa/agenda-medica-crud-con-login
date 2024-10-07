// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';  // Importa el archivo de estilos CSS
import agendaImage from './assets/agendaImage.png';  // Importa la imagen de la agenda médica

function App() {
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('token');

  // Estado que almacena todas las tareas (citas) de la aplicación.
  const [tasks, setTasks] = useState([]);  

  // Función para agregar una nueva tarea/cita.
  const addTask = (task) => {
    setTasks([...tasks, task]);  // Añade la nueva tarea/cita a la lista actual
  };

  // Función para eliminar una tarea/cita.
  const deleteTask = (taskIndex) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);  // Filtra por índice
    setTasks(newTasks);  // Actualiza el estado con la nueva lista de tareas
  };

  // Función para marcar una tarea como completada o desmarcarla.
  const toggleTaskCompletion = (taskIndex) => {
    const newTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, completed: !task.completed };  // Cambia el estado "completed"
      }
      return task;
    });
    setTasks(newTasks);  // Actualiza el estado con las tareas modificadas
  };

  // Función para editar una tarea o cita (incluye cambios en texto y fecha/hora).
  const editTask = (taskIndex, newTask) => {
    const newTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return newTask;  // Reemplaza la tarea en el índice correspondiente
      }
      return task;
    });
    setTasks(newTasks);  // Actualiza el estado con las tareas modificadas
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para el Login */}
          <Route path="/" element={<Login />} />
          
          {/* Ruta para la página de tareas (protegida por autenticación) */}
          <Route
            path="/tasks"
            element={
              isAuthenticated ? (
                <>
                  <img src={agendaImage} alt="Agenda Médica" className="header-image" />
                  <TaskForm addTask={addTask} />
                  <TaskList
                    tasks={tasks}
                    deleteTask={deleteTask}
                    toggleTaskCompletion={toggleTaskCompletion}
                    editTask={editTask}
                  />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

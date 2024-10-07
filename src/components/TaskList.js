import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para la redirección
import Task from './Task.js';  // Importa el componente Task

function TaskList({ tasks = [], deleteTask, toggleTaskCompletion, editTask }) {
  const navigate = useNavigate();  // Para redirigir al login después del logout

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de autenticación
    navigate('/');  // Redirigir al login
  };

  return (
    <div>
      {/* Botón de Cerrar Sesión */}
      <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        Cerrar Sesión
      </button>

      {/* Verificar si hay tareas */}
      {tasks.length === 0 ? (
        <div>No hay tareas para mostrar.</div>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              index={index}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

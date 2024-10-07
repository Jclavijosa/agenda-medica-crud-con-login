import React, { useState } from 'react';
import DatePicker from 'react-datepicker';  // Importa el componente de calendario para manejar la edición de fecha/hora
import 'react-datepicker/dist/react-datepicker.css';  // Importa los estilos del calendario

// Componente para mostrar, editar, completar y eliminar una tarea individual.
function Task({ task, index, deleteTask, toggleTaskCompletion, editTask }) {
  // Estado para controlar si la tarea está en modo edición.
  const [isEditing, setIsEditing] = useState(false);
  // Estado para manejar el texto de la tarea editada.
  const [newText, setNewText] = useState(task.text);
  // Estado para manejar la nueva fecha y hora seleccionada.
  const [newDateTime, setNewDateTime] = useState(new Date(task.dateTime));

  // Función que cambia entre los modos de edición y visualización.
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Función para guardar los cambios de la tarea (texto y fecha/hora).
  const handleSave = () => {
    editTask(index, { text: newText, dateTime: newDateTime, completed: task.completed });  // Llama a la función editTask del componente padre (TaskList)
    setIsEditing(false);  // Cambia de nuevo al modo visualización
  };

  // Renderiza la tarea individual con opciones de edición, eliminación, completar, etc.
  return (
    <li className={task.completed ? 'completed' : ''}>
      {isEditing ? (
        <>
          {/* Campo de texto para editar la cita */}
          <input 
            type="text" 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)}  // Actualiza el texto mientras se edita
          />
          {/* Componente DatePicker para editar la fecha y la hora */}
          <DatePicker
            selected={newDateTime}
            onChange={(date) => setNewDateTime(date)}  // Actualiza la fecha y la hora seleccionada
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy h:mm aa"
          />
        </>
      ) : (
        <>
          {/* Muestra el texto de la tarea */}
          <span>{task.text}</span>
          {/* Muestra la fecha y la hora de la tarea */}
          <span>{new Date(task.dateTime).toLocaleDateString()} {new Date(task.dateTime).toLocaleTimeString()}</span>
        </>
      )}

      <div>
        {/* Botón para marcar/desmarcar como completada */}
        <button onClick={() => toggleTaskCompletion(index)}>
          {task.completed ? 'Desmarcar' : 'Completar'}
        </button>
        {/* Botón para activar/desactivar el modo de edición */}
        <button onClick={handleEdit}>
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        {/* Botón para guardar cambios si se está editando, o para eliminar la tarea si no */}
        {isEditing ? (
          <button onClick={handleSave}>Guardar</button>
        ) : (
          <button onClick={() => deleteTask(index)}>Eliminar</button>
        )}
      </div>
    </li>
  );
}

export default Task;

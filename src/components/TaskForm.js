import React, { useState } from 'react';
import DatePicker from 'react-datepicker';  // Importa el componente de calendario para manejar la selección de fecha y hora
import 'react-datepicker/dist/react-datepicker.css';  // Importa los estilos del calendario

function TaskForm({ addTask }) {
  // Estado para manejar el texto de la tarea/cita.
  const [taskText, setTaskText] = useState('');
  // Estado para manejar la fecha y la hora de la cita.
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  // Función que se ejecuta cuando se envía el formulario.
  // Añade la nueva tarea con el texto y la fecha/hora seleccionada.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== '') {  // Verifica que el texto no esté vacío
      addTask({ text: taskText, dateTime: selectedDateTime });  // Pasa el texto y la fecha/hora seleccionada al componente padre (App)
      setTaskText('');  // Limpia el campo de texto después de agregar la tarea
      setSelectedDateTime(new Date());  // Restaura la fecha/hora a la actual
    }
  };

  // Renderiza el formulario con un campo de texto y un componente de calendario.
  return (
    <form onSubmit={handleSubmit}>
      {/* Campo de texto para ingresar la tarea */}
      <input
        type="text"
        placeholder="Añadir nueva cita médica"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}  // Actualiza el texto al escribir
      />
      {/* Componente DatePicker para seleccionar la fecha y la hora */}
      <DatePicker
        selected={selectedDateTime}
        onChange={(date) => setSelectedDateTime(date)}  // Actualiza la fecha/hora seleccionada
        showTimeSelect  // Habilita la selección de hora
        timeFormat="HH:mm"
        timeIntervals={15}  // Intervalos de 15 minutos para la selección de hora
        timeCaption="Hora"
        dateFormat="dd/MM/yyyy h:mm aa"  // Formato de fecha y hora
      />
      <button type="submit">Agregar Cita</button>  {/* Botón para enviar el formulario */}
    </form>
  );
}

export default TaskForm;

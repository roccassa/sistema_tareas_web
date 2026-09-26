// Gestor de Tareas
// la logica de la aplicacion se agrega en los siguientes pasos
const tareas = []
const nextid = 1;

const Form = document.getElementById('tarea');
const Titulo = document.getElementById('titulo');
const Desc = document.getElementById('descripcion');
const Fecha = document.getElementById('fecha');
const Priori = document.getElementById('prioridad');
const Error = document.getElementById('mensaje_error');
const Agregar = document.getElementById('agregar');
const Tareas = document.getElementById('tareas');

const Contador = document.getElementById('contador');
const Pendientes = document.getElementById('pendientes');
const Realizadas = document.getElementById('realizadas');

function Validacion(){
    if(Titulo.value.trim() === '' || Fecha.value === '' || Priori.value === ''){
        Error.textContent = 'Faltan datos'

        return false;
    }
    Error.textContent = '';
    return true;
}

function RellenarTarea(){

    const NuevaTarea = {
        Id: nextid++,
        Titulo: Titulo.value.trim(),
        Descripcion: Desc.value.trim(),
        fecha: Fecha.value,
        Prioridad: Priori.value,
        completada: false
    }

    Tareas.push(NuevaTarea);
    Form.reset();
    Render();

}

function CrearTarjeta(tarea){
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta_tarea';
    tarjeta.dataset.Id = tarea.Id;
    if (tarea.completada){
        tarjeta.classList.add('completada');
    }
    tarjeta.classList.add(`prioridad-${tarea.Prioridad}`)

    const titulo = document.createElement('h2');
    titulo.textContent = tarea.titulo;
    tarjeta.appendChild(titulo);

    if(tarea.Descripcion !== ''){
        const descripcion = document.createElement('p');
        descripcion.className = 'descripcion_tarea';
        descripcion.textContent = tarea.descripcion;
        tarjeta.appendChild(descripcion);
    }
}
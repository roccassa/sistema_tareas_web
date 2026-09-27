// Gestor de Tareas
// la logica de la aplicacion se agrega en los siguientes pasos
let tareas = []
let nextid = 1;

const Form = document.getElementById('form_tarea');
const Titulo = document.getElementById('titulo');
const Desc = document.getElementById('descripcion');
const Fecha = document.getElementById('fecha');
const Priori = document.getElementById('prioridad');
const Error = document.getElementById('mensaje_error');
const Agregar = document.getElementById('btn_agregar');
const ListaTareas = document.getElementById('lista_tareas');

const ContadorTotal = document.getElementById('contador_total');
const ContadorPendientes = document.getElementById('contador_pendientes');
const ContadorCompletadas = document.getElementById('contador_completadas');

function Validacion(){
    if(Titulo.value.trim() === '' || Fecha.value === '' || Priori.value === ''){
        Error.textContent = 'Entradas incompletas, favor de rellenar todos los campos. '

        return false;
    }
    Error.textContent = '';
    return true;
}

function CrearTarea(){

    if(!Validacion()) return;

    const NuevaTarea = {
        id: nextid++,
        Titulo: Titulo.value.trim(),
        Descripcion: Desc.value.trim(),
        fecha: Fecha.value,
        Prioridad: Priori.value,
        completada: false
    }

    tareas.push(NuevaTarea);
    Form.reset();
    MostrarTareas();

}

function CrearTarjeta(tarea){
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta_tarea';
    tarjeta.dataset.id = tarea.id;
    if (tarea.completada){
        tarjeta.classList.add('completada');
    }
    tarjeta.classList.add(`prioridad-${tarea.Prioridad}`)

    const titulo = document.createElement('h3');
    titulo.textContent = tarea.Titulo;
    tarjeta.appendChild(titulo);

    if(tarea.Descripcion !== ''){
        const descripcion = document.createElement('p');
        descripcion.className = 'descripcion_tarea';
        descripcion.textContent = tarea.Descripcion;
        tarjeta.appendChild(descripcion);
    }

    const fecha = document.createElement('p');
    fecha.className = 'fecha_tarea';
    fecha.append('Fecha limite: ');
    const spanFecha = document.createElement('span');
    spanFecha.textContent = tarea.fecha;
    fecha.appendChild(spanFecha);
    tarjeta.appendChild(fecha);

    const prioridad = document.createElement('p');
    prioridad.className = 'prioridad_tarea';
    prioridad.append('Prioridad: ')
    const spanPriori = document.createElement('span');
    spanPriori.textContent = tarea.Prioridad;
    prioridad.appendChild(spanPriori);
    tarjeta.appendChild(prioridad);

    const accion = document.createElement('div');
    accion.className = 'acciones_tarea';

    const completada = document.createElement('button');
    completada.type = 'button';
    completada.className = 'btn_completar';
    completada.textContent = tarea.completada ? 'Deshacer' : 'Finalizar tarea';
    completada.addEventListener('click', () => FinalizarTarea(tarea.id));

    const Eliminar = document.createElement('button');
    Eliminar.type = 'button';
    Eliminar.className = 'btn_eliminar';
    Eliminar.textContent = 'Eliminar';
    Eliminar.addEventListener('click', () => EliminarTarea(tarea.id));

    accion.appendChild(completada)
    accion.appendChild(Eliminar)
    tarjeta.appendChild(accion)

    return tarjeta;
}

function MostrarTareas(){
    ListaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        ListaTareas.appendChild(CrearTarjeta(tarea));
    });

    Contador();
}

function FinalizarTarea(id){
    const tarea = tareas.find(t => t.id === id);
    if(tarea){
        tarea.completada = !tarea.completada;
        MostrarTareas();
    }
}

function EliminarTarea(id){
    tareas = tareas.filter(t => t.id !== id);
    MostrarTareas();
}

function Contador(){
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;

    ContadorTotal.textContent = total;
    ContadorPendientes.textContent = pendientes;
    ContadorCompletadas.textContent = completadas;
}

Agregar.addEventListener('click', CrearTarea);

MostrarTareas();
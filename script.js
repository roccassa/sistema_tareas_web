// Gestor de Tareas
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

const Buscar = document.getElementById('buscar');
const FiltroEstado = document.getElementById('filtro_estado');
const FiltroPrioridad = document.getElementById('filtro_prioridad');

const BtnLimpiador = document.getElementById('btn_limpiador');

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
    GuardarTareas();
    Form.reset();
    MostrarTareas();

}

function CrearTarjeta(tarea){
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta_tarea';
    if (tarea.completada){
        tarjeta.classList.add('completada');
    }
    tarjeta.classList.add('prioridad-' + tarea.Prioridad)

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
    completada.addEventListener('click', function(){
        FinalizarTarea(tarea.id);
    });

    const Eliminar = document.createElement('button');
    Eliminar.type = 'button';
    Eliminar.className = 'btn_eliminar';
    Eliminar.textContent = 'Eliminar';
    Eliminar.addEventListener('click', function(){
        EliminarTarea(tarea.id);
    });

    accion.appendChild(completada)
    accion.appendChild(Eliminar)
    tarjeta.appendChild(accion)

    return tarjeta;
}

// revisa si una tarea cumple con la busqueda y los filtros seleccionados
function CumpleFiltros(tarea){
    const texto = Buscar.value.trim().toLowerCase();
    const estado = FiltroEstado.value;
    const prioridad = FiltroPrioridad.value;

    // busqueda por titulo
    if(texto !== '' && !tarea.Titulo.toLowerCase().includes(texto)){
        return false;
    }

    // filtro por estado
    if(estado === 'pendientes' && tarea.completada === true){
        return false;
    }
    if(estado === 'completadas' && tarea.completada === false){
        return false;
    }

    // filtro por prioridad
    if(prioridad !== 'todas' && tarea.Prioridad !== prioridad){
        return false;
    }

    return true;
}

function MostrarTareas(){
    ListaTareas.innerHTML = '';

    // solo se muestran las tareas que cumplen con los filtros
    let visibles = 0;
    for(let i = 0; i < tareas.length; i++){
        if(CumpleFiltros(tareas[i])){
            ListaTareas.appendChild(CrearTarjeta(tareas[i]));
            visibles++;
        }
    }

    if(visibles === 0){
        const msjVacio = document.createElement('p');
        msjVacio.className = 'mensaje_vacio';
        msjVacio.textContent = tareas.length === 0
        ? 'No hay ninguna tarea capturada'
        : 'No existe tarea con tal caracteristica'
        ListaTareas.appendChild(msjVacio);
    }

    Contador();
}

function FinalizarTarea(id){
    const tarea = tareas.find(t => t.id === id);
    if(tarea){
        tarea.completada = !tarea.completada;
        GuardarTareas();
        MostrarTareas();
    }
}

function EliminarTarea(id){
    tareas = tareas.filter(t => t.id !== id);
    GuardarTareas();
    MostrarTareas();
}

function Limpiador(){
    tareas = tareas.filter(t => !t.completada);
    GuardarTareas();
    MostrarTareas();
}

// guarda el arreglo de tareas y el siguiente id en el localStorage
function GuardarTareas(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
    localStorage.setItem('nextid', nextid);
}

// carga las tareas guardadas cuando se abre la pagina
function CargarTareas(){
    const tareasGuardadas = localStorage.getItem('tareas');
    const idGuardado = localStorage.getItem('nextid');

    if(tareasGuardadas !== null){
        tareas = JSON.parse(tareasGuardadas);
    }

    if(idGuardado !== null){
        nextid = parseInt(idGuardado);
    }
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

// cada vez que se escribe en la busqueda o se cambia un filtro se vuelve a mostrar la lista
Buscar.addEventListener('input', MostrarTareas);
FiltroEstado.addEventListener('change', MostrarTareas);
FiltroPrioridad.addEventListener('change', MostrarTareas);

BtnLimpiador.addEventListener('click', Limpiador)


CargarTareas();
MostrarTareas();
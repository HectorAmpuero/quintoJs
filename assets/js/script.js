let tareas = [
    { id: 1, descripcion: "Ir al mercado", completada: false },
    { id: 2, descripcion: "Planear como conquistar el mundo", completada: false },
    { id: 3, descripcion: "Sacar a pasear a Tobby", completada: false },
    { id: 4, descripcion: "Ir al GYM", completada: false },
    { id: 5, descripcion: "Estudiar javascript", completada: false },
];

const entradaTarea = document.getElementById("task-input");
const botonAgregarTarea = document.getElementById("add-task-btn");
const listaTareas = document.getElementById("tasks-list");
const totalTareas = document.getElementById("total-tasks");
const tareasCompletadas = document.getElementById("completed-tasks");

function renderizarTareas() {
    listaTareas.innerHTML = "";
    tareas.forEach((tarea) => {
        const fila = document.createElement("tr");

        const celdaId = document.createElement("td");
        celdaId.textContent = tarea.id;

        const celdaDescripcion = document.createElement("td");
        celdaDescripcion.textContent = tarea.descripcion;
        if (tarea.completada) {
            celdaDescripcion.classList.add("completed");
        }

        const celdaAcciones = document.createElement("td");
        const botonCompletar = document.createElement("input");
        botonCompletar.type = "checkbox";
        botonCompletar.checked = tarea.completada;
        botonCompletar.addEventListener("change", () => alternarCompletadoTarea(tarea.id));

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "X";
        botonEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

        celdaAcciones.appendChild(botonCompletar);
        celdaAcciones.appendChild(botonEliminar);

        fila.appendChild(celdaId);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaAcciones);

        listaTareas.appendChild(fila);
    });

    actualizarResumen();
}

let ultimoId = tareas.length > 0 ? tareas[tareas.length - 1].id : 0;

function agregarTarea() {
    const descripcion = entradaTarea.value.trim();
    if (!descripcion) return alert("Por favor, ingresa una tarea.");

    const nuevaTarea = {
        id: ++ultimoId,
        descripcion,
        completada: false
    };

    tareas.push(nuevaTarea);
    entradaTarea.value = "";
    renderizarTareas();
}


function eliminarTarea(id) {
    tareas = tareas.filter((tarea) => tarea.id !== id);
    renderizarTareas();
}

function alternarCompletadoTarea(id) {
    const tarea = tareas.find((tarea) => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarTareas();
    }
}

function actualizarResumen() {
    totalTareas.textContent = tareas.length;
    tareasCompletadas.textContent = tareas.filter((tarea) => tarea.completada).length;
}

botonAgregarTarea.addEventListener("click", agregarTarea);

renderizarTareas();
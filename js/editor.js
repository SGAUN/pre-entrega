//MENSAJES DE ALERT PARA CADA SECCION
let alertVisualizacionYFiltros = document.getElementById("alert-visualizacion-y-filtros");
let alertEdicionYEliminacion = document.getElementById("alert-edicion-y-eliminacion");
let alertTablaFiguras = document.getElementById("alert-tabla-figuras");
function limpiarAlerts() {
    alertVisualizacionYFiltros.textContent = "";
    alertEdicionYEliminacion.textContent = "";
    alertTablaFiguras.textContent = "";
} //funcion para limpiar los mensaje de alert

//CUERPO DE LA TABLA Y SPAN DEL AREA TOTAL
//BOTONES DE ORDENAR Y VER LISTA
let cuerpoTablaFiguras = document.getElementById("cuerpo-tabla-figuras");
let spanAreaTotal = document.getElementById("span-area-total");
let btnVerLista = document.getElementById("btn-ver-lista");
let btnOrdenarAsc = document.getElementById("btn-ordenar-asc");
let btnOrdenarDesc = document.getElementById("btn-ordenar-desc");
function vincularBotonesEliminarEnTabla(listaFiguras) {
    let botonEliminar = document.querySelectorAll(".boton-eliminar-tabla");
    botonEliminar.forEach((boton) => {
        boton.onclick = (e) => {
            limpiarAlerts();
            const botonId = e.currentTarget.id;
            const indice = parseInt(botonId.split("-")[1]);
            const figuraSeleccionada = listaFiguras[indice];

            if (figuraSeleccionada.cantidad > 1) {
                figuraSeleccionada.cantidad -= 1;
                alertTablaFiguras.textContent = "Se disminuyo la cantidad de la figura seleccionada en 1";
            } else {
                listaFiguras.splice(indice, 1);
                alertTablaFiguras.textContent = "Se elimino la figura seleccionada de la lista";
            }
            actualizarTablaYTotal(listaFiguras);
        };
    });
}
const buscarBotonActivo = (listaBotones) => listaBotones.find((boton) => boton.classList.contains("activo")) || null; //busca el boton activo de una lista de botones y lo devuelve
function actualizarTablaYTotal(listaFiguras, esListaOriginal = true) {
    cuerpoTablaFiguras.innerHTML = "";
    let areaTotal = 0;
    let copiaListaFiguras = listaFiguras; //no quiero modificar la lista original

    let botonActivo = buscarBotonActivo([btnVerLista, btnOrdenarAsc, btnOrdenarDesc]);
    botonActivo == btnOrdenarAsc && (copiaListaFiguras = listaFiguras.toSorted((a, b) => a.area - b.area)); //muestra la lista segun
    botonActivo == btnOrdenarDesc && (copiaListaFiguras = listaFiguras.toSorted((a, b) => b.area - a.area)); //el boton seleccionado de orden

    copiaListaFiguras.forEach((figura) => {
        let indiceOriginal = listaFiguras.indexOf(figura); //busca el indice real de la lista original
        let areaFigura = figura.unidad == unidadM ? figura.area * 10000 : figura.area;
        areaTotal += areaFigura * figura.cantidad;
        let { id, nombre, area, unidad, color, cantidad } = figura; //destructuring
        let fila = document.createElement("tr");
        fila.innerHTML = `  <td>
                                <button class="boton-eliminar-tabla" id="figura-${indiceOriginal}">Eliminar</button>
                            </td>
                            <td>${indiceOriginal}</td>
                            <td>${id}</td>
                            <td>${nombre}</td>
                            <td>${color}</td>
                            <td>${cantidad}</td>
                            <td>${area}</td>
                            <td>${unidad}</td>`;
        cuerpoTablaFiguras.appendChild(fila);
    });
    spanAreaTotal.textContent = areaTotal.toFixed(2);
    esListaOriginal && guardarLista(); //solo lo guardo si "listaFiguras" es la lista original
    vincularBotonesEliminarEnTabla(listaFiguras); //le doy funcion a los botones de eliminar de la tabla
} //actualiza la tabla y el area total segun la lista de figuras
function activarBoton(botonSeleccionado) {
    const listaBotones = [btnVerLista, btnOrdenarAsc, btnOrdenarDesc];
    listaBotones.forEach((boton) => boton.classList.remove("activo")); //elimino la clase "activo" de todos los botones
    botonSeleccionado.classList.add("activo");
} //primero quito la clase "activo" de los 3 botones y luego al botonSeleccionado le agregar el "activo"
btnVerLista.onclick = () => {
    limpiarAlerts();
    activarBoton(btnVerLista);
    actualizarTablaYTotal(listaFiguras);
    alertVisualizacionYFiltros.textContent = "Se muestra la lista de figuras en el orden en que fueron agregadas";
};
btnOrdenarAsc.onclick = () => {
    limpiarAlerts();
    activarBoton(btnOrdenarAsc);
    actualizarTablaYTotal(listaFiguras);
    alertVisualizacionYFiltros.textContent = "Se muestra la lista de figuras ordenadas de forma ascendente por area";
};
btnOrdenarDesc.onclick = () => {
    limpiarAlerts();
    activarBoton(btnOrdenarDesc);
    actualizarTablaYTotal(listaFiguras);
    alertVisualizacionYFiltros.textContent = "Se muestra la lista de figuras ordenadas de forma descendente por area";
};

//BOTON BUSCAR POR ID
let inputBuscarID = document.getElementById("input-buscar-id");
let btnBuscarID = document.getElementById("btn-buscar-id");
btnBuscarID.onclick = () => {
    limpiarAlerts();
    let idBuscado = parseInt(inputBuscarID.value);
    if (!esNumeroMayorACero(idBuscado)) {
        alertVisualizacionYFiltros.textContent = "El ID debe ser un número entero positivo";
        inputBuscarID.value = "";
    } else {
        const figuraEncontrada = listaFiguras.find((figura) => figura.id == idBuscado);
        if (figuraEncontrada) {
            cuerpoTablaFiguras.innerHTML = "";
            actualizarTablaYTotal([figuraEncontrada], false); //evito que se guarde la lista al mostrar
            alertVisualizacionYFiltros.textContent =
                "Se muestra la figura con el ID buscado, si no se encuentra se muestra la lista completa";
        } else {
            actualizarTablaYTotal(listaFiguras);
            alertVisualizacionYFiltros.textContent = "Figura no encontrada con ese ID";
        }
        inputBuscarID.value = "";
    }
};

//BOTON BUSCAR POR AREA
let inputBuscarArea = document.getElementById("input-buscar-area");
let btnBuscarArea = document.getElementById("btn-buscar-area");
btnBuscarArea.onclick = () => {
    limpiarAlerts();
    let areaBuscada = parseFloat(inputBuscarArea.value);
    if (!esNumeroMayorACero(areaBuscada)) {
        alertVisualizacionYFiltros.textContent = "El area debe ser un número mayor a 0";
        inputBuscarArea.value = "";
    } else {
        const figurasEncontradas = listaFiguras.filter((figura) => figura.area == areaBuscada);
        if (figurasEncontradas.length > 0) {
            cuerpoTablaFiguras.innerHTML = "";
            actualizarTablaYTotal(figurasEncontradas, false); //evito que se guarde la lista al mostrar
            alertVisualizacionYFiltros.textContent = "Se muestran las figuras con el area buscada";
        } else {
            actualizarTablaYTotal(listaFiguras);
            alertVisualizacionYFiltros.textContent = "No se encontraron figuras con esa area";
        }
        inputBuscarArea.value = "";
    }
};

//BOTON BORRAR PRIMERA FIGURA
let btnBorrarPrimeraFigura = document.getElementById("btn-borrar-primera");
btnBorrarPrimeraFigura.onclick = () => {
    limpiarAlerts();
    if (listaFiguras.length === 0) {
        alertEdicionYEliminacion.textContent = "La lista de figuras esta vacia";
    } else {
        listaFiguras.shift();
        actualizarTablaYTotal(listaFiguras);
        alertEdicionYEliminacion.textContent = "Se borro la primera figura de la lista";
    }
};

//BOTON BORRAR ULTIMA FIGURA
let btnBorrarUltimaFigura = document.getElementById("btn-borrar-ultima");
btnBorrarUltimaFigura.onclick = () => {
    limpiarAlerts();
    if (listaFiguras.length === 0) {
        alertEdicionYEliminacion.textContent = "La lista de figuras esta vacia";
    } else {
        listaFiguras.pop();
        actualizarTablaYTotal(listaFiguras);
        alertEdicionYEliminacion.textContent = "Se borro la ultima figura de la lista";
    }
};

//BOTON BORRAR FIGURA POR INDICE
let inputBorrarIndice = document.getElementById("input-indice-borrar");
let btnBorrarIndice = document.getElementById("btn-borrar-indice");
btnBorrarIndice.onclick = () => {
    limpiarAlerts();
    let indiceBorrar = parseInt(inputBorrarIndice.value);
    if (indiceBorrar >= listaFiguras.length || isNaN(indiceBorrar) || indiceBorrar < 0) {
        alertEdicionYEliminacion.textContent =
            "El indice debe ser un numero entero positivo menor al tamaño de la lista";
        inputBorrarIndice.value = "";
    } else {
        listaFiguras.splice(indiceBorrar, 1)[0];
        actualizarTablaYTotal(listaFiguras);
        inputBorrarIndice.value = "";
        alertEdicionYEliminacion.textContent = "Se borro la figura del indice ingresado";
    }
};

//BOTON REEMPLAZAR FIGURA POR INDICE
let inputReemplazarIndice = document.getElementById("input-indice-reemplazar");
let inputReemplazarArea = document.getElementById("input-nuevo-valor-area");
let btnReemplazarFigura = document.getElementById("btn-reemplazar");
btnReemplazarFigura.onclick = () => {
    limpiarAlerts();
    let indiceReemplazar = parseInt(inputReemplazarIndice.value);
    let nuevaArea = parseFloat(inputReemplazarArea.value);
    if (indiceReemplazar >= listaFiguras.length || isNaN(indiceReemplazar) || indiceReemplazar < 0) {
        alertEdicionYEliminacion.textContent =
            "El indice debe ser un numero entero positivo menor al tamaño de la lista";
        inputReemplazarIndice.value = "";
    } else if (!esNumeroMayorACero(nuevaArea)) {
        alertEdicionYEliminacion.textContent = "El area debe ser un numero mayor a 0";
        inputReemplazarArea.value = "";
    } else {
        listaFiguras[indiceReemplazar].area = nuevaArea;
        actualizarTablaYTotal(listaFiguras);
        inputReemplazarIndice.value = "";
        inputReemplazarArea.value = "";
        alertEdicionYEliminacion.textContent = "Se reemplazo el area de la figura del indice ingresado";
    }
};

//BOTON CONVERTIR AREA DE FIGURA A METROS
let inputConvertirIndice = document.getElementById("input-indice-convertir");
let btnConvertirAMetros = document.getElementById("btn-convertir-a-metros");
let btnConvertirACentimetros = document.getElementById("btn-convertir-a-cm");
btnConvertirAMetros.onclick = () => {
    limpiarAlerts();
    let indiceConvertir = parseInt(inputConvertirIndice.value);
    if (indiceConvertir >= listaFiguras.length || isNaN(indiceConvertir) || indiceConvertir < 0) {
        alertEdicionYEliminacion.textContent =
            "El indice debe ser un numero entero positivo menor al tamaño de la lista";
        inputConvertirIndice.value = "";
    } else if (listaFiguras[indiceConvertir].unidad == unidadM) {
        alertEdicionYEliminacion.textContent = "la figura ya esta en metros cuadrados";
        inputConvertirIndice.value = "";
    } else {
        listaFiguras[indiceConvertir].convertirAMetrosCuadrados();
        actualizarTablaYTotal(listaFiguras);
        inputConvertirIndice.value = "";
        alertEdicionYEliminacion.textContent = "Se convirtio el area de la figura del indice a metros cuadrados";
    }
};
btnConvertirACentimetros.onclick = () => {
    limpiarAlerts();
    let indiceConvertir = parseInt(inputConvertirIndice.value);
    if (indiceConvertir >= listaFiguras.length || isNaN(indiceConvertir) || indiceConvertir < 0) {
        alertEdicionYEliminacion.textContent =
            "El indice debe ser un numero entero positivo menor al tamaño de la lista";
        inputConvertirIndice.value = "";
    } else if (listaFiguras[indiceConvertir].unidad == unidadPorDefecto) {
        alertEdicionYEliminacion.textContent = "la figura ya esta en centimetros cuadrados";
        inputConvertirIndice.value = "";
    } else {
        listaFiguras[indiceConvertir].convertirACentimetrosCuadrados();
        actualizarTablaYTotal(listaFiguras);
        inputConvertirIndice.value = "";
        alertEdicionYEliminacion.textContent = "Se convirtio el area de la figura del indice a centimetros cuadrados";
    }
};

//BOTON ELIMINAR TODA LA LISTA
let btnBorrarLista = document.getElementById("btn-borrar-lista");
let labelBorrar = document.getElementById("label-borrar");
btnBorrarLista.onclick = () => {
    limpiarAlerts();

    if (listaFiguras.length === 0) {
        alertTablaFiguras.textContent = "La lista de figuras ya esta vacia";
    } else if (!btnBorrarLista.classList.contains("boton-personal-rojo")) {
        btnBorrarLista.classList.remove("boton-personal"); //primer click
        btnBorrarLista.classList.add("boton-personal-rojo");
        labelBorrar.textContent = "¿Esta seguro?";
        alertTablaFiguras.textContent = "Presione nuevamente el boton para confirmar el borrado total";
    } else {
        listaFiguras = [];
        localStorage.removeItem("lista-figuras");
        actualizarTablaYTotal(listaFiguras);

        btnBorrarLista.classList.remove("boton-personal-rojo");
        btnBorrarLista.classList.add("boton-personal");
        btnBorrarLista.textContent = "Eliminar";

        labelBorrar.textContent = "Borrar lista";
        alertTablaFiguras.textContent = "Se borraron todas las figuras de la lista";
    }
};



actualizarTablaYTotal(listaFiguras); //al cargar la pagina muestro la lista de figuras


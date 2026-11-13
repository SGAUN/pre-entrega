const pi = 3.14;
const unidadCM = "cm^2";
const unidadM = "m^2";
const unidadPorDefecto = unidadCM;
class Figura2D {
    static id = 0;
    constructor(nombre, area, unidad, color) {
        this.id = ++Figura2D.id;
        this.nombre = nombre;
        this.area = area;
        this.unidad = unidad;
        this.color = color;
    }
    convertirAMetrosCuadrados() {
        this.area = this.area / 10000;
        this.unidad = unidadM;
    }
    convertirACentimetrosCuadrados() {
        this.area = this.area * 10000;
        this.unidad = unidadPorDefecto;
    }
}

const esNumeroMayorACero = (numero = 0) => !isNaN(numero) && numero > 0; //comprueba si el valor ingresado es un numero mayor a 0

function obtenerColor(nombreFigura) {
    const colores = {
        circulo: "rojo",
        cuadrado: "verde",
        rectangulo: "azul",
    }; //objeto Colores
    return colores[nombreFigura] || "blanco"; //notacion corchete: objetoColores[propiedad]
} //retorna un color segun el nombre de una figura, codigo colores: rojo verde y azul se usa para areas calculadas por el simulador y sin modificar, elcolor blanco para otro caso

const listaFiguras = [];
/*
//MENSAJES DE ALERT PARA CADA SECCION
let alertAñadirConjuntoDeFiguras = document.getElementById("alert-agregar-figuras-grupales");
let alertAñadirFigurasIndividuales = document.getElementById("alert-añadir-figuras-individuales");
let alertVisualizacionYFiltros = document.getElementById("alert-visualizacion-y-filtros");
let alertEdicionYEliminacion = document.getElementById("alert-edicion-y-eliminacion");
function limpiarAlerts() {
    alertAñadirConjuntoDeFiguras.textContent = "";
    alertAñadirFigurasIndividuales.textContent = "";
    alertVisualizacionYFiltros.textContent = "";
    alertEdicionYEliminacion.textContent = "";
} //funcion para limpiar los mensaje de alert

//CUERPO DE LA TABLA Y SPAN DEL AREA TOTAL
//BOTONES DE ORDENAR Y VER LISTA
let cuerpoTablaFiguras = document.getElementById("cuerpo-tabla-figuras");
let spanAreaTotal = document.getElementById("span-area-total");
let btnVerLista = document.getElementById("btn-ver-lista");
let btnOrdenarAsc = document.getElementById("btn-ordenar-asc");
let btnOrdenarDesc = document.getElementById("btn-ordenar-desc");
const buscarBotonActivo = (listaBotones) => listaBotones.find((boton) => boton.classList.contains("activo")) || null; //busca el boton activo de una lista de botones y lo devuelve
function actualizarTablaYTotal(listaFiguras) {
    cuerpoTablaFiguras.innerHTML = "";
    let areaTotal = 0;
    let copiaListaFiguras = listaFiguras; //no quiero modificar la lista original

    let botonActivo = buscarBotonActivo([btnVerLista, btnOrdenarAsc, btnOrdenarDesc]);
    botonActivo == btnOrdenarAsc && (copiaListaFiguras = listaFiguras.toSorted((a, b) => a.area - b.area)); //muestra la lista segun
    botonActivo == btnOrdenarDesc && (copiaListaFiguras = listaFiguras.toSorted((a, b) => b.area - a.area)); //el boton seleccionado de orden

    copiaListaFiguras.forEach((figura) => {
        let indiceOriginal = listaFiguras.indexOf(figura); //busca el indice real de la lista original
        areaTotal += figura.unidad == unidadM ? figura.area * 10000 : figura.area;
        let { id, nombre, area, unidad, color } = figura; //destructuring
        let fila = document.createElement("tr");
        fila.innerHTML = `  <td>${indiceOriginal}</td>
                            <td>${id}</td>
                            <td>${nombre}</td>
                            <td>${area}</td>
                            <td>${unidad}</td>
                            <td>${color}</td>`;
        cuerpoTablaFiguras.appendChild(fila);
    });
    spanAreaTotal.textContent = areaTotal.toFixed(2);
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
            actualizarTablaYTotal([figuraEncontrada]);
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
            actualizarTablaYTotal(figurasEncontradas);
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
*/

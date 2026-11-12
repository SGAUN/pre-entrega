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
        let indice = listaFiguras.indexOf(figura); //busca el indice real de la lista original
        areaTotal += figura.unidad == unidadM ? figura.area * 10000 : figura.area;
        let fila = document.createElement("tr");
        fila.innerHTML = `  <td>${indice}</td>
                            <td>${figura.id}</td>
                            <td>${figura.nombre}</td>
                            <td>${figura.area}</td>
                            <td>${figura.unidad}</td>
                            <td>${figura.color}</td>`;
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

//BOTON DE AGREGAR FIGURA 1
let btnAgregarFigura1 = document.getElementById("btn-agregar-figura-1");
function cargarFigura1(listaFiguras) {
    const figura1 = new Figura2D("circulo", 10, unidadPorDefecto, obtenerColor("circulo"));
    const figura2 = new Figura2D("circulo", 10, unidadPorDefecto, obtenerColor("circulo"));
    const figura3 = new Figura2D("rectangulo", 10 * 10, unidadPorDefecto, obtenerColor("rectangulo"));
    listaFiguras.push(figura1, figura2, figura3);
} //carga 2 circulos y 1 rectangulo de ejemplo a la lista de figuras
btnAgregarFigura1.onclick = () => {
    limpiarAlerts();
    cargarFigura1(listaFiguras);
    actualizarTablaYTotal(listaFiguras);
    alertAñadirConjuntoDeFiguras.textContent =
        "Se agregaron 2 circulos y 1 rectangulo de ejemplo a la lista de figuras";
}; //al hacer click carga figuras de ejemplo 1

//BOTON DE AGREGAR FIGURA 2
let btnAgregarFigura2 = document.getElementById("btn-agregar-figura-2");
function cargarFigura2(listaFiguras) {
    const figura1 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura2 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura3 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura4 = new Figura2D("circulo", pi * 4 * 4, unidadPorDefecto, obtenerColor("circulo"));
    const figura5 = new Figura2D("circulo", pi * 4 * 4, unidadPorDefecto, obtenerColor("circulo"));
    listaFiguras.push(figura1, figura2, figura3, figura4, figura5);
} //carga 3 cuadrados de lado 2cm y 2 circulos de radio 4 a la lista de figuras
btnAgregarFigura2.onclick = () => {
    limpiarAlerts();
    cargarFigura2(listaFiguras);
    actualizarTablaYTotal(listaFiguras);
    alertAñadirConjuntoDeFiguras.textContent = "Se agregaron 3 cuadrados y 2 circulos de ejemplo a la lista de figuras";
}; //al hacer click carga figuras de ejemplo 2

//BOTON DE AGREGAR CIRCULO
let inputRadioCirculo = document.getElementById("input-radio-circulo");
let btnAgregarCirculo = document.getElementById("btn-agregar-circulo");
btnAgregarCirculo.onclick = () => {
    limpiarAlerts();
    let radio = Number(inputRadioCirculo.value);
    if (!esNumeroMayorACero(radio)) {
        alertAñadirFigurasIndividuales.textContent = "El radio debe ser un número mayor a 0";
    } else {
        const areaCirculo = pi * radio ** 2;
        const nuevaFigura = new Figura2D("circulo", areaCirculo, unidadPorDefecto, obtenerColor("circulo"));
        listaFiguras.push(nuevaFigura);
        inputRadioCirculo.value = "";
        actualizarTablaYTotal(listaFiguras);
        alertAñadirFigurasIndividuales.textContent = "Se agrego un circulo a la lista de figuras";
    }
};

//BOTON DE AGREGAR CUADRADO
let inputLadoCuadrado = document.getElementById("input-lado-cuadrado");
let btnAgregarCuadrado = document.getElementById("btn-agregar-cuadrado");
btnAgregarCuadrado.onclick = () => {
    limpiarAlerts();
    let lado = Number(inputLadoCuadrado.value);
    if (!esNumeroMayorACero(lado)) {
        alertAñadirFigurasIndividuales.textContent = "El lado del cuadrado debe ser un número mayor a 0";
    } else {
        const areaCuadrado = lado * lado;
        const nuevaFigura = new Figura2D("cuadrado", areaCuadrado, unidadPorDefecto, obtenerColor("cuadrado"));
        listaFiguras.push(nuevaFigura);
        inputLadoCuadrado.value = "";
        actualizarTablaYTotal(listaFiguras);
        alertAñadirFigurasIndividuales.textContent = "Se agrego un cuadrado a la lista de figuras";
    }
};

//BOTON DE AGREGAR RECTANGULO
let inputBaseRectangulo = document.getElementById("input-base-rectangulo");
let inputAlturaRectangulo = document.getElementById("input-altura-rectangulo");
let btnAgregarRectangulo = document.getElementById("btn-agregar-rectangulo");
btnAgregarRectangulo.onclick = () => {
    limpiarAlerts();
    let base = Number(inputBaseRectangulo.value);
    let altura = Number(inputAlturaRectangulo.value);
    if (!esNumeroMayorACero(base)) {
        alertAñadirFigurasIndividuales.textContent = "La base del rectangulo deben ser números mayores a 0";
    } else if (!esNumeroMayorACero(altura)) {
        alertAñadirFigurasIndividuales.textContent = "La altura del rectangulo deben ser números mayores a 0";
    } else {
        const areaRectangulo = base * altura;
        const nuevaFigura = new Figura2D("rectangulo", areaRectangulo, unidadPorDefecto, obtenerColor("rectangulo"));
        listaFiguras.push(nuevaFigura);
        inputBaseRectangulo.value = "";
        inputAlturaRectangulo.value = "";
        actualizarTablaYTotal(listaFiguras);
        alertAñadirFigurasIndividuales.textContent = "Se agrego un rectangulo a la lista de figuras";
    }
};

//BOTON DE AGREGAR AREA PERSONALIZADA
let inputAreaPersonalizada = document.getElementById("input-area-personalizada");
let btnAreaPersonalizado = document.getElementById("btn-area-personalizada");
btnAreaPersonalizado.onclick = () => {
    limpiarAlerts();
    let area = Number(inputAreaPersonalizada.value);
    if (!esNumeroMayorACero(area)) {
        alertAñadirFigurasIndividuales.textContent = "El area personalizada debe ser un número mayor a 0";
    } else {
        const nuevaFigura = new Figura2D("personalizado", area, unidadPorDefecto, "blanco");
        listaFiguras.push(nuevaFigura);
        inputAreaPersonalizada.value = "";
        actualizarTablaYTotal(listaFiguras);
        alertAñadirFigurasIndividuales.textContent = "Se agrego un area personalizada a la lista de figuras";
    }
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

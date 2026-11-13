//MENSAJES DE ALERT PARA CADA SECCION
let alertAñadirConjuntoDeFiguras = document.getElementById("alert-agregar-figuras-grupales");
let alertAñadirFigurasIndividuales = document.getElementById("alert-añadir-figuras-individuales");
function limpiarAlerts() {
    alertAñadirConjuntoDeFiguras.textContent = "";
    alertAñadirFigurasIndividuales.textContent = "";
} //funcion para limpiar los mensaje de alert

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
        alertAñadirFigurasIndividuales.textContent = "Se agrego un area personalizada a la lista de figuras";
    }
};
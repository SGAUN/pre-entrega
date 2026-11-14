const imageneFiguraCirculo = "../assets/img/circulo-rojo.png";
const imageneFiguraCuadrado = "../assets/img/cuadrado-verde.png";
const imageneFiguraRectangulo = "../assets/img/rectangulo-azul.png";

let listaFigurasArmadas = [
    {
        id: 101,
        nombre: "circulo",
        area: 1,
        unidad: unidadPorDefecto,
        color: "rojo",
        cantidad: 1,
    },
    {
        id: 100,
        nombre: "cuadrado",
        area: 1,
        unidad: unidadPorDefecto,
        color: "rojo",
        cantidad: 1,
    },
    {
        id: 102,
        nombre: "rectangulo",
        area: 1,
        unidad: unidadPorDefecto,
        color: "verde",
        cantidad: 1,
    },
    {
        id: 104,
        nombre: "circulo",
        area: 10,
        unidad: unidadPorDefecto,
        color: "rojo",
        cantidad: 1,
    },
    {
        id: 103,
        nombre: "cuadrado",
        area: 10,
        unidad: unidadPorDefecto,
        color: "azul",
        cantidad: 1,
    },

    {
        id: 105,
        nombre: "rectangulo",
        area: 10,
        unidad: unidadPorDefecto,
        color: "verde",
        cantidad: 1,
    },
];

//MENSAJES DE ALERT PARA CADA SECCION
let alertAñadirConjuntoDeFiguras = document.getElementById("alert-agregar-figuras-grupales");
let alertAñadirFigurasIndividuales = document.getElementById("alert-añadir-figuras-individuales");
let alertAgregarFigurasArmadas = document.getElementById("alert-agregar-figuras-armadas");
function limpiarAlerts() {
    alertAñadirConjuntoDeFiguras.textContent = "";
    alertAñadirFigurasIndividuales.textContent = "";
    alertAgregarFigurasArmadas.textContent = "";
} //funcion para limpiar los mensaje de alert

function sonIguales2Figuras(figura1, figura2) {
    return (
        figura1.nombre == figura2.nombre &&
        figura1.area == figura2.area &&
        figura1.unidad == figura2.unidad &&
        figura1.color == figura2.color
    );
} //compara si 2 figuras son iguales

function agregarFigura(listaFiguras, ...nuevasFiguras) {
    nuevasFiguras.forEach((nuevaFigura) => {
        let figuraExistente = listaFiguras.find((figuraEnLista) => sonIguales2Figuras(figuraEnLista, nuevaFigura));
        figuraExistente ? (figuraExistente.cantidad += nuevaFigura.cantidad) : listaFiguras.push(nuevaFigura);
    });
} //agrega una o varias figuras a la lista, y si existe aumenta la cantidad

//BOTON DE AGREGAR FIGURA 1
let btnAgregarFigura1 = document.getElementById("btn-agregar-figura-1");
function cargarFigura1(listaFiguras) {
    const figura1 = new Figura2D("circulo", 10, unidadPorDefecto, obtenerColor("circulo"), 2);
    const figura2 = new Figura2D("rectangulo", 10 * 10, unidadPorDefecto, obtenerColor("rectangulo"), 1);
    agregarFigura(listaFiguras, figura1, figura2);
} //carga 2 circulos y 1 rectangulo de ejemplo a la lista de figuras
btnAgregarFigura1.onclick = () => {
    limpiarAlerts();
    cargarFigura1(listaFiguras);
    alertAñadirConjuntoDeFiguras.textContent =
        "Se agregaron 2 circulos y 1 rectangulo de ejemplo a la lista de figuras";
    guardarLista();
}; //al hacer click carga figuras de ejemplo 1

//BOTON DE AGREGAR FIGURA 2
let btnAgregarFigura2 = document.getElementById("btn-agregar-figura-2");
function cargarFigura2(listaFiguras) {
    const figura1 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"), 3);
    const figura2 = new Figura2D("circulo", pi * 4 * 4, unidadPorDefecto, obtenerColor("circulo"), 2);
    agregarFigura(listaFiguras, figura1, figura2);
} //carga 3 cuadrados de lado 2cm y 2 circulos de radio 4 a la lista de figuras
btnAgregarFigura2.onclick = () => {
    limpiarAlerts();
    cargarFigura2(listaFiguras);
    alertAñadirConjuntoDeFiguras.textContent = "Se agregaron 3 cuadrados y 2 circulos de ejemplo a la lista de figuras";
    guardarLista();
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
        agregarFigura(listaFiguras, nuevaFigura);
        inputRadioCirculo.value = "";
        alertAñadirFigurasIndividuales.textContent = "Se agrego un circulo a la lista de figuras";
        guardarLista();
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
        agregarFigura(listaFiguras, nuevaFigura);
        inputLadoCuadrado.value = "";
        alertAñadirFigurasIndividuales.textContent = "Se agrego un cuadrado a la lista de figuras";
        guardarLista();
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
        agregarFigura(listaFiguras, nuevaFigura);
        inputBaseRectangulo.value = "";
        inputAlturaRectangulo.value = "";
        alertAñadirFigurasIndividuales.textContent = "Se agrego un rectangulo a la lista de figuras";
        guardarLista();
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
        agregarFigura(listaFiguras, nuevaFigura);
        inputAreaPersonalizada.value = "";
        alertAñadirFigurasIndividuales.textContent = "Se agrego un area personalizada a la lista de figuras";
        guardarLista();
    }
};

//FUNCIONES PARA AGREGAR FIGURAS ARMADAS
function obtenerImagenFigura(nombreFigura) {
    const imagenes = {
        circulo: imageneFiguraCirculo,
        cuadrado: imageneFiguraCuadrado,
        rectangulo: imageneFiguraRectangulo,
    };
    return imagenes[nombreFigura];
}
let contenedorFigurasArmadas = document.getElementById("contenedor-figuras-armadas");
function agregarFiguraArmada(figuraArmada) {
    let botonAgregarFiguraArmada = document.querySelectorAll(".btn-agregar-figura-armada");
    botonAgregarFiguraArmada.forEach((boton) => {
        boton.onclick = (e) => {
            limpiarAlerts();
            const botonId = e.currentTarget.id;
            const figuraId = parseInt(botonId.split("-")[3]);
            const figuraSeleccionada = listaFigurasArmadas.find((figura) => figura.id == figuraId);
            alertAgregarFigurasArmadas.textContent = `Se agrego la figura ${figuraSeleccionada.nombre} de area ${figuraSeleccionada.area} ${figuraSeleccionada.unidad} a la lista de figuras`;
            agregarFigura(listaFiguras, figuraSeleccionada);
            guardarLista();
        };
    });
}
function renderFigurasArmadas(listaFigurasArmadas) {
    listaFigurasArmadas.forEach((figura) => {
        const card = document.createElement("div");
        card.className = "col-xl-6 celda-grilla";

        card.innerHTML = `
            <article class="card bg-oscuro">
                <img src="${obtenerImagenFigura(figura.nombre)}" class="estilo-modos-img" />
                <div class="card-body">
                    <h3>Figura: ${figura.nombre} de area ${figura.area} ${figura.unidad}</h3>
                    <button class="btn boton-personal btn-agregar-figura-armada" id="btn-agregar-figura-${figura.id}">Agregar Figura</button>
                </div>
            </article>
        `;
        contenedorFigurasArmadas.appendChild(card);
    });
    agregarFiguraArmada(listaFigurasArmadas);
}
renderFigurasArmadas(listaFigurasArmadas);


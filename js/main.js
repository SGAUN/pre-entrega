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
    mostrarDatos(mensaje) {
        console.log(mensaje, "ID:", this.id, this.nombre, this.color, "area:", this.area, this.unidad);
    }
}

function convertirAreaDeFigura(listaFiguras, unidad) {
    let indice = parseInt(prompt("ingrese el indice de la figura que desea convertir a " + unidad));
    if (isNaN(indice) || indice < 0 || indice >= listaFiguras.length) {
        console.log("indice invalido");
        return;
    }
    if (listaFiguras[indice].unidad == unidad) {
        console.log("la figura ya esta en", unidad);
        return;
    }
    if (unidad == unidadM) {
        listaFiguras[indice].convertirAMetrosCuadrados();
    } else {
        listaFiguras[indice].convertirACentimetrosCuadrados();
    }
    listaFiguras[indice].mostrarDatos("figura convertida a " + unidad + ":");
} //5 y 6 convierte el area de una figura a metros o centimetros segun la unidad

function borrarFiguraSegunIndice(listaFiguras) {
    let indiceBorrar = parseInt(prompt("ingrese el indice de la figura que desea borrar"));
    if (isNaN(indiceBorrar) || indiceBorrar < 0 || indiceBorrar >= listaFiguras.length) {
        console.log("indice invalido");
        return;
    }
    let figuraBorrada = listaFiguras.splice(indiceBorrar, 1)[0];
    figuraBorrada.mostrarDatos(" figura borrada:");
} //4 borra una figura segun el indice

function borrarUltimaFigura(listaFiguras) {
    const ultimaFigura = listaFiguras.pop();
    ultimaFigura.mostrarDatos("ultima figura borrada:");
} //3 borra la ultima area agregada

function borrarPrimeraFigura(listaFiguras) {
    const primeraFigura = listaFiguras.shift();
    primeraFigura.mostrarDatos("primera figura borrada:");
} //2 borra la primera area agregada

const esNumeroMayorACero = (numero = 0) => !isNaN(numero) && numero > 0; //comprueba si el valor ingresado es un numero mayor a 0

function reemplazarAreaDeFiguraSegunIndice(listaFiguras) {
    let indiceReemplazar = parseInt(prompt("ingrese el indice del area que desea reemplazar"));
    if (isNaN(indiceReemplazar) || indiceReemplazar < 0 || indiceReemplazar >= listaFiguras.length) {
        console.log("indice invalido");
        return;
    }
    let nuevaArea = Number(prompt("ingrese el nuevo valor del area (en " + unidadPorDefecto + ")"));
    if (!esNumeroMayorACero(nuevaArea)) {
        console.log("el nuevo valor del area debe ser un numero mayor a 0");
        return;
    }
    listaFiguras[indiceReemplazar].area = nuevaArea;
    listaFiguras[indiceReemplazar].color = "blanco";
    listaFiguras[indiceReemplazar].unidad = unidadPorDefecto;
    listaFiguras[indiceReemplazar].mostrarDatos("figura reemplazada:");
} //1 reemplaza un area de una figura por otra

function menuEditarFiguras(listaFiguras) {
    if (listaFiguras.length == 0) {
        console.log("la lista de  figuras esta vacia");
        return;
    }
    const opcion = parseInt(
        prompt(
            "menu de edicion:\n" +
                "(1) reemplazar figura segun el indice\n" +
                "(2) borrar la primera figura\n" +
                "(3) borrar la ultima figura\n" +
                "(4) borrar figura especifica por indice\n" +
                "(5) convertir area de figura a metros\n" +
                "(6) convertir area de figura a centimetros\n",
        ),
    );
    switch (opcion) {
        case 1: //reemplazar area por indice
            reemplazarAreaDeFiguraSegunIndice(listaFiguras);
            break;
        case 2: //borrar primera figura
            borrarPrimeraFigura(listaFiguras);
            break;
        case 3: //borrar ultima figura
            borrarUltimaFigura(listaFiguras);
            break;
        case 4: //borrar  figura por indice
            borrarFiguraSegunIndice(listaFiguras);
            break;
        case 5: //convertir a metros
            convertirAreaDeFigura(listaFiguras, unidadM);
            break;
        case 6: //convertir a centimetros
            convertirAreaDeFigura(listaFiguras, unidadPorDefecto);
            break;
        default: //volver al menu principal
            console.log("opcion invalida");
    }
}

function buscarFiguraPorID(listaFiguras) {
    let idBuscado = parseInt(prompt("ingrese el ID de la figura que desea buscar"));
    if (!esNumeroMayorACero(idBuscado)) {
        console.log("el ID debe ser un numero entero positivo");
        return;
    }

    const figuraEncontrada = listaFiguras.find((figura) => figura.id == idBuscado);
    if (figuraEncontrada) {
        figuraEncontrada.mostrarDatos("figura encontrada:");
        return;
    }
    console.log("figura no encontrada con ese ID");
} //7 busca un figura segun el ID y lo muestra

function buscarFigurasPorArea(listaFiguras) {
    let areaBuscada = Number(
        prompt("ingrese el valor del area de la figura que desea buscar (en " + unidadPorDefecto + ")"),
    );
    if (!esNumeroMayorACero(areaBuscada)) {
        console.log("el valor del area buscada debe ser un numero mayor a 0");
        return;
    }

    const figurasEncontradas = listaFiguras.filter((figura) => figura.area == areaBuscada);
    if (figurasEncontradas.length == 0) {
        console.log("el area buscada no existe en la lista de figuras");
        return;
    }

    console.log("el area buscada existe en la lista de figuras");
    figurasEncontradas.forEach((figura) => {
        let indice = listaFiguras.indexOf(figura);
        figura.mostrarDatos("indice: " + indice + " |");
    });
} //6 busca si en lal ista de figuras existe una figura con el area ingresada

function mostrarAreaTotal(listaFiguras) {
    const areaTotal = listaFiguras.reduce((acumulador, elemento) => {
        if (elemento.unidad == unidadM) {
            return acumulador + elemento.area * 10000;
        } else {
            return acumulador + elemento.area;
        }
    }, 0);
    console.log("el area total de todas las figuras es:", areaTotal, unidadPorDefecto);
} //5 muestra el calculo del area total de todas las figuras

function mostrarListaFiguras(listaFiguras, orden = "") {
    let figurasAProcesar = listaFiguras;

    if (orden === "ascendente") {
        console.log("lista de figuras ordenadas ascendentemente:");
        figurasAProcesar = listaFiguras.toSorted((a, b) => a.area - b.area);
    } else if (orden === "descendente") {
        console.log("lista de figuras ordenadas descendentemente:");
        figurasAProcesar = listaFiguras.toSorted((a, b) => b.area - a.area);
    } else {
        console.log("lista de figuras guardadas:");
    }

    figurasAProcesar.forEach((figura) => {
        let indice = listaFiguras.indexOf(figura);
        figura.mostrarDatos("indice: " + indice + " |");
    });
} //1 2 3 muestra lista de figuras guardadas

function mostrarFigurasPorRango(listaFiguras) {
    let valorPrimero = Number(prompt("ingrese el primer valor del rango (en " + unidadPorDefecto + ")"));
    if (!esNumeroMayorACero(valorPrimero)) {
        console.log("el valor minimo del rango debe ser un numero mayor a 0");
        return;
    }
    let valorSegundo = Number(prompt("ingrese el segundo valor del rango (en " + unidadPorDefecto + ")"));
    if (!esNumeroMayorACero(valorSegundo)) {
        console.log("el valor maximo del rango debe ser un numero mayor a 0");
        return;
    }

    if (valorPrimero > valorSegundo) {
        let aux = valorPrimero;
        valorPrimero = valorSegundo;
        valorSegundo = aux;
    }

    const figurasEnRango = listaFiguras.filter((figura) => figura.area >= valorPrimero && figura.area <= valorSegundo);
    if (figurasEnRango.length == 0) {
        console.log("no hay figuras en el rango especificado");
        return;
    }
    console.log("figuras en el rango de", valorPrimero, "a", valorSegundo, unidadPorDefecto);
    figurasEnRango.forEach((figura) => {
        let indiceReal = listaFiguras.indexOf(figura);
        figura.mostrarDatos("indice: " + indiceReal + " |");
    });
} //4 muestra las figuras que estan dentro de un rango de 2 valores

function menuInformacionFiguras(listaFiguras) {
    if (listaFiguras.length == 0) {
        console.log("la lista de figuras esta vacia");
        return;
    }
    const opcion = parseInt(
        prompt(
            "menu de informacion:\n" +
                "(1) ver lista de  figuras\n" +
                "(2) ver figuras ordenadas ascendentemente\n" +
                "(3) ver figuras ordenadas descendentemente\n" +
                "(4) mostrar figuras por rango\n" +
                "(5) mostrar area total\n" +
                "(6) buscar figura por area\n" +
                "(7) buscar figura por id\n",
        ),
    );
    switch (opcion) {
        case 1: //mostrar lista de  figuras
            mostrarListaFiguras(listaFiguras);
            break;
        case 2: //mostrar figuras ordenadas ascendentemente
            mostrarListaFiguras(listaFiguras, "ascendente");
            break;
        case 3: //mostrar figuras ordenadas descendentemente
            mostrarListaFiguras(listaFiguras, "descendente");
            break;
        case 4: //mostrar figuras por rango
            mostrarFigurasPorRango(listaFiguras);
            break;
        case 5: //mostrar area total
            mostrarAreaTotal(listaFiguras);
            break;
        case 6: //buscar figura por area
            buscarFigurasPorArea(listaFiguras);
            break;
        case 7: //buscar figura por id
            buscarFiguraPorID(listaFiguras);
            break;
        default: //volver al menu principal
            console.log("volviendo al menu principal");
    }
}

function cargarFigurasEjemplo(listaFiguras) {
    let multiplicador = listaFiguras.length + 1;

    const figura1 = new Figura2D("circulo", 34 * multiplicador, unidadPorDefecto, obtenerColor("circulo"));
    const figura2 = new Figura2D("cuadrado", 12 * multiplicador, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura3 = new Figura2D("rectangulo", 56 * multiplicador, unidadPorDefecto, obtenerColor("rectangulo"));
    listaFiguras.push(figura1, figura2, figura3);
    console.log("figuras de ejemplo cargadas correctamente");
} //5 carga figuras de ejemplo siempre con valores de area distintos entre si

function ingresarAreaPersonalizada() {
    let area = Number(prompt("ingrese el valor del area personalizada (en " + unidadPorDefecto + ")"));
    if (!esNumeroMayorACero(area)) {
        console.log("el valor del area personalizada ingresado debe ser un numero mayor a 0");
        return null;
    }
    return area;
} //4 ingresa un area personalizada y la devuelve

const obtenerAreaRectangulo = (base = 0, altura = 0) => base * altura; //con base y altura calcula el area del rectangulo

function calcularAreaRectangulo() {
    let base = Number(prompt("ingrese la base del rectangulo"));
    if (!esNumeroMayorACero(base)) {
        console.log("la base del rectangulo ingresada debe ser un numero mayor a 0");
        return null;
    }
    let altura = Number(prompt("ingrese la altura del rectangulo"));
    if (!esNumeroMayorACero(altura)) {
        console.log("la altura del rectangulo ingresada debe ser un numero mayor a 0");
        return null;
    }
    return obtenerAreaRectangulo(base, altura);
} //3 calcula el area del rectangulo y la devuelve

function calcularAreaCuadrado() {
    let lado = Number(prompt("ingrese el lado del cuadrado"));
    if (!esNumeroMayorACero(lado)) {
        console.log("el lado del cuadrado ingresado debe ser un numero mayor a 0");
        return null;
    }
    return obtenerAreaRectangulo(lado, lado);
} //2 calcula el area del cuadrado y la devuelve

function calcularAreaCirculo() {
    let radio = Number(prompt("ingrese el radio del circulo"));
    if (!esNumeroMayorACero(radio)) {
        console.log("el radio del circulo ingresado debe ser un numero mayor a 0");
        return null;
    }
    return pi * radio ** 2;
} //1 calcula el area del circulo y la devuelve

function obtenerColor(nombreFigura) {
    switch (nombreFigura) {
        case "circulo":
            return "rojo";
        case "cuadrado":
            return "verde";
        case "rectangulo":
            return "azul";
        default:
            return "blanco";
    }
} //retorna un color segun el nombre de una figura, codigo colores: rojo verde y azul se usa para areas calculadas por el simulador y sin modificar, elcolor blanco para otro caso

function agregarFigura(funcion, listaFiguras, nombreFigura) {
    const area = funcion();
    if (area != null) {
        let colorAsignado = obtenerColor(nombreFigura);
        const nuevaFigura = new Figura2D(nombreFigura, area, unidadPorDefecto, colorAsignado);
        listaFiguras.push(nuevaFigura);
        nuevaFigura.mostrarDatos("figura guardada correctamente:");
    }
} //agrega un area a la lista de areas

function menuAgregarFiguras(listaFiguras) {
    let opcion = parseInt(
        prompt(
            "menu de agregado de  figuras:\n" +
                "(1) agregar figura de un circulo\n" +
                "(2) agregar figura de un cuadrado\n" +
                "(3) agregar figura de un rectangulo\n" +
                "(4) agregar figura personalizada\n" +
                "(5) cargar figuras de ejemplo\n",
        ),
    );
    switch (opcion) {
        case 1: //calcula el area del circulo y la agrega a la lista
            agregarFigura(calcularAreaCirculo, listaFiguras, "circulo");
            break;
        case 2: //calcula el area del cuadrado y la agrega a la lista
            agregarFigura(calcularAreaCuadrado, listaFiguras, "cuadrado");
            break;
        case 3: //calcula el area del rectangulo y la agrega a la lista
            agregarFigura(calcularAreaRectangulo, listaFiguras, "rectangulo");
            break;
        case 4: //calcula un area personalizada y la agrega a la lista
            agregarFigura(ingresarAreaPersonalizada, listaFiguras, "personalizado");
            break;
        case 5: //cargar areas de ejemplo
            cargarFigurasEjemplo(listaFiguras);
            break;
        default:
            console.log("opcion invalida");
    }
}

function iniciarSimuladorFiguras() {
    const listaFiguras = [];
    while (confirm("deseas utilizar el gestor de  figuras?")) {
        let opcion = parseInt(
            prompt(
                "gestor de figuras:\n" +
                    "(1) agregar  figura a la lista\n" +
                    "(2) visualizar lista de figuras\n" +
                    "(3) editar lista de figuras\n",
            ),
        );
        switch (opcion) {
            case 1: //muestra opciones para agregar figuras a la lista
                menuAgregarFiguras(listaFiguras);
                break;
            case 2: //muestra opciones para visualizar las figuras de la lista
                menuInformacionFiguras(listaFiguras);
                break;
            case 3: //muestra opciones para editar las figuras de la lista
                menuEditarFiguras(listaFiguras);
                break;
            default: //mensaje de error
                console.log("opcion invalida");
        }
    }
}

//iniciarSimuladorFiguras();

const listaFiguras = [];

function cargarFigura1(listaFiguras) {
    const figura1 = new Figura2D("circulo", 10, unidadPorDefecto, obtenerColor("circulo"));
    const figura2 = new Figura2D("circulo", 10, unidadPorDefecto, obtenerColor("circulo"));
    const figura3 = new Figura2D("rectangulo", 10 * 10, unidadPorDefecto, obtenerColor("rectangulo"));
    listaFiguras.push(figura1, figura2, figura3);
} //carga 2 circulos y 1 rectangulo de ejemplo a la lista de figuras

function cargarFigura2(listaFiguras) {
    const figura1 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura2 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura3 = new Figura2D("cuadrado", 2 * 2, unidadPorDefecto, obtenerColor("cuadrado"));
    const figura4 = new Figura2D("circulo", pi * 4 * 4, unidadPorDefecto, obtenerColor("circulo"));
    const figura5 = new Figura2D("circulo", pi * 4 * 4, unidadPorDefecto, obtenerColor("circulo"));
    listaFiguras.push(figura1, figura2, figura3, figura4, figura5);
} //carga 3 cuadrados de lado 2cm y 2 circulos de radio 4 a la lista de figuras

let btnAgregarFigura1 = document.getElementById("btn-agregar-figura-1");
let btnAgregarFigura2 = document.getElementById("btn-agregar-figura-2");

function actualizarTablaYTotal(listaFiguras) {
    let cuerpoTablaFiguras = document.getElementById("cuerpo-tabla-figuras");
    cuerpoTablaFiguras.innerHTML = "";
    let spanAreaTotal = document.getElementById("span-area-total");
    let areaTotal = 0;

    listaFiguras.forEach((figura, indice) => {
        if (figura.unidad == unidadM) {
            areaTotal += figura.area * 10000;
        } else {
            areaTotal += figura.area;
        }

        let fila = document.createElement("tr");
        fila.innerHTML = `  <td>${indice}</td>
                            <td>${figura.id}</td>
                            <td>${figura.nombre}</td>
                            <td>${figura.area}</td>
                            <td>${figura.unidad}</td>
                            <td>${figura.color}</td>`;
        cuerpoTablaFiguras.appendChild(fila);
    });
    spanAreaTotal.textContent = areaTotal.toFixed(2);//con 2 decimales
}

btnAgregarFigura1.onclick = () => {
    cargarFigura1(listaFiguras);
    console.log("figuras de ejemplo 1 cargadas correctamente");
    actualizarTablaYTotal(listaFiguras);
};

btnAgregarFigura2.onclick = () => {
    cargarFigura2(listaFiguras);
    console.log("figuras de ejemplo 2 cargadas correctamente");
    actualizarTablaYTotal(listaFiguras);
};

let btnMostrarLista = document.getElementById("btn-mostrar-lista");
btnMostrarLista.onclick = () => {
    actualizarTablaYTotal(listaFiguras);
    console.log("lista de figuras mostrada en la tabla y area total calculada");
};

let inputRadioCirculo = document.getElementById("input-radio-circulo");
let btnAgregarCirculo = document.getElementById("btn-agregar-circulo");
btnAgregarCirculo.onclick = () => {
    let radio = Number(inputRadioCirculo.value);
    if (!esNumeroMayorACero(radio)) {
        alert("el radio del circulo ingresado debe ser un numero mayor a 0");
        return;
    }
    const areaCirculo = pi * radio ** 2;
    const nuevaFigura = new Figura2D("circulo", areaCirculo, unidadPorDefecto, obtenerColor("circulo"));
    listaFiguras.push(nuevaFigura);
    console.log("circulo agregado correctamente con area:", areaCirculo);
    inputRadioCirculo.value = "";
    actualizarTablaYTotal(listaFiguras);
};

let inputLadoCuadrado = document.getElementById("input-lado-cuadrado");
let btnAgregarCuadrado = document.getElementById("btn-agregar-cuadrado");
btnAgregarCuadrado.onclick = () => {
    let lado = Number(inputLadoCuadrado.value);
    if (!esNumeroMayorACero(lado)) {
        alert("el lado del cuadrado ingresado debe ser un numero mayor a 0");
        return;
    }
    const areaCuadrado = lado * lado;
    const nuevaFigura = new Figura2D("cuadrado", areaCuadrado, unidadPorDefecto, obtenerColor("cuadrado"));
    listaFiguras.push(nuevaFigura);
    console.log("cuadrado agregado correctamente con area:", areaCuadrado);
    inputLadoCuadrado.value = "";
    actualizarTablaYTotal(listaFiguras);
}

let inputBaseRectangulo = document.getElementById("input-base-rectangulo");
let inputAlturaRectangulo = document.getElementById("input-altura-rectangulo");
let btnAgregarRectangulo = document.getElementById("btn-agregar-rectangulo");

btnAgregarRectangulo.onclick = () => {
    let base = Number(inputBaseRectangulo.value);
    let altura = Number(inputAlturaRectangulo.value);
    if (!esNumeroMayorACero(base) || !esNumeroMayorACero(altura)) {
        alert("la base y la altura del rectangulo ingresadas deben ser numeros mayores a 0");
        return;
    }

    const areaRectangulo = base * altura;
    const nuevaFigura = new Figura2D("rectangulo", areaRectangulo, unidadPorDefecto, obtenerColor("rectangulo"));
    listaFiguras.push(nuevaFigura);
    console.log("rectangulo agregado correctamente con area:", areaRectangulo);
    inputBaseRectangulo.value = "";
    inputAlturaRectangulo.value = "";
    actualizarTablaYTotal(listaFiguras);
};

let inputAreaPersonalizada = document.getElementById("input-area-personalizada");
let btnAreaPersonalizado = document.getElementById("btn-area-personalizada");

btnAreaPersonalizado.onclick = () => {
    let area = Number(inputAreaPersonalizada.value);
    if (!esNumeroMayorACero(area)) {
        alert("el area personalizada ingresada debe ser un numero mayor a 0");
        return;
    }
    const nuevaFigura = new Figura2D("personalizado", area, unidadPorDefecto, "blanco");
    listaFiguras.push(nuevaFigura);
    console.log("figura personalizada agregada correctamente con area:", area);
    inputAreaPersonalizada.value = "";
    actualizarTablaYTotal(listaFiguras);
}


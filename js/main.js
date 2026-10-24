const pi = 3.14;
const unidadCM = "cm^2";
const unidadM = "m^2";
const unidadPorDefecto = unidadCM;

const circulo = "circulo";
const cuadrado = "cuadrado";
const rectangulo = "rectangulo";
const personalizado = "personalizado";

//rojo verde y azul se usa para areas calculadas por el simulador y sin modificar, elcolor blanco para otro caso
const colorCirculo = "rojo";
const colorCuadrado = "verde";
const colorRectangulo = "azul";
const otroColor = "blanco";

const menuPrincipal =
    "gestor de superfices: ingrese el numero que quiera calcular:\n" +
    "(1) agregar area de un circulo\n" +
    "(2) agregar area de un cuadrado\n" +
    "(3) agregar area de un rectangulo\n" +
    "(4) agregar area personalizada\n" +
    "(5) cargar areas de ejemplo\n" +
    "(6) administrar lista de areas guardadas\n";
const menuAdministrarListaAreas =
    "gestion de areas guardadas:\n" +
    "(1) ver todas las areas\n" +
    "(2) buscar un area especifica\n" +
    "(3) reemplazar un area especifica\n" +
    "(4) borrar la primera area agregada\n" +
    "(5) borrar la ultima area agregada\n" +
    "(6) borrar un area especifica\n" +
    "(7) convertir area de cm^2 a m^2\n" +
    "(8) convertir area de m^2 a cm^2\n";

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
        this.unidad = unidadCM;
    }

    mostrarDatos(mensaje = "") {
        console.log(mensaje, "ID:", this.id, this.nombre, this.color, "area:", this.area, this.unidad);
    }
}

//retorna un color segun el nombre de una figura
function obtenerColor(nombreFigura) {
    switch (nombreFigura) {
        case circulo:
            return colorCirculo;
        case cuadrado:
            return colorCuadrado;
        case rectangulo:
            return colorRectangulo;
        default:
            return otroColor;
    }
}

//con radio calcula el area del circulo
const obtenerAreaCirculo = (radio = 0) => pi * radio ** 2;

//con base y altura calcula el area del rectangulo
const obtenerAreaRectangulo = (base = 0, altura = 0) => base * altura;

//comprueba si el valor ingresado es un numero mayor a 0
const esNumeroMayorACero = (numero = 0) => !isNaN(numero) && numero > 0;

//conprueba si un indice es valido para un array
const esIndiceValido = (indice = 0, longitud = 0) => indice >= 0 && indice < longitud;

//pido un numero positivo con un mensaje de prompt y en caso de error muestro un mensaje
function obtenerNumeroPositivo(mensajePrompt = "ingrese un numero", mensajeError = "error") {
    const numero = Number(prompt(mensajePrompt));
    if (!esNumeroMayorACero(numero)) {
        console.log(mensajeError);
        return null;
    }
    return numero;
}

//calcula el area del circulo y la devuelve
function calcularAreaCirculo() {
    const radio = obtenerNumeroPositivo(
        "ingrese el radio del circulo",
        "el radio del circulo ingresado debe ser un numero mayor a 0",
    );
    return radio ? obtenerAreaCirculo(radio) : null;
}

//calcula el area del cuadrado y la devuelve
function calcularAreaCuadrado() {
    const lado = obtenerNumeroPositivo(
        "ingrese el lado del cuadrado",
        "el lado del cuadrado ingresado debe ser un numero mayor a 0",
    );
    return lado ? obtenerAreaRectangulo(lado, lado) : null;
}

//calcula el area del rectangulo y la devuelve
function calcularAreaRectangulo() {
    const base = obtenerNumeroPositivo(
        "ingrese la base del rectangulo",
        "la base del rectangulo ingresada debe ser un numero mayor a 0",
    );
    if (base == null) {
        return null;
    }

    const altura = obtenerNumeroPositivo(
        "ingrese la altura del rectangulo",
        "la altura del rectangulo ingresada debe ser un numero mayor a 0",
    );
    return altura ? obtenerAreaRectangulo(base, altura) : null;
}

//calcula un area personalizada y la devuelve
function calcularAreaPersonalizada() {
    return obtenerNumeroPositivo(
        "ingrese el valor del area personalizada (en " + unidadPorDefecto + ")",
        "el valor del area personalizada ingresado debe ser un numero mayor a 0",
    );
}

//1 muestra lista de las areas por indice
function mostrarListaAreas(areas) {
    let indice = 0;
    console.log("lista de areas guardadas:");
    for (const figura of areas) {
        figura.mostrarDatos("indice: " + indice + " |");
        indice++;
    }
}

//2 busca un area segun el valor y devuelve el indice si existe
function buscarAreaPorID(areas) {
    const idBuscado = parseInt(prompt("ingrese el ID del area que desea buscar"));
    let indice = -1;

    for (const figura of areas) {
        if (figura.id == idBuscado) {
            indice = areas.indexOf(figura);
            figura.mostrarDatos("figura encontrada:");
            return indice;
        }
    }

    console.log("area no encontrada con ese ID");
    return indice;
}

//3 reemplaza un area por otra
function reemplazarAreaPorIndice(areas) {
    const indiceReemplazar = parseInt(prompt("ingrese el indice del area que desea reemplazar"));
    if (!esIndiceValido(indiceReemplazar, areas.length)) {
        console.log("indice invalido");
        return;
    }

    const nuevaArea = obtenerNumeroPositivo(
        "ingrese el nuevo valor del area (en " + unidadPorDefecto + ")",
        "el nuevo valor del area debe ser un numero mayor a 0",
    );
    if (nuevaArea == null) {
        return;
    }

    areas[indiceReemplazar].area = nuevaArea;
    areas[indiceReemplazar].color = otroColor;
    areas[indiceReemplazar].unidad = unidadPorDefecto;
    areas[indiceReemplazar].mostrarDatos("area reemplazada:");
}

//4 borra la ultima area agregada
function borrarUltimaArea(areas) {
    if (areas.length == 0) {
        console.log("la lista de areas esta vacia");
        return;
    }
    const ultimaArea = areas.pop();
    ultimaArea.mostrarDatos("area borrada:");
}

//5 borra la primera area agregada
function borrarPrimeraArea(areas) {
    if (areas.length == 0) {
        console.log("la lista de areas esta vacia");
        return;
    }
    const primeraArea = areas.shift();
    primeraArea.mostrarDatos("area borrada:");
}

//6 borra un area segun el indice
function borrarAreaPorIndice(areas) {
    const indiceBorrar = parseInt(prompt("ingrese el indice del area que desea borrar"));
    if (!esIndiceValido(indiceBorrar, areas.length)) {
        console.log("indice invalido");
        return;
    }
    const areaBorrada = areas.splice(indiceBorrar, 1)[0];
    areaBorrada.mostrarDatos("area borrada:");
}

//7 convierte un area a metros
function convertirAreaAMetros(areas) {
    const indice = parseInt(prompt("ingrese el indice del area que desea convertir a m^2"));
    if (!esIndiceValido(indice, areas.length)) {
        console.log("indice invalido");
        return;
    }

    if (areas[indice].unidad == unidadM) {
        console.log("el area ya esta en m^2");
        return;
    }

    areas[indice].convertirAMetrosCuadrados();
    areas[indice].mostrarDatos("area convertida a m^2:");
}

//8 convierte un area a centimetros
function convertirAreaACentimetros(areas) {
    const indice = parseInt(prompt("ingrese el indice del area que desea convertir a cm^2"));
    if (!esIndiceValido(indice, areas.length)) {
        console.log("indice invalido");
        return;
    }

    if (areas[indice].unidad == unidadCM) {
        console.log("el area ya esta en cm^2");
        return;
    }

    areas[indice].convertirACentimetrosCuadrados();
    areas[indice].mostrarDatos("area convertida a cm^2:");
}

//gestiona la lista de areas con un menu de opciones
function administrarListaAreas(areas) {
    if (areas.length == 0) {
        console.log("la lista de areas esta vacia");
        return;
    }
    const opcion = parseInt(prompt(menuAdministrarListaAreas));
    switch (opcion) {
        case 1: //ver todas las areas
            mostrarListaAreas(areas);
            break;
        case 2: //busca un area especifica y avisa si existe o no
            buscarAreaPorID(areas);
            break;
        case 3: //reemplazar un area especifica
            reemplazarAreaPorIndice(areas);
            break;
        case 4: //borrar la primera area agregada
            borrarPrimeraArea(areas);
            break;
        case 5: //borrar la ultima area agregada
            borrarUltimaArea(areas);
            break;
        case 6: //borrar un area especifica
            borrarAreaPorIndice(areas);
            break;
        case 7: //convertir area a metros
            convertirAreaAMetros(areas);
            break;
        case 8: //convertir area a centimetros
            convertirAreaACentimetros(areas);
            break;
        default:
            console.log("volviendo al menu principal");
    }
}

function agregarArea(funcion, areas, nombreFigura) {
    const area = funcion();
    if (area != null) {
        const colorAsignado = obtenerColor(nombreFigura);
        const nuevaFigura = new Figura2D(nombreFigura, area, unidadPorDefecto, colorAsignado);

        areas.push(nuevaFigura);
        nuevaFigura.mostrarDatos("area guardada correctamente:");
    }
}

//carga areas de ejemplo
function cargarAreasEjemplo(areas) {
    const figura1 = new Figura2D(circulo, 12, unidadPorDefecto, obtenerColor(circulo));
    const figura2 = new Figura2D(cuadrado, 34, unidadPorDefecto, obtenerColor(cuadrado));
    const figura3 = new Figura2D(rectangulo, 56, unidadPorDefecto, obtenerColor(rectangulo));
    const figura4 = new Figura2D(circulo, 78, unidadPorDefecto, obtenerColor(circulo));

    areas.push(figura1, figura2, figura3, figura4);
    console.log("areas de ejemplo cargadas correctamente");
}
//inicia el simulador de areas
function iniciarSimuladorAreas() {
    const listaAreas = [];
    //pregunto si quiero utilizar la calculadora
    while (confirm("deseas utilizar el gestor de areas?")) {
        let opcion = parseInt(prompt(menuPrincipal));
        switch (opcion) {
            case 1: //calcula el area del circulo y la agrega a la lista
                agregarArea(calcularAreaCirculo, listaAreas, circulo);
                break;
            case 2: //calcula el area del cuadrado y la agrega a la lista
                agregarArea(calcularAreaCuadrado, listaAreas, cuadrado);
                break;
            case 3: //calcula el area del rectangulo y la agrega a la lista
                agregarArea(calcularAreaRectangulo, listaAreas, rectangulo);
                break;
            case 4: //calcula un area personalizada y la agrega a la lista
                agregarArea(calcularAreaPersonalizada, listaAreas, personalizado);
                break;
            case 5: //cargar areas de ejemplo
                cargarAreasEjemplo(listaAreas);
                break;
            case 6: //administrar la lista de areas guardadas
                administrarListaAreas(listaAreas);
                break;
            default: //muestra un mensaje de error
                console.log("opcion invalida");
        }
    }
}

iniciarSimuladorAreas();

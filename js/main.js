const pi = 3.14;
const unidadCM = "cm^2";
const unidadM = "m^2";

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
    mostrarDatos(mensaje) {
        console.log(mensaje, "ID:", this.id, this.nombre, this.color, "area:", this.area, this.unidad);
    }
}

function convertirAreaUnidad(areas, unidad) {
    let indice = parseInt(prompt("ingrese el indice del area que desea convertir a " + unidad));
    if (indice < 0 || indice >= areas.length) {
        console.log("indice invalido");
        return;
    }
    if (areas[indice].unidad == unidad) {
        console.log("el area ya esta en", unidad);
        return;
    }
    if (unidad == unidadM) {
        areas[indice].convertirAMetrosCuadrados();
    } else {
        areas[indice].convertirACentimetrosCuadrados();
    }
    areas[indice].mostrarDatos("area convertida a " + unidad + ":");
} //8 y 7 convierte un area a metros o centimetros segun la unidad

function borrarAreaPorIndice(areas) {
    let indiceBorrar = parseInt(prompt("ingrese el indice del area que desea borrar"));
    if (indiceBorrar < 0 || indiceBorrar >= areas.length) {
        console.log("indice invalido");
        return;
    }
    let areaBorrada = areas.splice(indiceBorrar, 1)[0];
    areaBorrada.mostrarDatos("area borrada:");
} //6 borra un area segun el indice

function borrarUltimaArea(areas) {
    if (areas.length == 0) {
        console.log("la lista de areas esta vacia");
        return;
    }
    const ultimaArea = areas.pop();
    ultimaArea.mostrarDatos("area borrada:");
} //5 borra la ultima area agregada

function borrarPrimeraArea(areas) {
    if (areas.length == 0) {
        console.log("la lista de areas esta vacia");
        return;
    }
    const primeraArea = areas.shift();
    primeraArea.mostrarDatos("area borrada:");
} //4 borra la primera area agregada

const esNumeroMayorACero = (numero = 0) => !isNaN(numero) && numero > 0; //comprueba si el valor ingresado es un numero mayor a 0

function reemplazarAreaPorIndice(areas) {
    let indiceReemplazar = parseInt(prompt("ingrese el indice del area que desea reemplazar"));
    if (indiceReemplazar < 0 || indiceReemplazar >= areas.length) {
        console.log("indice invalido");
        return;
    }
    let nuevaArea = Number(prompt("ingrese el nuevo valor del area (en " + unidadCM + ")"));
    if (!esNumeroMayorACero(nuevaArea)) {
        console.log("el nuevo valor del area debe ser un numero mayor a 0");
        return;
    }
    areas[indiceReemplazar].area = nuevaArea;
    areas[indiceReemplazar].color = "blanco";
    areas[indiceReemplazar].unidad = unidadCM;
    areas[indiceReemplazar].mostrarDatos("area reemplazada:");
} //3 reemplaza un area por otra

function buscarAreaPorID(areas) {
    let idBuscado = parseInt(prompt("ingrese el ID del area que desea buscar"));
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
} //2 busca un area segun el valor y devuelve el indice si existe

function mostrarListaAreas(areas) {
    let indice = 0;
    console.log("lista de areas guardadas:");
    for (const figura of areas) {
        figura.mostrarDatos("indice: " + indice + " |");
        indice++;
    }
} //1 muestra lista de las areas por indice

function administrarListaAreas(areas) {
    if (areas.length == 0) {
        console.log("la lista de areas esta vacia");
        return;
    }
    const opcion = parseInt(prompt("gestion de areas guardadas:\n(1) ver todas las areas\n(2) buscar un area especifica\n(3) reemplazar un area especifica\n(4) borrar la primera area agregada\n(5) borrar la ultima area agregada\n(6) borrar un area especifica\n(7) convertir area de cm^2 a m^2\n(8) convertir area de m^2 a cm^2\n",));
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
            convertirAreaUnidad(areas, unidadM);
            break;
        case 8: //convertir area a centimetros
            convertirAreaUnidad(areas, unidadCM);
            break;
        default:
            console.log("volviendo al menu principal");
    }
} //gestiona la lista de areas con un menu de opciones

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

function ingresarAreaPersonalizada() {
    let area = Number(prompt("ingrese el valor del area personalizada (en " + unidadCM + ")"));
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

function cargarAreasEjemplo(areas) {
    const figura1 = new Figura2D("circulo", 12, unidadCM, obtenerColor("circulo"));
    const figura2 = new Figura2D("cuadrado", 34, unidadCM, obtenerColor("cuadrado"));
    const figura3 = new Figura2D("rectangulo", 56, unidadCM, obtenerColor("rectangulo"));
    const figura4 = new Figura2D("circulo", 78, unidadCM, obtenerColor("circulo"));
    areas.push(figura1, figura2, figura3, figura4);
    console.log("areas de ejemplo cargadas correctamente");
} //carga areas de ejemplo

function agregarArea(funcion, areas, nombreFigura) {
    const area = funcion();
    if (area != null) {
        let colorAsignado = obtenerColor(nombreFigura);
        const nuevaFigura = new Figura2D(nombreFigura, area, unidadCM, colorAsignado);
        areas.push(nuevaFigura);
        nuevaFigura.mostrarDatos("area guardada correctamente:");
    }
} //agrega un area a la lista de areas

function iniciarSimuladorAreas() {
    const listaAreas = [];
    while (confirm("deseas utilizar el gestor de areas?")) {
        let opcion = parseInt(prompt("gestor de superfices: ingrese el numero que quiera calcular:\n(1) agregar area de un circulo\n(2) agregar area de un cuadrado\n(3) agregar area de un rectangulo\n(4) agregar area personalizada\n(5) cargar areas de ejemplo\n(6) administrar lista de areas guardadas\n",)); //pregunto si quiero utilizar la calculadora
        switch (opcion) {
            case 1: //calcula el area del circulo y la agrega a la lista
                agregarArea(calcularAreaCirculo, listaAreas, "circulo");
                break;
            case 2: //calcula el area del cuadrado y la agrega a la lista
                agregarArea(calcularAreaCuadrado, listaAreas, "cuadrado");
                break;
            case 3: //calcula el area del rectangulo y la agrega a la lista
                agregarArea(calcularAreaRectangulo, listaAreas, "rectangulo");
                break;
            case 4: //calcula un area personalizada y la agrega a la lista
                agregarArea(ingresarAreaPersonalizada, listaAreas, "personalizado");
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
} //inicia el simulador de areas

iniciarSimuladorAreas();
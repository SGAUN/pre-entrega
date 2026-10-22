const pi = 3.14;
const unidad = "cm^2";
const menuAdministrarListaAreas =
    "gestion de areas guardadas:\n" +
    "(1) ver todas las areas y calcular el total\n" +
    "(2) borrar la ultima area agregada\n" +
    "(3) borrar la primera area agregada\n" +
    "(4) reemplazar un area especifica\n" +
    "(5) buscar un area especifica\n" +
    "(6) borrar un area especifica\n" +
    "\ncualquier otro numero para volver";
const menuPrincipal =
    "gestor de superfices: ingrese el numero que quiera calcular:\n" +
    "(1) agregar area de un circulo\n" +
    "(2) agregar area de un cuadrado\n" +
    "(3) agregar area de un rectangulo\n" +
    "(4) agregar area de un triangulo rectangulo\n" +
    "(5) administrar lista de areas guardadas\n";

//con radio calcula el area del circulo
function obtenerAreaCirculo(radio = 0) {
    return pi * radio ** 2;
}

//con base y altura calcula el area del rectangulo
const obtenerAreaRectangulo = (base, altura) => base * altura;

//comprueba si el valor ingresado es un numero mayor a 0
const esNumeroMayorACero = (numero) => !isNaN(numero) && numero > 0;

//pido un numero positivo con un mensaje de prompt y en caso de error muestro un mensaje
function obtenerNumeroPositivo(mensajePrompt, mensajeError) {
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
    if (radio === null) {
        return null;
    }

    return obtenerAreaCirculo(radio);
}

//calcula el area del cuadrado y la devuelve
function calcularAreaCuadrado() {
    const lado = obtenerNumeroPositivo(
        "ingrese el lado del cuadrado",
        "el lado del cuadrado ingresado debe ser un numero mayor a 0",
    );
    if (lado === null) {
        return null;
    }

    return obtenerAreaRectangulo(lado, lado);
}

//calcula el area del rectangulo y la devuelve
function calcularAreaRectangulo() {
    const base = obtenerNumeroPositivo(
        "ingrese la base del rectangulo",
        "la base del rectangulo ingresada debe ser un numero mayor a 0",
    );
    const altura = obtenerNumeroPositivo(
        "ingrese la altura del rectangulo",
        "la altura del rectangulo ingresada debe ser un numero mayor a 0",
    );
    if (base === null || altura === null) {
        return null;
    }
    return obtenerAreaRectangulo(base, altura);
}

//calcula el area del triangulo rectangulo y la devuelve
function calcularAreaTrianguloRectangulo() {
    const base = obtenerNumeroPositivo(
        "ingrese la base del triangulo",
        "la base del triangulo ingresada debe ser un numero mayor a 0",
    );
    const altura = obtenerNumeroPositivo(
        "ingrese la altura del triangulo",
        "la altura del triangulo ingresada debe ser un numero mayor a 0",
    );
    if (base === null || altura === null) {
        return null;
    }
    return obtenerAreaRectangulo(base, altura) / 2;
}

//muestra lista de las areas por indice y calcula el total
function mostrarListaAreas(areas) {
    let indice = 0;
    let total = 0;
    console.log("lista de areas guardadas:");
    for (const area of areas) {
        console.log("indice " + indice + ": area = " + area + " " + unidad);
        total += area;
        indice++;
    }
    console.log("total: " + total + " " + unidad);
}

//reemplaza un area por otra
function reemplazarArea(areas) {
    const indiceReemplazar = parseInt(prompt("ingrese el indice del area que desea reemplazar: "));
    if (!esNumeroMayorACero(indiceReemplazar + 1) || indiceReemplazar >= areas.length) {
        console.log("indice invalido");
        return;
    }

    const nuevaArea = Number(prompt("ingrese el nuevo valor del area: "));
    if (!esNumeroMayorACero(nuevaArea)) {
        console.log("el nuevo valor del area debe ser un numero mayor a 0");
        return;
    }
    areas.splice(indiceReemplazar, 1, nuevaArea);
    console.log("area reemplazada: " + nuevaArea + " " + unidad);
}

//borra un area segun el indice
function borrarArea(areas) {
    const indiceBorrar = parseInt(prompt("ingrese el indice del area que desea borrar: "));
    if (!esNumeroMayorACero(indiceBorrar + 1) || indiceBorrar >= areas.length) {
        console.log("indice invalido");
        return;
    }
    const areaBorrada = areas.splice(indiceBorrar, 1);
    console.log("area borrada: " + areaBorrada + " " + unidad);
}

//busca un area segun el valor y devuelve el indice si existe
function buscarArea(areas) {
    const areaBuscada = Number(prompt("ingrese el valor del area que desea buscar: "));
    const indiceEncontrado = areas.indexOf(areaBuscada);
    if (indiceEncontrado != -1) {
        console.log("el area encontrada ya existe y tiene el indice: " + indiceEncontrado);
    } else {
        console.log("area no encontrada");
    }
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
        case 2: //borrar la ultima area agregada
            const ultimaAreaBorrada = areas.pop();
            console.log("area borrada: " + ultimaAreaBorrada + " " + unidad);
            break;
        case 3: //borrar la primera area agregada
            const primeraAreaBorrada = areas.shift();
            console.log("area borrada: " + primeraAreaBorrada + " " + unidad);
            break;
        case 4: //reemplazar un area especifica
            reemplazarArea(areas);
            break;
        case 5: //busca un area especifica y avisa si existe o no
            buscarArea(areas);
            break;
        case 6: //borrar un area especifica
            borrarArea(areas);
            break;
        default:
            console.log("volviendo al menu principal");
    }
}

function agregarArea(funcion, areas, nombreFigura) {
    const area = funcion();
    if (area != null) {
        areas.push(area);
        console.log("el area del " + nombreFigura + " (" + area + " " + unidad + ") se guardo en la lista");
    }
}

//inicia el simulador de areas
function iniciarSimuladorAreas() {
    const listaAreas = [];
    //pregunto si quiero utilizar la calculadora
    while (confirm("deseas utilizar el gestor de areas?")) {
        let opcion = parseInt(prompt(menuPrincipal));
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
            case 4: //calcula el area del triangulo rectangulo y la agrega a la lista
                agregarArea(calcularAreaTrianguloRectangulo, listaAreas, "triangulo rectangulo");
                break;
            case 5: //administrar la lista de areas guardadas
                administrarListaAreas(listaAreas);
                break;
            default: //muestra un mensaje de error
                console.log("opcion invalida");
        }
    }
}

iniciarSimuladorAreas(); //inicia el simulador de areas
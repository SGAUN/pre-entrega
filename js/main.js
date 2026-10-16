const pi = 3.14;
const unidad = "cm^2";

//con radio calcula el area del circulo
function obtenerAreaCirculo(radio = 0) {
    return pi * radio ** 2;
}

//con base y altura calcula el area del rectangulo
const obtenerAreaRectangulo = (base = 0, altura = 0) => base * altura;

//comprueba si el valor ingresado es un numero mayor a 0
const esNumeroMayorACero = (numero) => !isNaN(numero) && numero > 0;

//calcula el area del circulo y la devuelve
function calcularAreaCirculo() {
    const radio = Number(prompt("ingrese el radio del circulo"));
    if (!esNumeroMayorACero(radio)) {
        console.log("el radio del circulo ingresado debe ser un numero mayor a 0");
        return null;
    }
    const areaCirculo = obtenerAreaCirculo(radio);
    console.log("el area del circulo es: " + areaCirculo + " " + unidad);
    return areaCirculo;
}

//calcula el area del cuadrado y la devuelve
function calcularAreaCuadrado() {
    const lado = Number(prompt("ingrese el lado del cuadrado"));
    if (!esNumeroMayorACero(lado)) {
        console.log("el lado del cuadrado ingresado debe ser un numero mayor a 0");
        return null;
    }
    const areaCuadrado = obtenerAreaRectangulo(lado, lado);
    console.log("el area del cuadrado es: " + areaCuadrado + " " + unidad);
    return areaCuadrado;
}

//calcula el area del rectangulo y la devuelve
function calcularAreaRectangulo() {
    const base = Number(prompt("ingrese la base del rectangulo"));
    const altura = Number(prompt("ingrese la altura del rectangulo"));
    if (!esNumeroMayorACero(base) || !esNumeroMayorACero(altura)) {
        console.log("la base y la altura del rectangulo deben ser numeros mayores a 0");
        return null;
    }
    const areaRectangulo = obtenerAreaRectangulo(base, altura);
    console.log("el area del rectangulo es: " + areaRectangulo + " " + unidad);
    return areaRectangulo;
}

//calcula el area del triangulo rectangulo y la devuelve
function calcularAreaTrianguloRectangulo() {
    const base = Number(prompt("ingrese la base del triangulo"));
    const altura = Number(prompt("ingrese la altura del triangulo"));
    if (!esNumeroMayorACero(base) || !esNumeroMayorACero(altura)) {
        console.log("la base y la altura del triangulo rectangulo deben ser numeros mayores a 0");
        return null;
    }
    const areaTriangulo = obtenerAreaRectangulo(base, altura) / 2;
    console.log("el area del triangulo es: " + areaTriangulo + " " + unidad);
    return areaTriangulo;
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

    const opcion = parseInt(
        prompt(
            "gestion de areas guardadas:\n" +
                "(1) ver todas las areas y calcular el total\n" +
                "(2) borrar la ultima area agregada\n" +
                "(3) borrar la primera area agregada\n" +
                "(4) reemplazar un area especifica\n" +
                "(5) buscar un area especifica\n" +
                "\ncualquier otro numero para volver",
        ),
    );

    switch (opcion) {
        case 1:
            //ver todas las areas
            mostrarListaAreas(areas);
            break;
        case 2:
            //borrar la ultima area agregada
            const ultimaAreaBorrada = areas.pop();
            console.log("area borrada: " + ultimaAreaBorrada + " " + unidad);
            break;
        case 3:
            //borrar la primera area agregada
            const primeraAreaBorrada = areas.shift();
            console.log("area borrada: " + primeraAreaBorrada + " " + unidad);
            break;
        case 4:
            //reemplazar un area especifica
            reemplazarArea(areas);
            break;
        case 5:
            //busca un area especifica y avisa si existe o no
            buscarArea(areas);
            break;
        default:
            console.log("volviendo al menu principal");
    }
}

//inicia el simulador de areas con un menu principal
function iniciarSimuladorAreas() {
    const listaAreas = [];

    //pregunto si quiero utilizar la calculadora
    while (confirm("deseas utilizar el gestor de areas?")) {
        let opcion = parseInt(
            prompt(
                "gestor de superfices: ingrese el numero que quiera calcular:\n" +
                    "(1) agregar area de un circulo\n" +
                    "(2) agregar area de un cuadrado\n" +
                    "(3) agregar area de un rectangulo\n" +
                    "(4) agregar area de un triangulo rectangulo\n" +
                    "(5) administrar lista de areas guardadas\n\n" +
                    "cualquier otro numero para salir",
            ),
        );

        switch (opcion) {
            case 1:
                //calcula el area del circulo y la agrega a la lista
                const areaCirculo = calcularAreaCirculo();
                if (areaCirculo != null) {
                    listaAreas.push(areaCirculo);
                }
                break;
            case 2:
                //calcula el area del cuadrado y la agrega a la lista
                const areaCuadrado = calcularAreaCuadrado();
                if (areaCuadrado != null) {
                    listaAreas.push(areaCuadrado);
                }
                break;
            case 3:
                //calcula el area del rectangulo y la agrega a la lista
                const areaRectangulo = calcularAreaRectangulo();
                if (areaRectangulo != null) {
                    listaAreas.push(areaRectangulo);
                }
                break;
            case 4:
                //calcula el area del triangulo rectangulo y la agrega a la lista
                const areaTriangulo = calcularAreaTrianguloRectangulo();
                if (areaTriangulo != null) {
                    listaAreas.push(areaTriangulo);
                }
                break;
            case 5:
                //administrar la lista de areas guardadas
                administrarListaAreas(listaAreas);
                break;
            default:
                //muestra un mensaje de error
                console.log("opcion invalida");
        }
    }
}

//inicia el simulador de areas
iniciarSimuladorAreas();

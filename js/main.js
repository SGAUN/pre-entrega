//pide un numero para elegir la opcion en la calculadora
function pedirOpcionCalculadora() {
    const numero = Number(
        prompt(
            "calculadora de areas: ingrese el area que quiera calcular:\n(1) area de un circulo \n(2) area de un cuadrado \n(3) area de un rectangulo \n(4) area de un triangulo rectangulo \n\ncualquier otro numero para salir",
        ),
    );
    return numero;
}

//con radio calcula el area del circulo
function obtenerAreaCirculo(radio = 0) {
    const pi = 3.14;
    return pi * radio ** 2;
}

//con base y altura calcula el area del rectangulo
const obtenerAreaRectangulo = (base = 0, altura = 0) => base * altura;

//comprueba si el valor ingresado es un numero mayor a 0
const esNumeroMayorACero = (numero) => !isNaN(numero) && numero > 0;

//area circulo
function calcularAreaCirculo() {
    const radio = Number(prompt("ingrese el radio del circulo"));
    if (!esNumeroMayorACero(radio)) {
        console.log("el radio del circulo ingresado debe ser un numero mayor a 0");
        return;
    }
    const areaCirculo = obtenerAreaCirculo(radio);
    console.log("el area del circulo es: " + areaCirculo);
}

//area cuadrado
function calcularAreaCuadrado() {
    const lado = Number(prompt("ingrese el lado del cuadrado"));
    if (!esNumeroMayorACero(lado)) {
        console.log("el lado del cuadrado ingresado debe ser un numero mayor a 0");
        return;
    }
    const areaCuadrado = obtenerAreaRectangulo(lado, lado);
    console.log("el area del cuadrado es: " + areaCuadrado);
}

//area rectangulo
function calcularAreaRectangulo() {
    const base = Number(prompt("ingrese la base del rectangulo"));
    const altura = Number(prompt("ingrese la altura del rectangulo"));
    if (!esNumeroMayorACero(base) || !esNumeroMayorACero(altura)) {
        console.log("la base y la altura del rectangulo deben ser numeros mayores a 0");
        return;
    }
    const areaRectangulo = obtenerAreaRectangulo(base, altura);
    console.log("el area del rectangulo es: " + areaRectangulo);
}

//area triangulo rectangulo
function calcularAreaTrianguloRectangulo() {
    const base = Number(prompt("ingrese la base del triangulo"));
    const altura = Number(prompt("ingrese la altura del triangulo"));
    if (!esNumeroMayorACero(base) || !esNumeroMayorACero(altura)) {
        console.log("la base y la altura del triangulo rectangulo deben ser numeros mayores a 0");
        return;
    }
    const areaTriangulo = obtenerAreaRectangulo(base, altura) / 2;
    console.log("el area del triangulo es: " + areaTriangulo);
}

//calculadora de areas
function iniciarCalculadora() {
    //pregunto si quiero utilizar la calculadora
    while (confirm("deseas utilizar la calculadora?")) {
        let opcion = pedirOpcionCalculadora();
        switch (opcion) {
            case 1:
                calcularAreaCirculo();
                break;
            case 2:
                calcularAreaCuadrado();
                break;
            case 3:
                calcularAreaRectangulo();
                break;
            case 4:
                calcularAreaTrianguloRectangulo();
                break;
            default:
                //muestra un mensaje de error
                console.log("opcion invalida");
        }
    }
}

//inicio la calculadora
iniciarCalculadora();

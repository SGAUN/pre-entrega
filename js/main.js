//pide un numero para elegir la opcion en la calculadora
function pedirOpcionCalculadora() {
    let numero = Number(
        prompt(
            "calculadora de areas: ingrese el area que quiera calcular:\n(1) area de un circulo \n(2) area de un cuadrado \n(3) area de un rectangulo \n(4) area de un triangulo rectangulo \n\ncualquier otro numero para salir",
        ),
    );
    return numero;
}

//con radio calcula el area del circulo
function calcularAreaCirculo(radio = 0) {
    const pi = 3.14;
    return pi * radio ** 2;
}

//con base y altura calcula el area del rectangulo
const calcularAreaRectangulo = (base = 0, altura = 0) => base * altura;

//calculadora de areas
function iniciarCalculadora() {
    //pregunto si quiero utilizar la calculadora
    while (confirm("deseas utilizar la calculadora?")) {
        let opcion = pedirOpcionCalculadora();
        //switch para las opciones
        switch (opcion) {
            case 1:
                //area circulo
                let radio = Number(prompt("ingrese el radio del circulo"));
                let areaCirculo = calcularAreaCirculo(radio);
                console.log("el area del circulo es " + areaCirculo);
                break;
            case 2:
                //area cuadrado
                let ladoCuadrado = Number(prompt("ingrese la base del cuadrado"));
                let areaCuadrado = calcularAreaRectangulo(ladoCuadrado, ladoCuadrado);
                console.log("el area del cuadrado es " + areaCuadrado);
                break;
            case 3:
                //area rectangulo
                let baseRectangulo = Number(prompt("ingrese la base del rectangulo"));
                let alturaRectangulo = Number(prompt("ingrese la altura del rectangulo"));
                let areaRectangulo = calcularAreaRectangulo(baseRectangulo, alturaRectangulo);
                console.log("el area del rectangulo es " + areaRectangulo);
                break;
            case 4:
                //area triangulo rectangulo
                let baseTriangulo = Number(prompt("ingrese la base del triangulo"));
                let alturaTriangulo = Number(prompt("ingrese la altura del triangulo"));
                let areaTriangulo = calcularAreaRectangulo(baseTriangulo, alturaTriangulo) / 2;
                console.log("el area del triangulo es " + areaTriangulo);
                break;
            default:
                //muestra un mensaje de error
                console.log("opcion invalida");
        }
    }
}

//inicio la calculadora
iniciarCalculadora();

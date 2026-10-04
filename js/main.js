//Calculadora de areas
const Pi = 3.14;
let continuar = true;

do {
    //menu de opciones
    let opcion = parseInt(
        prompt(
            "calculadora de areas: ingrese el area que quiera calcular: 1 area de un circulo, 2 area de un cuadrado, 3 area de un rectangulo , cualquier otro numero para salir",
        ),
    );

    //switch para las opciones
    switch (opcion) {
        case 1:
            //area circulo
            let radio = parseInt(prompt("ingrese el radio del circulo"));
            let areaCirculo = Pi * radio ** 2;
            console.log("el area del circulo es " + areaCirculo);
            break;
        case 2:
            //area cuadrado
            let ladoCuadrado = parseInt(prompt("ingrese la base del cuadrado"));
            let areaCuadrado = ladoCuadrado ** 2;
            console.log("el area del cuadrado es " + areaCuadrado);
            break;
        case 3:
            //area rectangulo
            let baseRectangulo = parseInt(prompt("ingrese la base del rectangulo"));
            let alturaRectangulo = parseInt(prompt("ingrese la altura del rectangulo"));
            let areaRectangulo = baseRectangulo * alturaRectangulo;
            console.log("el area del rectangulo es " + areaRectangulo);
            break;
        default:
            //si ingresa cualquier otra opcion se sale
            console.log("Gracias!!");
            continuar = false;
            break;
    }

    //pregunto si quiero continuar
    if (continuar) {
        let respuesta = prompt("desea continuar con la calculadora (si/no)");
        if (respuesta != "si") {
            continuar = false;
            console.log("Gracias!!");
        }
    }
} while (continuar);

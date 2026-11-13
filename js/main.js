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
}

const esNumeroMayorACero = (numero = 0) => !isNaN(numero) && numero > 0; //comprueba si el valor ingresado es un numero mayor a 0

function obtenerColor(nombreFigura) {
    const colores = {
        circulo: "rojo",
        cuadrado: "verde",
        rectangulo: "azul",
    }; //objeto Colores
    return colores[nombreFigura] || "blanco"; //notacion corchete: objetoColores[propiedad]
} //retorna un color segun el nombre de una figura, codigo colores: rojo verde y azul se usa para areas calculadas por el simulador y sin modificar, elcolor blanco para otro caso

let listaFiguras = JSON.parse(localStorage.getItem("lista-figuras")) || []; //si hay algo en el storage lo asigna a la lista
listaFiguras.length > 0 && (Figura2D.id = listaFiguras[listaFiguras.length - 1].id); //conservo el ultimo id de la lista, los ID son unicos solo para los guardados
//NO SE SI ESTA BIEN RESOLVERLO ASI (pero funciona)

const guardarLista = () => localStorage.setItem("lista-figuras", JSON.stringify(listaFiguras));

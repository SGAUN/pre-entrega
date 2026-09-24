//Calculadora para un circulo
let radio = parseFloat(prompt("Calculadora de radio de un circulo: Ingrese el radio:"));

const Pi = 3.14;
let area = Pi * radio ** 2;

alert("El area del circulo es: " + area);

//Calculo de edad
let nombre = prompt("Ingrese su nombre: ");
const fechaDeNacimiento = parseInt(prompt("Ingrese su año de nacimiento: "));
let edad = 2026 - fechaDeNacimiento;

alert("Hola " + nombre + " su edad es: " + edad + " años");
console.log("Hola " + nombre + " su edad es: " + edad + " años");
interface Empleado {
  nombre: string;
  sueldoBase: number;
  montoVentas: number;
  tiempo: number;
}

let empleado1: Empleado = {
  nombre: "Eduardo",
  sueldoBase: 150,
  montoVentas: 1000,
  tiempo: 5,
};

let empleado2: Empleado = {
  nombre: "Carlos",
  sueldoBase: 200,
  montoVentas: 1500,
  tiempo: 12,
};

let empleado3: Empleado = {
  nombre: "Ana",
  sueldoBase: 180,
  montoVentas: 800,
  tiempo: 8,
};

function calcularSueldo(Empleado: Empleado): number {
  let paga = Empleado.sueldoBase + (Empleado.montoVentas * 0.30);
  if (Empleado.tiempo > 10) {
    paga = paga + 50;
  }
  return paga;
}

const sueldoEmpleado1 = calcularSueldo(empleado1);
console.log(
  `El sueldo de ${empleado1.nombre} es: ${sueldoEmpleado1}. Datos: sueldo base ${empleado1.sueldoBase}, monto de ventas ${empleado1.montoVentas}, tiempo en la empresa ${empleado1.tiempo} años.`
);

const sueldoEmpleado2 = calcularSueldo(empleado2);
console.log(
  `El sueldo de ${empleado2.nombre} es: ${sueldoEmpleado2}. Datos: sueldo base ${empleado2.sueldoBase}, monto de ventas ${empleado2.montoVentas}, tiempo en la empresa ${empleado2.tiempo} años.`
);

const sueldoEmpleado3 = calcularSueldo(empleado3);
console.log(
  `El sueldo de ${empleado3.nombre} es: ${sueldoEmpleado3}. Datos: sueldo base ${empleado3.sueldoBase}, monto de ventas ${empleado3.montoVentas}, tiempo en la empresa ${empleado3.tiempo} años.`
);

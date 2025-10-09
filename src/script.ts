type RenderContext2d = CanvasRenderingContext2D;

function generarColorAleatorioSimple(): string {
  const r = Math.floor(Math.random() * 56) + 200;
  const g = Math.floor(Math.random() * 56) + 200;
  const b = Math.floor(Math.random() * 56) + 200;
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

class Elemento {
  private _color: string;
  private _contexto: RenderContext2d;

  constructor(contexto: RenderContext2d, color?: string) {
    this._contexto = contexto;
    this._color = color || generarColorAleatorioSimple();
  }

  get color(): string {
    return this._color;
  }
  set color(nuevoColor: string) {
    this._color = nuevoColor;
  }

  get contexto(): RenderContext2d {
    return this._contexto;
  }
  set contexto(nuevoContexto: RenderContext2d) {
    this._contexto = nuevoContexto;
  }
}

class Estrella extends Elemento {
  protected _x: number;
  protected _y: number;

  constructor(contexto: RenderContext2d, color?: string) {
    super(contexto, color);
    this._x = Math.random() * contexto.canvas.width;
    this._y = Math.random() * contexto.canvas.height;
  }

  get x(): number {
    return this._x;
  }
  set x(nuevoX: number) {
    this._x = nuevoX;
  }

  get y(): number {
    return this._y;
  }
  set y(nuevoY: number) {
    this._y = nuevoY;
  }
}

class EstrellaRedonda extends Estrella {
  constructor(contexto: RenderContext2d, color?: string) {
    super(contexto, color);
  }

  pintar(): void {
    const ctx = this.contexto;
    const outerRadius = 10;
    const innerPointRadius = 1;
    const circleRadius = 5;

    ctx.fillStyle = this.color;
    ctx.beginPath();

    // Dibuja el Círculo Central.
    ctx.arc(this.x, this.y, circleRadius, 0, Math.PI * 2, false);

    // Punta Superior
    ctx.moveTo(this.x - innerPointRadius, this.y - circleRadius);
    ctx.lineTo(this.x, this.y - outerRadius);
    ctx.lineTo(this.x + innerPointRadius, this.y - circleRadius);

    // Punta Derecha
    ctx.moveTo(this.x + circleRadius, this.y - innerPointRadius);
    ctx.lineTo(this.x + outerRadius, this.y);
    ctx.lineTo(this.x + circleRadius, this.y + innerPointRadius);

    // Punta Inferior
    ctx.moveTo(this.x + innerPointRadius, this.y + circleRadius);
    ctx.lineTo(this.x, this.y + outerRadius);
    ctx.lineTo(this.x - innerPointRadius, this.y + circleRadius);

    // Punta Izquierda
    ctx.moveTo(this.x - circleRadius, this.y + innerPointRadius);
    ctx.lineTo(this.x - outerRadius, this.y);
    ctx.lineTo(this.x - circleRadius, this.y - innerPointRadius);

    ctx.closePath();
    ctx.fill();
  }
}

class EstrellaPunteada extends Estrella {
  constructor(contexto: RenderContext2d, color?: string) {
    super(contexto, color);
  }

  pintar(): void {
    const ctx = this.contexto;
    const outerRadius = 7;
    const innerRadius = 3;
    const numPoints = 5;

    ctx.fillStyle = this.color;
    ctx.beginPath();

    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / numPoints) * i - Math.PI / 2;

      const x = this.x + radius * Math.cos(angle);
      const y = this.y + radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fill();
  }
}

class Cielo extends Elemento {
  constructor(contexto: RenderContext2d, color?: string) {
    super(contexto, color || "#00001a");
  }

  pintarCielo(): void {
    const ctx = this.contexto;
    const { width: ancho, height: alto } = ctx.canvas;

    // Pintar el fondo con un degradado oscuro
    const gradiente = ctx.createLinearGradient(0, 0, 0, alto);
    gradiente.addColorStop(0, this.color);
    gradiente.addColorStop(1, "#000033");
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ancho, alto);

    // Instanciar y pintar estrellas aleatorias
    const numEstrellasTotal = Math.floor(Math.random() * 251) + 150; // 150 a 400

    for (let i = 0; i < numEstrellasTotal; i++) {
      const esRedonda = Math.random() < 0.5;
      const estrella = esRedonda
        ? new EstrellaRedonda(this.contexto)
        : new EstrellaPunteada(this.contexto);

      estrella.pintar();
    }
  }
}

function inicializarCielo() {
  const canvas = document.getElementById("miCanvas") as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");

  if (!ctx) {
    console.error("Error al obtener el canvas o el contexto 2D.");
    return;
  }

  new Cielo(ctx).pintarCielo();
}

document.addEventListener("DOMContentLoaded", inicializarCielo);

// Variables globales para el Canvas y su Contexto
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
const CANVAS_SIZE = 400; // Ancho y alto fijos del Canvas (Me gusta como se ve el espacio que deja a los lados)

// *** VARIABLE GLOBAL CLAVE para el dibujo incremental (por COLUMNA) ***
let currentCol = 0; // 0 a 7, representa la columna actual a dibujar

/**
 * Inicializa las variables del Canvas y el Contexto.
 */
function initializeCanvas(): boolean {
    if (canvas && ctx) {
        return true;
    }

    canvas = document.getElementById('chessCanvas') as HTMLCanvasElement;
    if (canvas) {
        ctx = canvas.getContext('2d');
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        console.log("INFO: Canvas 'chessCanvas' encontrado exitosamente.");
        return true;
    }
    console.error("ERROR: No se encontró el elemento canvas con ID 'chessCanvas'.");
    return false;
}

/**
 * Limpia el Canvas y reinicia el contador de columnas.
 */
function resetCanvas(): void {
    if (!initializeCanvas() || !ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    currentCol = 0; // Reinicia el contador de columnas
    console.log("ACTION: Canvas Reiniciado y contador de columnas a 0.");
}

/**
 * Dibuja 7 líneas horizontales.
 */
function drawHorizontalLines(): void {
    if (!initializeCanvas() || !ctx) return;
    resetCanvas(); // Limpiar el Canvas (y resetear contador)

    const numRows = 8;
    const spacing = CANVAS_SIZE / numRows;

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;

    for (let i = 1; i < numRows; i++) {
        const y = i * spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_SIZE, y);
        ctx.stroke();
    }
    console.log("ACTION: Función drawHorizontalLines() ejecutada.");
}

/**
 * Dibuja 7 líneas verticales.
 */
function drawVerticalLines(): void {
    if (!initializeCanvas() || !ctx) return;
    resetCanvas(); // Limpiar el Canvas (y resetear contador)

    const numCols = 8;
    const spacing = CANVAS_SIZE / numCols;

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;

    for (let i = 1; i < numCols; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_SIZE);
        ctx.stroke();
    }
    console.log("ACTION: Función drawVerticalLines() ejecutada.");
}

// --- Lógica del Tablero Incremental Vertical ---

/**
 * Pinta 8 cuadros (una columna/torre) alternando colores, comenzando en una posición X específica.
 * @param squareSize El ancho y alto de cada cuadro.
 * @param startX La posición X donde comienza la columna.
 * @param startColorIndex 0 para empezar con claro (blanco) en la parte superior, 1 para empezar con oscuro (negro).
 */
function paintSquareColumn(squareSize: number, startX: number, startColorIndex: number): void {
    if (!ctx) return;
    const colorLight = '#FFFFFF';
    const colorDark = '#000000';

    for (let row = 0; row < 8; row++) {
        const isDark = (row + startColorIndex) % 2 !== 0; 
        ctx.fillStyle = isDark ? colorDark : colorLight;
        const startY = row * squareSize;

        ctx.fillRect(startX, startY, squareSize, squareSize);
    }
}

/**
 * Dibuja la PRÓXIMA columna del tablero y avanza el contador.
 * Se llama 8 veces para completar el tablero. (Modificación del Requerimiento 4 para eje Y).
 */
function drawNextChessColumn(): void {
    if (!initializeCanvas() || !ctx) return;
    // Detener si ya se dibujaron las 8 columnas
    if (currentCol >= 8) {
        console.warn("ACTION: Tablero completo. Presione Reiniciar para volver a empezar.");
        return;
    }

    const squareSize = CANVAS_SIZE / 8;
    const col = currentCol; // Usa la columna actual
    const startX = col * squareSize;
    const startColorIndex = col % 2; 
    paintSquareColumn(squareSize, startX, startColorIndex);

    console.log(`ACTION: Se pintó la Columna ${col + 1}/8.`);
    currentCol++;
}


// Inicialización final de variables
initializeCanvas();
console.log("INFO: El script 'script.js' ha sido cargado.");
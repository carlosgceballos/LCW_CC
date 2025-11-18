class JuegoTrivia {
    constructor() {
        // Configuración del juego
        this.nombreJugador = '';
        this.cantidadPreguntas = 10;
        this.dificultad = 'medium';
        this.categoria = '';
        
        // Estado del juego
        this.preguntas = [];
        this.preguntaActual = 0;
        this.puntuacion = 0;
        this.respuestasCorrectas = 0;
        this.tiemposRespuesta = [];
        
        // Control del temporizador
        this.temporizadorId = null;
        this.tiempoRestante = 20;
        this.tiempoInicioPregunta = 0;
        
        this.inicializar();
    }

    inicializar() {
        this.configurarEventos();
        this.mostrarPantalla('pantConfig');
    }

    configurarEventos() {
        // Boton iniciar juego
        document.getElementById('btnIniciar').addEventListener('click', () => {
            this.validarYComenzar();
        });

        // Botones de resultados
        document.getElementById('btnMismaConfig').addEventListener('click', () => {
            this.reiniciarMismaConfiguracion();
        });

        document.getElementById('btnNuevaConfig').addEventListener('click', () => {
            this.nuevaConfiguracion();
        });
    }

    mostrarPantalla(idPantalla) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.pantalla').forEach(pantalla => {
            pantalla.classList.remove('activa');
        });

        // Mostrar pantalla solicitada
        document.getElementById(idPantalla).classList.add('activa');
    }
}

// INICIALIZAR APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    new JuegoTrivia();
});
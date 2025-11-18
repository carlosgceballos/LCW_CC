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

    validarYComenzar() {
        // Validar nombre
        const inputNombre = document.getElementById('inputNombre');
        const nombre = inputNombre.value.trim();
        const errorNombre = document.getElementById('errorNombre');

        if (nombre.length < 2 || nombre.length > 20) {
            errorNombre.textContent = 'El nombre debe tener entre 2 y 20 caracteres';
            inputNombre.focus();
            return;
        }
        errorNombre.textContent = '';

        // Validar cantidad
        const inputCantidad = document.getElementById('inputCantPreg');
        const cantidad = parseInt(inputCantidad.value);
        const errorCantidad = document.getElementById('errorCantidad');

        if (cantidad < 5 || cantidad > 20) {
            errorCantidad.textContent = 'Debe ser entre 5 y 20 preguntas';
            inputCantidad.focus();
            return;
        }
        errorCantidad.textContent = '';

        // Guardar configuración
        this.nombreJugador = nombre;
        this.cantidadPreguntas = cantidad;
        this.dificultad = document.getElementById('selectDificultad').value;
        this.categoria = document.getElementById('selectCategoria').value;

        // Comenzar juego
        this.obtenerPreguntas();
    }

        async obtenerPreguntas() {
        this.mostrarPantalla('pantCarga');

        try {
            // Construir URL de la API
            let url = `https://opentdb.com/api.php?amount=${this.cantidadPreguntas}&difficulty=${this.dificultad}&type=multiple`;
            
            if (this.categoria) {
                url += `&category=${this.categoria}`;
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Error al obtener preguntas de la API');
            }

            const datos = await response.json();
            
            if (datos.response_code !== 0) {
                throw new Error('No se pudieron obtener preguntas con esta configuración');
            }

            this.preguntas = datos.results;
            this.iniciarJuego();

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al cargar las preguntas. Por favor, intenta de nuevo.');
            this.mostrarPantalla('pantConfig');
        }
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

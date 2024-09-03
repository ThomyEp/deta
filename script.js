// script.js

let player;
let isVideoReady = false;

// Función que se llama cuando la API de YouTube se ha cargado
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-background-player', {
        height: '0',
        width: '0',
        videoId: 'eRnIks59Pjw', // ID del video de YouTube
        playerVars: {
            'autoplay': 1, // Reproduce el video automáticamente
            'controls': 0, // Sin controles del reproductor
            'mute': 1, // Silenciar el video (ajustaremos el volumen al hacer clic)
            'loop': 1, // Repetir el video
            'playlist': 'eRnIks59Pjw', // Necesario para repetir el video
            'modestbranding': 1, // Minimizar la marca de YouTube
            'playsinline': 1, // Reproduce en línea (sin pantalla completa)
            'iv_load_policy': 3, // No mostrar anotaciones
            'cc_load_policy': 0 // Subtítulos desactivados
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

// Función que se llama cuando el reproductor está listo
function onPlayerReady(event) {
    isVideoReady = true;
    console.log('Reproductor de YouTube listo para reproducir.');
}

// Función que se llama cuando ocurre un error en el reproductor
function onPlayerError(event) {
    const errorMessages = {
        2: 'Error de parámetro.',
        5: 'Error de reproducción.',
        100: 'El video no puede ser reproducido.',
        101: 'El propietario del video ha restringido la reproducción en otros sitios.',
        150: 'El video no puede ser reproducido debido a restricciones del propietario del video.'
    };
    console.error('Error en el reproductor de YouTube:', errorMessages[event.data] || 'Error desconocido');
}

// Manejo de las transiciones entre secciones
document.addEventListener('DOMContentLoaded', () => {
    const btnComenzar = document.getElementById('btn-comenzar');
    const bienvenida = document.getElementById('bienvenida');
    const imagenSection = document.getElementById('imagen-section');
    const agradecimiento = document.getElementById('agradecimiento');
    const mensajes = document.querySelectorAll('#mensajes .mensaje');
    let mensajeIndex = 0;

    // Función para mostrar la siguiente sección
    function mostrarSiguienteSeccion(seccionOculta, seccionVisible) {
        seccionOculta.classList.remove('visible');
        seccionOculta.classList.add('oculto');
        setTimeout(() => {
            seccionVisible.classList.remove('oculto');
            seccionVisible.classList.add('visible');
        }, 500); // Tiempo de transición
    }

    // Manejo del clic en el botón de comenzar
    btnComenzar.addEventListener('click', () => {
        // Reproduce el video y ajusta el volumen
        if (isVideoReady) {
            player.unMute(); // Dessilenciar el video
            player.playVideo(); // Reproduce el video
        }
        mostrarSiguienteSeccion(bienvenida, imagenSection);

        // Mostrar mensajes en la sección de la imagen
        setTimeout(() => {
            mensajes[mensajeIndex].classList.remove('oculto');
            mensajes[mensajeIndex].classList.add('visible');

            // Ocultar el mensaje actual y mostrar el siguiente
            const interval = setInterval(() => {
                mensajes[mensajeIndex].classList.remove('visible');
                mensajes[mensajeIndex].classList.add('oculto');
                mensajeIndex = (mensajeIndex + 1) % mensajes.length;
                mensajes[mensajeIndex].classList.remove('oculto');
                mensajes[mensajeIndex].classList.add('visible');
            }, 3000); // Cambiar de mensaje cada 3 segundos

            // Mostrar la sección de agradecimiento después de los mensajes
            setTimeout(() => {
                clearInterval(interval);
                mostrarSiguienteSeccion(imagenSection, agradecimiento);
            }, 10000); // Tiempo para mostrar los mensajes
        }, 500); // Tiempo antes de mostrar los mensajes
    });
});

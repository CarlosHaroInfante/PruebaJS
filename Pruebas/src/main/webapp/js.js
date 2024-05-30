// Definición de eventos
const eventos = [
    { tipo: 'Torneo de Fútbol', fecha: new Date('2024-07-10'), duracion: '3 días' },
    { tipo: 'Maratón de Sevilla', fecha: new Date('2024-06-25'), duracion: '6 horas' },
    { tipo: 'Clase de Yoga al Aire Libre', fecha: new Date('2025-01-01'), duracion: '1 día' },
    { tipo: 'Torneo de Baloncesto', fecha: new Date('2024-12-15'), duracion: '2 días' }
];

// Función para listar todos los eventos
function listarEventos() {
    // Ordena los eventos por fecha
    eventos.sort((a, b) => a.fecha - b.fecha);
    // Genera una cadena de texto con la información de cada evento
    const resultado = eventos.map(evento => `${evento.tipo} el ${evento.fecha.toLocaleDateString()} (${evento.duracion})`).join('<br>');
    // Muestra los eventos en el elemento con id "resultado"
    document.getElementById('resultado').innerHTML = resultado;
}

// Función para buscar eventos por fecha
function buscarPorFecha() {
    // Solicita al usuario que ingrese el mes y el año
    const mes = parseInt(prompt('Ingrese el mes (1-12):'));
    const año = parseInt(prompt('Ingrese el año:'));
    // Filtra los eventos que coinciden con el mes y el año proporcionados
    const eventosFiltrados = eventos.filter(evento => evento.fecha.getMonth() + 1 === mes && evento.fecha.getFullYear() === año);
    // Genera una cadena de texto con la información de los eventos filtrados
    const resultado = eventosFiltrados.map(evento => `${evento.tipo} el ${evento.fecha.toLocaleDateString()} (${evento.duracion})`).join('<br>');
    // Muestra los eventos filtrados en el elemento con id "resultado", o un mensaje si no se encontraron eventos
    document.getElementById('resultado').innerHTML = resultado || 'No se encontraron eventos.';
}

// Función para buscar eventos por tipo
function buscarPorEvento() {
    // Solicita al usuario que ingrese el tipo de evento
    const tipo = prompt('Ingrese el tipo de evento:');
    // Filtra los eventos que coinciden con el tipo proporcionado (sin distinguir entre mayúsculas y minúsculas)
    const eventosFiltrados = eventos.filter(evento => evento.tipo.toLowerCase() === tipo.toLowerCase());
    // Genera una cadena de texto con la información de los eventos filtrados
    const resultado = eventosFiltrados.map(evento => `${evento.tipo} el ${evento.fecha.toLocaleDateString()} (${evento.duracion})`).join('<br>');
    // Muestra los eventos filtrados en el elemento con id "resultado", o un mensaje si no se encontraron eventos
    document.getElementById('resultado').innerHTML = resultado || 'No se encontraron eventos.';
}

// Función para añadir un nuevo evento
function añadirEvento() {
    // Solicita al usuario que ingrese el tipo, la fecha y la duración del evento
    const tipo = prompt('Ingrese el tipo de evento:');
    const fecha = prompt('Ingrese la fecha del evento (YYYY-MM-DD):');
    const duracion = prompt('Ingrese la duración del evento:');
    // Agrega el nuevo evento al array de eventos
    eventos.push({ tipo, fecha: new Date(fecha), duracion });
    // Muestra los eventos actualizados
    listarEventos();
}

// Función para eliminar un evento
function eliminarEvento() {
    // Solicita al usuario que ingrese el tipo de evento a eliminar
    const tipo = prompt('Ingrese el tipo de evento a eliminar:');
    // Encuentra el índice del primer evento que coincida con el tipo proporcionado (sin distinguir entre mayúsculas y minúsculas)
    const indice = eventos.findIndex(evento => evento.tipo.toLowerCase() === tipo.toLowerCase());
    // Si se encuentra un evento (índice mayor a -1), lo elimina del array
    if (indice > -1) {
        eventos.splice(indice, 1);
    }
    // Muestra los eventos actualizados
    listarEventos();
}

// Función para calcular y mostrar el próximo evento
function calcularProximoEvento() {
    // Obtiene la fecha y hora actual
    const hoy = new Date();
    // Filtra los eventos futuros (aquellos cuya fecha es posterior a hoy)
    const eventosFuturos = eventos.filter(evento => evento.fecha > hoy);
    // Ordena los eventos futuros por fecha en orden ascendente
    eventosFuturos.sort((a, b) => a.fecha - b.fecha);
    // Si hay eventos futuros, calcula los días restantes para el próximo evento y muestra la información
    if (eventosFuturos.length > 0) {
        const diasRestantes = Math.ceil((eventosFuturos[0].fecha - hoy) / (1000 * 60 * 60 * 24));
        document.getElementById('resultado').innerHTML = `El próximo evento es ${eventosFuturos[0].tipo} el ${eventosFuturos[0].fecha.toLocaleDateString()} (en ${diasRestantes} días).`;
    } else {
        // Si no hay eventos futuros, muestra un mensaje indicando que no hay eventos futuros
        document.getElementById('resultado').innerHTML = 'No hay eventos futuros.';
    }
}

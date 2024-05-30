const eventos = [
    { tipo: 'Torneo de Fútbol', fecha: new Date('2024-07-10'), duracion: '3 días' },
    { tipo: 'Maratón de Sevilla', fecha: new Date('2024-06-25'), duracion: '6 horas' },
    { tipo: 'Clase de Yoga al Aire Libre', fecha: new Date('2025-01-01'), duracion: '1 día' },
    { tipo: 'Torneo de Baloncesto', fecha: new Date('2024-12-15'), duracion: '2 días' }
];

function listarEventos() {
    eventos.sort((a, b) => a.fecha - b.fecha);
    const resultado = eventos.map(evento => `${evento.tipo} el ${evento.fecha.toLocaleDateString()} (${evento.duracion})`).join('<br>');
    document.getElementById('resultado').innerHTML = resultado;
}

function buscarPorFecha() {
    const mes = parseInt(prompt('Ingrese el mes (1-12):'));
    const año = parseInt(prompt('Ingrese el año:'));
    const eventosFiltrados = eventos.filter(evento => evento.fecha.getMonth() + 1 === mes && evento.fecha.getFullYear() === año);
    const resultado = eventosFiltrados.map(evento => `${evento.tipo} el ${evento.fecha.toLocaleDateString()} (${evento.duracion})`).join('<br>');
    document.getElementById('resultado').innerHTML = resultado || 'No se encontraron eventos.';
}

function buscarPorEvento() {
    const tipo = prompt('Ingrese el tipo de evento:');
    const eventosFiltrados = eventos.filter(evento => evento.tipo.toLowerCase() === tipo.toLowerCase());
    const resultado = eventosFiltrados.map(evento => `${evento.tipo} el ${evento.fecha.toLocaleDateString()} (${evento.duracion})`).join('<br>');
    document.getElementById('resultado').innerHTML = resultado || 'No se encontraron eventos.';
}

function añadirEvento() {
    const tipo = prompt('Ingrese el tipo de evento:');
    const fecha = prompt('Ingrese la fecha del evento (YYYY-MM-DD):');
    const duracion = prompt('Ingrese la duración del evento:');
    eventos.push({ tipo, fecha: new Date(fecha), duracion });
    listarEventos();
}

function eliminarEvento() {
    const tipo = prompt('Ingrese el tipo de evento a eliminar:');
    const indice = eventos.findIndex(evento => evento.tipo.toLowerCase() === tipo.toLowerCase());
    if (indice > -1) {
        eventos.splice(indice, 1);
    }
    listarEventos();
}

function calcularProximoEvento() {
    const hoy = new Date();
    const eventosFuturos = eventos.filter(evento => evento.fecha > hoy);
    eventosFuturos.sort((a, b) => a.fecha - b.fecha);
    if (eventosFuturos.length > 0) {
        const diasRestantes = Math.ceil((eventosFuturos[0].fecha - hoy) / (1000 * 60 * 60 * 24));
        document.getElementById('resultado').innerHTML = `El próximo evento es ${eventosFuturos[0].tipo} el ${eventosFuturos[0].fecha.toLocaleDateString()} (en ${diasRestantes} días).`;
    } else {
        document.getElementById('resultado').innerHTML = 'No hay eventos futuros.';
    }
}

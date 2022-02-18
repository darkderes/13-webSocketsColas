const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket',ticketControl.ultimo)
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('tickets-pendientes',ticketControl.tickets.length)
    
    socket.on('disconnect', () => { });

    socket.on('siguente-ticket', ( payload, callback ) => {
        
        const siguente = ticketControl.siguente();
        callback(siguente);
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)

        // notificar que hay un nuevo ticket pendiente de asignar
    });

    socket.on('atender-ticket',({ escritorio },callback) => {

        if( !escritorio){
            return callback({
                ok:false,
                msg: 'es escritorio obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual',ticketControl.ultimos4)
        socket.emit('tickets-pendientes',ticketControl.tickets.length)
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)

        if (!ticket){
            callback({
                ok:false,
                msg:'Ya no hay tickets pendientes'
            });
        }
        else{
            callback({
                ok:true,
                ticket
            });
        }
    });

}
module.exports = {
    socketController
}


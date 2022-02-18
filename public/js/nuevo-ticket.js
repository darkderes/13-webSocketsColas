
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

btnCrear.disabled = false;

});

socket.on('disconnect', () => {
btnCrear.disabled = true;
});

socket.on('ultimo-ticket',(ultimo) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})


btnCrear.addEventListener( 'click', () => {

    
    socket.emit( 'siguente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});
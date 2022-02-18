const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    getToJson(){
        return {
        ultimo : this.ultimo,
        hoy : this.hoy,
        tickets: this.tickets, 
        ultimos4: this.ultimos4
        }
    }

    init(){
        const {hoy,tickets,ultimo,ultimos4} = require('../db/data.json');
        if(hoy === this.hoy)
        {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else
        {
            this.guardarDb();
        }

    }

    guardarDb(){
        const dbPath = path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.getToJson()));
    }

    siguente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);

        this.guardarDb();
        return 'Ticket ' + ticket.numero;
    }
    atenderTicket(escritorio){

        //no tenemos tickets
        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets[0];
        this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4 .unshift(ticket);

        if(this.ultimos4.length > 4)
        {
            this.ultimos4.splice(-1,1);
        }
        this.guardarDb();
        return ticket;


    }
}

module.exports = TicketControl;
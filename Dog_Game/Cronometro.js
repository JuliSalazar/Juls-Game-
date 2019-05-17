class Cronometro { 
    constructor(centesimas=0,segundos=0,minutos=0,horas=0,control=null){
        this.centesimas = centesimas;
        this.segundos = segundos;
        this.minutos = minutos;
        this.horas = horas;
        this.control=control;
    }


 inicio () {
    let Crono=this;
    this.control = setInterval(function(){Crono.cronometro(Crono)}, 10); 
}

 parar () {
	clearInterval(this.control);
}

 reinicio () {
	clearInterval(control);
	this.centesimas = 0;
	this.segundos = 0;
	this.minutos = 0;
	this.horas = 0;
	/*Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";*/
}

   cronometro (Crono) {
       
	if (Crono.centesimas < 99) {
        Crono.centesimas++;    
		if (Crono.centesimas < 10) { Crono.centesimas = "0"+Crono.centesimas }
		//Centesimas.innerHTML = ":"+centesimas;
	}
	if (Crono.centesimas == 99) {
		Crono.centesimas = -1;
	}
	if (Crono.centesimas == 0) {
		Crono.segundos ++;
		if (Crono.segundos < 10) { Crono.segundos = "0"+Crono.segundos }
		//Segundos.innerHTML = ":"+segundos;
	}
	if (Crono.segundos == 59) {
		Crono.segundos = 0;
	}
	if ( (Crono.centesimas == 0)&&(Crono.segundos == 0) ) {
		Crono.minutos++;
		if (Crono.minutos < 10) { Crono.minutos = "0"+Crono.minutos }
		//Minutos.innerHTML = ":"+minutos;
	}
	if (Crono.minutos == 59) {
		Crono.minutos = -1;
	}
	if ( (Crono.centesimas == 0)&&(Crono.segundos == 0)&&(Crono.minutos == 0) ) {
		Crono.horas ++;
		if (Crono.horas < 10) { Crono.horas = "0"+Crono.horas }
		//Horas.innerHTML = horas;
    }
    
}

    mostrarTiempo () {
        return ""+this.minutos+":"+this.segundos;
	}
	
	mostrarMin() {
		return this.minutos;
	}
	mostrarSeg(){
		return this.segundos;
	}

}
/*
var cronometro = new Cronometro();
cronometro.inicio();
console.log('horas',cronometro);  
setInterval(function(){ console.log(cronometro.getSegundos()); }, 10);
*/


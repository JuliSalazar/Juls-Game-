class Cronometro { 
    constructor(logica){
        this.centesimas = 0;
        this.segundos = 0;
        this.minutos = 0;
        this.horas = 0;
		this.control=null;
	
		this.logica = logica;
		this.yaSeCreo = false;

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

}

   cronometro (Crono) {
	
	/*if(Crono.segundos == 10 && this.yaSeCreo == false) {

		this.logica.crearEnemigos();
		this.yaSeCreo = true;
	}*/

	if (Crono.centesimas < 99) {
        Crono.centesimas++;    
		if (Crono.centesimas < 10) { Crono.centesimas = "0"+Crono.centesimas }

	}
	if (Crono.centesimas == 99) {
		Crono.centesimas = -1;
	}
	if (Crono.centesimas == 0) {
		Crono.segundos ++;
		if (Crono.segundos < 10) { Crono.segundos = "0"+Crono.segundos }

	}
	if (Crono.segundos == 59) {
		Crono.segundos = 0;
	}
	if ( (Crono.centesimas == 0)&&(Crono.segundos == 0) ) {
		Crono.minutos++;
		if (Crono.minutos < 10) { Crono.minutos = "0"+Crono.minutos }
	}
	if (Crono.minutos == 59) {
		Crono.minutos = -1;
	}
	if ( (Crono.centesimas == 0)&&(Crono.segundos == 0)&&(Crono.minutos == 0) ) {
		Crono.horas ++;
		if (Crono.horas < 10) { Crono.horas = "0"+Crono.horas }
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
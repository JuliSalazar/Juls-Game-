class Mascota extends Elemento{
    //Mascota hereda de elemento 
    constructor(app,tipo){
     super(app,tipo);
     //variables que se usan y se modifican como ancho y alto
        this.tipo = tipo;
        this.mascota = [ this.app.loadImage("./Chibi_Game/Recursos/mascota.png")];
        this.asignarPos();
        this.ancho= 128;
        this.alto = 147;
    }
    //En mascota solo es un caso , pero se reasignan posiciones cuando se selecciona
    asignarPos(){
        switch(this.tipo){
            case 0:
            this.x = 200;
            this.y = 500;
            break;

        }
    }
    pintar(){
        switch(this.tipo){
            case 0:
            this.app.image(this.mascota[this.tipo],this.x,this.y);
            break;
        }   
    }
}
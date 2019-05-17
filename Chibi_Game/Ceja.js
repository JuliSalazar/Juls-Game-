class Ceja extends Elemento{
    //Ceja hereda de elemento
    constructor(app,tipo){
     super(app,tipo);
        this.tipo = tipo;
        //Aquí hay dos arreglos, uno para pintarlos en las cajas de "vestuario"
        this.cejas = [this.app.loadImage("./Chibi_Game/Recursos/cejas0.png"),this.app.loadImage("./Chibi_Game/Recursos/cejas1.png")];
        //Otro para las imagenes que son a tamaño de personaje
        this.cejasPersonaje = [this.app.loadImage("./Chibi_Game/Recursos/cejasPJ0.png"),this.app.loadImage("./Chibi_Game/Recursos/cejasPJ1.png")];
        this.asignarPos();
    }
    //para cada tipo hay una posicion y de acuerdo a esto se pintan
    asignarPos(){
        switch(this.tipo){
            case 0:
            this.x = 38;
            this.y = 109;
            break;
            case 1:      
            this.x = 128;
            this.y = 109;
            break;
        }
    }
    pintar(){
        switch(this.tipo){
            case 0:
            this.app.image(this.cejas[this.tipo],this.x,this.y);
            break;
            case 1:      
            this.app.image(this.cejas[this.tipo],this.x,this.y,68,13);
            break;
        }     
    }
    //ya cuando se van a pintar en el personaje es una diferente img, más grande
    pintarEnPersonaje(){
        switch(this.tipo){
            
            case 0:
            this.app.image(this.cejasPersonaje[this.tipo],this.x,this.y);
            break;
            case 1:      
            this.app.image(this.cejasPersonaje[this.tipo],this.x,this.y);
            break;
        }
    }
}
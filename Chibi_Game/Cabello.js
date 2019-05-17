class Cabello extends Elemento{
    //Cabello hereda de elememto
    constructor(app,tipo){
     super(app,tipo);
     //variables a usar y modificar
     this.tipo = tipo;
     this.ancho = 81;
     this.alto = 82;
     this.asignarPos();
     //Aquí hay dos arreglos donde van: cabellos[]: cabellos en la caja de "vestuario"
     // y cabellosEnPersonaje[]: las imgs que se acomodan al personaje
     this.cabellos = [];
    this.cabellosEnPersonaje = []; 
        for (let i = 0; i < 7; i++) {
            this.cabellos.push(app.loadImage("./Chibi_Game/Recursos/pelo"+i+".png"));;
        }
        for (let i = 0; i < 7; i++) {
            this.cabellosEnPersonaje.push(app.loadImage("./Chibi_Game/Recursos/peloPJ"+i+".png"));;
        }
    }
    //se asgina una posicion unica para cada tipo que luego puede ser modificada
    asignarPos(){
        switch(this.tipo){
            case 0:
            this.x = 400;
            this.y = 108;
            break;
            case 1:      
            this.x = 299;
            this.y = 193;
            break;
            case 2:      
            this.x = 395;
            this.y = 198;
            break;
            case 3:      
            this.x = 395;
            this.y = 303;
            break;
            case 4:      
            this.x = 306;
            this.y = 293;
            break;
            case 5:      
            this.x = 484;
            this.y = 258;
            break;
            case 6:      
            this.x = 477;
            this.y = 157;
            break;

        }
    }
    //Aqui se pintan en la parte de la caja de contenido de vestuario como tal
    pintar(){
        switch(this.tipo){
            case 0:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            case 1:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            case 2:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            case 3:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            case 4:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            case 5:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            case 6:
                this.app.image(this.cabellos[this.tipo],this.x,this.y);
            break;
            
        }
        
    }
    //Con este pintar se modifican las imagenes que si se pueden ver facilmente en el personaje
    pintarEnPersonaje(){
        switch(this.tipo){
           case 0:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            case 1:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            case 2:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            case 3:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            case 4:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            case 5:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            case 6:
                this.app.image(this.cabellosEnPersonaje[this.tipo],this.x,this.y);
            break;
            
        }
        
    }

}
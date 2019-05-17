class Ojo extends Elemento{
    constructor(app,tipo){
     super(app,tipo);
     this.tipo = tipo;
     this.asignarPos();
     this.ojos = [];
     this.ojosEnElPersonaje = [];
     for (let i = 0; i < 4; i++) {
        this.ojos.push(app.loadImage("./Chibi_Game/Recursos/ojos" + i + ".png"));
     }
     for (let i = 0; i < 4; i++) {
        this.ojosEnElPersonaje.push(app.loadImage("./Chibi_Game/Recursos/OjosPJ" + i + ".png"));
     }
     
    }
    //Este metodo ayuda a organizar los elementos seleccionables, que estan organizados en las cajas de elementos
    asignarPos(){
        switch(this.tipo){
            case 0:
            this.x = 39;
            this.y = 145;
            break;
            case 1:      
            this.x = 39;
            this.y = 193;
            break;
            case 2:      
            this.x = 130;
            this.y = 152;
            break;
            case 3:      
            this.x = 129;
            this.y = 195;
            break;

        }
    }
    pintar(){
        //Los ojos se pintan en la cajas de tamaño menor
        switch(this.tipo){
            case 0:
           this.app.image(this.ojos[this.tipo],this.x,this.y);    
            break;
            case 1:      
            this.app.image(this.ojos[this.tipo],this.x,this.y);
            break;
            case 2:
            this.app.image(this.ojos[this.tipo],this.x,this.y);
            break;
            case 3:
            this.app.image(this.ojos[this.tipo],this.x,this.y);
            break;

        }
    }
    //este metodo sirve para modificar el tamaño de la img en el personaje, para que no afecte otro ancho y alto a las otras imgs iniciales
    pintarEnPersonaje(){
        switch(this.tipo){
            case 0:
             this.app.image(this.ojosEnElPersonaje[this.tipo],this.x,this.y);
            break;
            case 1:      
            this.app.image(this.ojosEnElPersonaje[this.tipo],this.x,this.y);
            break;
            case 2:
            this.app.image(this.ojosEnElPersonaje[this.tipo],this.x,this.y);
            break;
            case 3:
            this.app.image(this.ojosEnElPersonaje[this.tipo],this.x,this.y);
            break;
        }
    }
}
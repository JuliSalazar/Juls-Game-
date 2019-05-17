class Zapato extends Elemento{
    //Zapato hereda de Elemento
    constructor(app,tipo){
     super(app,tipo);
     //se modifican las variables ancho y alto
        this.tipo = tipo;
        this.ancho= 153;
        this.alto=25;
        this.asignarPos();
        this.zapatos = [this.app.loadImage("./Chibi_Game/Recursos/zapatos0.png"),this.app.loadImage("./Chibi_Game/Recursos/zapatos1.png")];
    }
    //Este metodo ayuda a organizar los elementos seleccionables, que estan organizados en las cajas de elementos
    asignarPos(){
        switch(this.tipo){
        case 0:      
        this.x = 86;
        this.y = 588;
        break;
        case 1:      
        this.x = 337;
        this.y = 587;
        break;
        }
    }
    pintar(){
        //Aqui se pintan de acuerdo al tipo
        switch(this.tipo){
            case 0:
            this.app.image(this.zapatos[this.tipo],this.x,this.y);
            break;
            case 1:
            this.app.image(this.zapatos[this.tipo],this.x,this.y);
            break;
        }
    }
}
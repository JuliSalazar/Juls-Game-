class Ropa extends Elemento{
    //Ropa hereda de elemento
    constructor(app,tipo){
        //variables a usar y modificar
        super(app,tipo);
        this.tipo = tipo;
        this.ropas = [];
        this.asignarPos();
        this.posBase = 0;
        this.ancho= 169;
        this.alto=238;
        for (let i = 0; i < 4; i++) {
            this.ropas.push(app.loadImage("./Chibi_Game/Recursos/ropa" + i + ".png"));
        }
    }
    //Este metodo ayuda a organizar los elementos seleccionables, que estan organizados en las cajas de elementos
    asignarPos(){
        switch(this.tipo){
            case 0:
            this.x = 58;
            this.y = 54;
            break;
            case 1:      
            this.x = 346;
            this.y = 41;
            break;
            case 2:      
            this.x = 51;
            this.y = 259;
            break;
            case 3:      
            this.x = 387;
            this.y = 290;
            break;

        }
    }
    pintar(){
        //se pinta de acuerdo al tipo
        switch(this.tipo){
            case 0:
            this.app.image(this.ropas[this.tipo],this.x,this.y);
            break;
            case 1:      
            this.app.image(this.ropas[this.tipo],this.x,this.y);
            break;
            case 2:
            this.app.image(this.ropas[this.tipo],this.x,this.y);
            break;
            case 3:
            this.app.image(this.ropas[this.tipo],this.x,this.y);
            break;

        }
    }

}
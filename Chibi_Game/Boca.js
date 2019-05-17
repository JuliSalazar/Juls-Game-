class Boca extends Elemento{
    //Boca hereda de elemento
    constructor(app,tipo){
     super(app,tipo);
     this.tipo = tipo;
     //aqui se tiene un arreglo para las imagenes "bocas"
     this.bocas = [];
        for (let i = 0; i < 3; i++) {
            this.bocas.push(app.loadImage("./Chibi_Game/Recursos/boca" + i + ".png"));
        }
    this.asignarPos();
    }
    //se asignan posiciones unicas para el caso de diferente tipo
    asignarPos(){
        switch(this.tipo){
            case 0:
            this.x = 96;
            this.y = 273;
            break;
            case 1:      
            this.x = 61;
            this.y = 233;
            break;
            case 2:      
            this.x = 151;
            this.y = 233;
            break;
        }
    }
    //aqui se pintan y no es necesario tener otro pintan puesto que su tamaño o forma no varía
    pintar(){
        switch(this.tipo){
            case 0:
            this.app.image(this.bocas[this.tipo],this.x,this.y);
            break;
            case 1:      
            this.app.image(this.bocas[this.tipo],this.x,this.y);
            break;
            case 2:
            this.app.image(this.bocas[this.tipo],this.x,this.y);
            break;
        }   
    } 
}
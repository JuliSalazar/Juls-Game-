 class Elemento{
     //Clase padre Elemento
    constructor(app,tipo){
        //Atributos que comparten todos lo elementos
        this.app = app;
        this.tipo = tipo;
        this.posBase = 0;
        this.x;
        this.y;
        this.ancho = 70;
        this.alto = 20; 
    }
    //Metodo validar para cada elemento
    validar(otroX,otroY){
        if(otroX > this.x && otroX < (this.x + this.ancho)
            && otroY > this.y && otroY < (this.y + this.alto)){
               return true;
            }else {
                return false;
            }
    }
    //Set y get necesarios
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
    getTipo(){
        return this.tipo;
    }
    
}

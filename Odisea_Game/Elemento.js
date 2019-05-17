class Elemento  {
    constructor(app) {
        this.app = app;
        this.x;
        this.y;
        this.ancho;
        this.alto; 
    }
    validar(otroX,otroY){
        if(otroX > this.x && otroX < (this.x + this.ancho)
            && otroY > this.y && otroY < (this.y + this.alto)){
               return true;
            }else {
                return false;
            }
    }
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
}
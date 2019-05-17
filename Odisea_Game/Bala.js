class Bala extends Elemento {
    constructor(app,x,y) {
        super(app);
        this.app = app;
        this.x = x;
        this.y = y;
        this.radio=10;
    }
    pintar(){
        this.app.fill(255);
        this.app.ellipse(this.x,this.y-3,this.radio,this.radio);
    }
    mover(){
        this.x += 1;
    }
    validar(otroX, otroY,otroAncho){
        if((this.app.dist(this.x,this.y,this.x+this.radio,this.y+this.radio) && this.app.dist(otroX,otroY, (otroX - otroAncho/2),otroY)) > 
            this.app.dist(this.x,this.y,otroX,otroY)){
            return true;
        }
    }
}
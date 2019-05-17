class Bomba extends Elemento{
    constructor(app){
        super(app);
        this.app = app;
        this.x =  this.app.random(200,800);
        this.y = this.app.random(0,-1000);
        this.vel = 1;
        this.img = this.app.loadImage("./Odisea_Game/Recursos/bomba.png"); 

    }
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
    pintar(){
        this.app.image(this.img,this.x,this.y);   
    }
    mover(){
        this.y -= this.vel;
    }
}
class PowerUp extends Elemento  {
    constructor(app) {
        super(app);
        this.app = app;
        this.x = this.app.random(300,1000);
        this.y = this.app.random(0,-1000);
        this.img = this.app.loadImage("./Odisea_Game/Recursos/bomba.png"); 
        this.ancho = 102
        this.alto = 100;
        this.vel = 1;
    }
    pintar(){
        this.app.image(this.img,this.x,this.y);
    }
    mover() {
		this.y += this.vel;
    }
    getY(){
        return this.y;
    }
}
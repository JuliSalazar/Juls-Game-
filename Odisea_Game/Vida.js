class Vida  {
    constructor(app,posX) {
        this.app = app;
        this.posX = posX;
        this.posY = 34;
        this.corazon = this.app.loadImage("./Odisea_Game/Recursos/Corazon.png"); 
    }
    pintar(){
        this.app.image(this.corazon,this.posX,this.posY);
    }
}
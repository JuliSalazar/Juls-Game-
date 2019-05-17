class BotonHud  {
    constructor(app,x,tipo) {
        this.app = app;
        this.tipo = tipo;
        this.x= x;
        this.y = 12;
        this.botones = [];
        for (let i = 1; i < 5; i++) {
            this.botones.push(app.loadImage("./Odisea_Game/Recursos/btnMaq" + i + ".png"));
        }
    }
    pintar(){
       switch (this.tipo) {
           case 1:
            //this.app.tint(100);
            this.app.image(this.botones[this.tipo-1],this.x,this.y);
            //this.app.noTint();
        
               break;
       
           case 2:
            this.app.image(this.botones[this.tipo-1],this.x,this.y);
               break;
            case 3:
            this.app.image(this.botones[this.tipo-1],this.x,this.y);
               break;
            case 4:
            this.app.image(this.botones[this.tipo-1],this.x,this.y);
               break;
       }
    }
    validar(otroX,otroY){
        if(otroX > this.x && otroX < this.x + this.botones[1].width &&
            otroY > this.y && otroY < this.y + this.botones[1].height){
                return true;
        }
    }
}
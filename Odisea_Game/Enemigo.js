class Enemigo extends Elemento {
    constructor(app,tipo, logica) {
        super(app);
        this.app = app;
        this.tipo = tipo;
        this.logica = logica;
        this.enemigos = [];
        for (let i = 1; i < 4; i++) {
            this.enemigos.push(app.loadImage("./Odisea_Game/Recursos/Enemigo" + i + ".png"));
         }
        this.x= this.app.random(1200,2000);
        this.i = Math.floor(this.app.random(0,3));
        this.vel , this.modX, this.modY;
        this.isVivo = true;
        this.vida;
        this.anchoVida = 10;
        this.altoVida = 10;
        this.lineasY = [376, 504, 633];
        this.y = this.lineasY[this.i];
        switch (this.tipo) {
            case 1:
                this.vel = 1;
                this.vida = 5;
                this.modX = 30;
                this.modY = 60;
                this.modYimg = 0;
                break;
        
            case 2:
                this.vel = 1;
                this.modX = 30;
                this.modYimg = 40;
                this.modY = 140;
                this.vida = 10;
                break;
            case 3:
                this.vel = 1;
                this.modX = 30;
                this.modYimg = 35;
                this.modY = 150;
                this.vida = 15;
                break;
        }

    }
    barraVida(){
        this.app.rectMode(this.app.CENTER);
        this.app.noFill();
        this.app.rect(this.x,this.y -  this.modY,this.anchoVida,this.altoVida);
        this.app.fill(255,30,30);
        this.app.rect(this.x,this.y -  this.modY,this.anchoVida*this.vida,this.altoVida);  
        this.app.rectMode(this.app.CORNER);
    }

    reducirVida(){
        if(this.isVivo){
            for (let i = 0; i < this.logica.balas.length; i++) {
                if(this.logica.balas[i] != null){
                const bala = this.logica.balas[i];
                if(bala.validar(this.x,this.y,this.enemigos[this.tipo-1].width-20) && this.vida > 0){
                    this.vida -=1;
                    this.logica.balas.splice(0,1);
                }
                if(this.vida == 0){
                    
                    this.isVivo = false;
                    this.logica.enemigos.splice(0,1);
                }
             }
            }
        }    
    }
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
    pintar(){
        this.app.imageMode(this.app.CENTER);
        this.app.image(this.enemigos[this.tipo-1],this.x,this.y- this.modYimg);
        this.barraVida();
        this.app.imageMode(this.app.CORNER);
        this.reducirVida();
        
    }
    
    mover() {
		this.x -= this.vel;
		
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getAncho(){
        return this.enemigos[this.tipo].width-20;
    }
    getAlto(){
        return this.enemigos[this.tipo].height-50;
    }
    
}
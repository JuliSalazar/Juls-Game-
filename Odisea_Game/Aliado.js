class Aliado extends Elemento  {
    constructor(app,tipo,logica) {
        super(app);
        this.app = app;
        this.tipo = tipo;
        this.logica = logica;
        this.aliados = [];
        for (let i = 1; i < 4; i++) {
            this.aliados.push(app.loadImage("./Odisea_Game/Recursos/Maq" + i + ".png"));
         }
         this.isVivo = true;
        this.x;
        this.y;
        this.vida;
        this.anchoVida = 10;
        this.altoVida = 10;
        this.puesto = false;
         this.disparar = this.disparar.bind(this);
        setInterval(this.disparar,1000);

        switch (this.tipo) {
            case 1:
                this.vida = 5;
                //rango de defensa del aliado tipo 1
                this.modX = 250;
                this.modY = 0;
                this.anchoDef =  400;
                this.altoDef = 120;   
                this.yVida = 60;        
                break;
        
            case 2:
                this.vida = 5;
                // Rango de defensa de aliado tipo 2
                this.modX = 300;
                this.modY = 0;
                this.anchoDef =  500;
                this.altoDef = 120;
                this.yVida = 70;  
                break;
            case 3:
                this.vida = 5;
                // Rango de defensa de aliado tipo 3
                this.modX = 500;
                this.modY = -45;
                this.anchoDef=  1000;  
                this.altoDef = 120;
                this.yVida = 120;  
                break;
        }
    }
    setPos(x, y){
        this.x = x;
        this.y = y;
    }
    reducirVida(){
        if(this.isVivo){
            for (let i = 0; i < this.logica.balas.length; i++) {
                const bala = this.logica.balas[i];
                if(bala.validar(this.x,this.y,this.aliados[this.tipo].width-20) && this.vida > 0){
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
    barraVida(){
        this.app.rectMode(this.app.CENTER);
        this.app.noFill();
        this.app.rect(this.x,this.y -  this.yVida,this.anchoVida,this.altoVida);
        this.app.fill(40,255,30);
        this.app.rect(this.x,this.y -  this.yVida,this.anchoVida*this.vida,this.altoVida);  
        this.app.rectMode(this.app.CORNER);
    }
    pintar(){
        for (let i = 0; i < this.logica.balas.length; i++) {
            const bala = this.logica.balas[i];
            bala.pintar();
            bala.mover();
        }
        
        this.app.imageMode(this.app.CENTER);  
        this.app.image(this.aliados[this.tipo-1],this.x,this.y);
        this.app.imageMode(this.app.CORNER);
        this.barraVida();
    } 
    disparar(){
         for (let i = 0; i < this.logica.enemigos.length; i++) {
                const enemigo =  this.logica.enemigos[i];
                if(enemigo.getX() > this.x + this.modX/5 && enemigo.getX() < (this.x + this.modX/5) + this.anchoDef  &&
                    enemigo.getY() > this.y - this.altoDef/2  && enemigo.getY() < (this.y - this.altoDef/2) +  this.altoDef ){
                        this.logica.balas.push(new Bala(this.app , this.x,this.y));
                        
                }
        }                   
    }
    getTipo(){
        return this.tipo;
    } 
    setPuesto(boolean){
        this.puesto = boolean;
    }
    getPuesto(){
        return this.puesto;
    }

}
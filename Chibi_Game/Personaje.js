class Personaje{
    //Clase personaje (contenedor)
    constructor(app){
        //variables a usar y modificar
        this.app = app;
        this.bases = [];
        this.x = 622;
        this.y = 228;
        this.ancho = 229;
        this.alto = 430;
        this.posBase = 0;
        this.destellos = this.app.loadImage("./Chibi_Game/Recursos/destellos.png"); 
        this.destellosOn = false;
        this.tiempo = 0;
        this.hecho = false;
        this.recibiElemento = false;
        this.base = [this.app.loadImage("./Chibi_Game/Recursos/baseint.png")]
        this.elementos = [];
       
        for (let i = 0; i < 6; i++) {
            this.bases.push(app.loadImage("./Chibi_Game/Recursos/base" + i + ".png"));;
        }

    }
    pintar(){
        //Aqui se pinta el personaje base
        this.app.image(this.bases[this.posBase],this.x,this.y); 
        this.app.image(this.base[0],this.x + 53,this.y + 289);
            //Con el if se controla que elementos se pintan y si su metodo pintar es "Pintar()" o "PintarEnPersonaje"
            if(this.elementos[0] != null){
        
                this.elementos[0].pintarEnPersonaje();
            }
            if(this.elementos[1] != null){
                this.elementos[1].pintarEnPersonaje();
            }
            if(this.elementos[2] != null){
                this.elementos[2].pintar();
            }
            if(this.elementos[3] != null){
                this.elementos[3].pintarEnPersonaje();
            }
            if(this.elementos[4] != null){
                this.elementos[4].pintar();
            }
                if(this.elementos[5] != null){
                this.elementos[5].pintar();
            }
            if(this.elementos[6] != null){
                this.elementos[6].pintar();
            }
         //Desde aquí se controla el feedback cuando el usuario añada un elemento al contenedor
            if(this.destellosOn){
                this.app.image(this.destellos,552,165);
                //se deja un tiempo limite y luego se deja de pintar y reinicia
                this.tiempo++;
                if(this.tiempo == 50){
                    this.destellosOn = false;
                    this.tiempo = 0;
                }          
            }
    }

    ordenar(){
        //El metodo ordenar permite organizar los elementos, de acuerdo a su img y su tipo de elemento, en el personaje
        if(this.elementos[0] != null){
            this.elementos[0].setPos(this.x + 36,this.y + 107);
        }
        if(this.elementos[1] != null){
            this.elementos[1].setPos(this.x + 28,this.y + 82);
        }
        if(this.elementos[2] != null){
            this.elementos[2].setPos(this.x + 88,this.y + 172);
            if(this.elementos[2].getTipo() == 0){
                this.elementos[2].setPos(this.x +73,this.y + 172);
            }
        }
        if(this.elementos[3] != null){
            switch(this.elementos[3].getTipo()){
                case 0:
                this.elementos[3].setPos(this.x-12,this.y-28);
                break;
                case 1:
                this.elementos[3].setPos(this.x-55,this.y-45);
                break;
                case 2:
                this.elementos[3].setPos(this.x-15,this.y-50);
                break;
                case 3:
                this.elementos[3].setPos(this.x,this.y);
                break;
                case 4:
                this.elementos[3].setPos(this.x-10,this.y-29);
                break;
                case 5:
                this.elementos[3].setPos(this.x-70,this.y-13);
                break;
                case 6:
                this.elementos[3].setPos(this.x-7,this.y-18);
                break;

            }
        }
        if(this.elementos[4] != null){
            switch(this.elementos[4].getTipo()){
                case 0:
                this.elementos[4].setPos(this.x + 2,this.y +219);
                break;
                case 1:
                this.elementos[4].setPos(this.x + 30,this.y + 220);
                break;
                case 2:
                this.elementos[4].setPos(this.x,this.y + 184);
                break;
                case 3:
                this.elementos[4].setPos(this.x + 48,this.y + 216);
                break;             
            }
 
        }
        if(this.elementos[5] != null){
            this.elementos[5].setPos(this.x + 43,this.y + 404);
        }         
    }

    recibir(elemento){
        //Con el metodo recibir, se añade un elemento externo a la clase, y se clasifica de acuerdo a su tipo de elemento
        //Cada que recibe se activa el feedback
            if(elemento instanceof Ojo){          
                this.elementos[0] = elemento;
                this.destellosOn = true;    
            }
            if(elemento instanceof Ceja){                   
                this.elementos[1] = elemento;
                this.destellosOn = true;                
            }
            if(elemento instanceof Boca){                
                this.elementos[2] = elemento; 
                this.destellosOn = true;  
            }
            if(elemento instanceof Cabello){                            
                this.elementos[3] = elemento; 
                this.destellosOn = true; 
            }
            if(elemento instanceof Ropa){                
                 this.elementos[4] = elemento;  
                 this.destellosOn = true;
            }
            if(elemento instanceof Zapato){                                     
            this.elementos[5] = elemento;
            this.destellosOn = true;            
            }
            if(elemento instanceof Mascota){ 
                this.elementos[6] = elemento; 
                this.destellosOn = true;     
            }
            // cuando se recibe se re-ordena lo que se recibe
            this.ordenar(); 
    }
    validar(otroX, otroY){
        //El validar, establece si otro x o Y están dentro de su rango, el -30 es para aumentar un poco el area sin afectar lo demás
        if(otroX > this.x-30 && otroX < this.x + this.ancho
            && otroY > this.y-30 && otroY < this.y + this.alto){
            return true;
        } else {
            return false;
        }
    }
    setPos(x, y){
        this.x = x;
        this.y = y;
        this.ordenar();
    }
    setPosBase(i){
        this.posBase = i;
    }
    setTam(ancho,alto){
        this.ancho = ancho;
        this.alto = alto;
    }
    //Con el reiniciar el personaje vuelve a tener sus variables iniciales
    reiniciar(){
        this.elementos = [];
        this.posBase = 0;
    }
    
}
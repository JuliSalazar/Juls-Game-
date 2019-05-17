class Logica{

    constructor(app){
        this.app = app;
        //Se crea el lienzo, variables pantalla y arreglos
        this.canvas = this.app.createCanvas(1200, 750);
        this.canvas.parent('sketch');
        this.pantalla = 0;
        this.imgPantalla = [];
        this.vestuario = [];
        this.cejas = [];
        this.elementos = [];
        this.ojos = [];
        this.bocas = [];
        this.cabellos = [];
        this.zapatos = [];
        //Variables o recursos que son imgs u otros
        this.seleccion = null;
        this.botonVestier = false;
        this.boton = this.app.loadImage("./Chibi_Game/Recursos/Boton.png"); 
        this.armario = this.app.loadImage("./Chibi_Game/Recursos/vestier.png");
        this.mascota = new Mascota(this.app,0);
        this.personaje = new Personaje(this.app);
        this.cuerpos = [];
        //Se llena el arreglo cuerpos de las bases del personaje
        for (let i = 0; i < 6; i++) {
            this.cuerpos.push(app.loadImage("./Chibi_Game/Recursos/base" + i + ".png"));;
        }  
        //Se llena el arreglo de las imgs de pantalla con las imgs
        for (let i = 1; i < 4; i++) {
            this.imgPantalla.push(app.loadImage("./Chibi_Game/Recursos/Pantalla" + i + ".jpg"));;
        }
        //Por cada arreglo se llena la cantidad de objetos "elemento" que necesita ej: 2 cejas, 2 clases cejas
        for (let i = 0; i < 2; i++) {
            this.cejas.push(new Ceja(this.app,i));  
        }
        for (let i = 0; i < 4; i++) {
            this.ojos.push(new Ojo(this.app,i));  
        }
        for (let i = 0; i < 3; i++) {
            this.bocas.push(new Boca(this.app,i));  
        }
        for (let i = 0; i < 7; i++) {
            this.cabellos.push(new Cabello(this.app,i));  
        }
        for (let i = 0; i < 6; i++) {
            this.vestuario.push(new Ropa(this.app,i));  
        }
        for (let i = 0; i < 2; i++) {
            this.zapatos.push(new Zapato(this.app,i));  
        }

        }
    pintar(){
        //Switch para cambiar la pantalla
        switch(this.pantalla){
            case 0:
            //Imagen de pantalla 0 y condicion para pasar a pantalla de juego
            if(this.app.mouseX > 677 && this.app.mouseX < 1076 && this.app.mouseY > 471 && this.app.mouseY < 636){                 
                this.app.image(this.boton,663,465);
            }
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                
            break;

            case 1:
            //Imagen de fondo, y se pintan los elementos que estan en los arreglos
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                for(let i = 0; i < 6; i++){
                    this.x = 34;
                    this.app.image(this.cuerpos[i],(this.x + 40 *i),310,36,68);
                }
                for(let i = 0; i < this.cejas.length; i++ ){
                   this.cejas[i].pintar();              
                }   
                for(let i = 0; i < this.ojos.length; i++ ){
                    this.ojos[i].pintar();                                          
                }
                for(let i = 0; i < this.bocas.length; i++ ){
                        this.bocas[i].pintar();       
                }                
                for(let i = 0; i < this.cabellos.length; i++ ){
                    this.cabellos[i].pintar();                                    
                 }
                 //Se pinta el personaje y la mascota
                 this.personaje.pintar();  
                 this.mascota.pintar();   
                //Condicion para pasar al armario que contiene la ropa
                if(this.botonVestier){
                    this.app.image(this.armario, 11, 16);
                    //se llena el contenedor de los elementos ropa y zapatos
                    for(let i = 0; i < this.vestuario.length; i++ ){
                        this.vestuario[i].pintar();                                          
                     }
                     for(let i = 0; i < this.zapatos.length; i++ ){
                        this.zapatos[i].pintar();                                             
                     }                  
                }
                //Condicion para pintar la seleccion y setear las posiciones 
                if(this.seleccion != null){   
                    this.seleccion.pintar();       
                    this.seleccion.setPos(this.app.mouseX, this.app.mouseY);
                } 
            break;
            case 2:
            //Pantalla final de img final, aqui se pone el personaje final con la mascota en el lugar deseado
                this.color1 = this.app.color(120,184,213);
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                this.app.fill(this.color1);
                this.app.rect(166,58,868,605);
                this.personaje.setTam(500,500);
                this.personaje.pintar();
                this.mascota.pintar();
            break;

        }
    }

    clickOprimido(){
        //Condicion para pasar de pantalla
        switch(this.pantalla){
            case 0:
                //Condicion para pasar a pantalla 1
                if(this.app.mouseX > 677 && this.app.mouseX < 1076 && this.app.mouseY > 471 && this.app.mouseY < 636 && this.pantalla == 0){
                    this.pantalla = 1;
                }
            break;
            case 1:
                //Condicion para que se active el armario que tiene la ropa
                if(this.app.mouseX > 858 && this.app.mouseX < 958 && this.app.mouseY > 130 && this.app.mouseY < 223 && this.pantalla == 1){         
                        this.botonVestier = !this.botonVestier              
                }
                //Con este if se valida si se toca el personaje y así se asigna a seleccion en caso de que se quiera mover
                if(this.personaje.validar(this.app.mouseX,this.app.mouseY) && this.pantalla == 1){
                    this.seleccion = this.personaje; 
                }
                //Aquí se activa la parte del armario, se establecen las validaciones para luego seleccionarse y arrastrar
                if(this.botonVestier){
                    for(let i = 0; i < this.vestuario.length; i++ ){ 
                        if(this.vestuario[i].validar(this.app.mouseX,this.app.mouseY)){  
                            this.seleccion = new Ropa(this.app,i);
                        }                    
                    }
                for(let i = 0; i < this.zapatos.length; i++ ){ 
                    if(this.zapatos[i].validar(this.app.mouseX,this.app.mouseY)){  
                        this.seleccion = new Zapato(this.app,i);
                        }                    
                    }
                    //El return evita que se sigan validando las cosas que estan abajo de este
                return;
                }
                //Se valida si se selecciona la mascota
                if(this.mascota.validar(this.app.mouseX,this.app.mouseY)){  
                        this.seleccion = this.mascota;
                } 
                //Para cada elemento se valida para así seleccionarlo y arrastrarlo 
                for(let i = 0; i < this.bocas.length; i++ ){ 
                    if(this.bocas[i].validar(this.app.mouseX,this.app.mouseY)){  
                        this.seleccion = new Boca(this.app,i);
                    }                      
                }
                for(let i = 0; i < this.cejas.length; i++ ){ 
                    if(this.cejas[i].validar(this.app.mouseX,this.app.mouseY)){  
                        this.seleccion = new Ceja(this.app,i);
                    }                      
                }
                for(let i = 0; i < this.ojos.length; i++ ){ 
                    if(this.ojos[i].validar(this.app.mouseX,this.app.mouseY)){  
                        this.seleccion = new Ojo(this.app,i);
                    }                      
                }
                for(let i = 0; i < this.cabellos.length; i++ ){ 
                    if(this.cabellos[i].validar(this.app.mouseX,this.app.mouseY)){  
                        this.seleccion = new Cabello(this.app,i);
                    }                      
                }
                //Variable, for y condicion para cambiar el color base del muñeco
                this.x = 34;
                for(let i = 0; i < 6; i++){
                if(this.app.mouseX > this.x+ 40 *i && this.app.mouseX < 270 && this.app.mouseY > 310 && this.app.mouseY < 379 && this.pantalla == 1){  
                    this.personaje.setPosBase(i);
                    }
                }
                //Este if controla el boton de reiniciar, reinicia el personaje
                if(this.app.mouseX > 1100 && this.app.mouseX < 1179 && this.app.mouseY > 675 && this.app.mouseY < 738){
                    this.personaje.reiniciar();  
                }
                //Aquí se controla el area sensible de la cámara, esto es pantalla 2
                if(this.app.mouseX > 18 && this.app.mouseX <  97   && this.app.mouseY > 676 && this.app.mouseY < 739){
                        this.pantalla = 2;
                }
            break;
            case 2:
                //En caso de querer guardar la img se unde el boton y descarga la img png
              if(this.app.mouseX > 1016 && this.app.mouseX <  1067   && this.app.mouseY > 674 && this.app.mouseY < 726){
                this.app.saveCanvas("Chibi","png");
              }
                //En caso de querer volver a hacer cambios se vuelve a seleccionar la camara
              if(this.app.mouseX > 18 && this.app.mouseX <  97   && this.app.mouseY > 676 && this.app.mouseY < 739){
                this.pantalla = 1;
            }
            break;                
            
           
        } 
    }

    clickSoltado(){
        //Aqui se suelta la seleccion, el personaje valida si lo recibe o no, de ser verdad, recibe y se elimina el elemento, en caso de
        //que no se pone la seleccion nula
         if(this.seleccion != null){
            if(this.personaje.validar(this.app.mouseX, this.app.mouseY)){
                this.personaje.recibir(this.seleccion);
            } else {
                this.seleccion = null;
            }
            this.seleccion = null;
        }

    }
}
class Logica{

    constructor(app){
        this.app = app;
        this.canvas = this.app.createCanvas(1200, 750);
        this.canvas.parent('sketch');
        //Variables para texto
        this.contador=0;
        this.textBox = "";
        this.letra = null;
        this.px = 220;
        this.py = 355;

        //Variables de reloj
        this.imgReloj = this.app.loadImage("./Odisea_Game/Recursos/reloj.png"); 
        this.tiempo = new Cronometro(this);

        //Arreglos
        this.imgPantalla = [];
        this.vidas = [];
        this.aliados = [];
        this.enemigos = [];
        this.botonesHud = [];
        this.poderes = [];
        this.balas = [];
        this.mitadSueloX = 77;
        this.lineasX = [this.mitadSueloX,this.mitadSueloX*3,this.mitadSueloX*5,this.mitadSueloX*7,this.mitadSueloX*9];
        this.agregar = 128;
        this.inicial = 376;
        this.lineasY = [this.inicial, this.inicial+this.agregar, (this.inicial+this.agregar)+this.agregar];

        //Variables
        this.pantalla = 0;
        this.ocupado = false;
        this.seleccion = null;
        this.radio = 60;
        this.contarEnemigos = 1;
        this.error = false;
        this.cantPoderes = 0;

        //Recursos
        this.fuente = this.app.loadFont("./Odisea_Game/Recursos/Raleway-Bold.ttf");
        this.botonJugar = this.app.loadImage("./Odisea_Game/Recursos/Boton.png"); 
        this.botonInstru = this.app.loadImage("./Odisea_Game/Recursos/Boton1.png"); 
        this.btnFeed = this.app.loadImage("./Odisea_Game/Recursos/BotonFeed.png"); 
        for (let i = 0; i < 5; i++) {
            this.imgPantalla.push(app.loadImage("./Odisea_Game/Recursos/pantalla" + i + ".jpg"));
        }
        for (let i = 0; i < 3; i++) {
            this.vidas.push(new Vida(this.app,666+(75*i)));
        }
        for (let i = 4; i > 0 ; i--) {
            this.botonesHud.push(new BotonHud (this.app,(i*150)-100,i));
        }
        
    }
    intervalo() {
        this.crearEnemigos = this.crearEnemigos.bind(this);
        setInterval(this.crearEnemigos,5000);

        this.crearPoder = this.crearPoder.bind(this);
        setInterval(this.crearPoder,20000);
    }
    pararIntervalo(){
        clearInterval(this.crearEnemigos);
    }
    pintar(){
        switch(this.pantalla){
            //Pantalla Inicial
            case 0:
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                if(this.app.mouseX > 502 && this.app.mouseX < 697 && this.app.mouseY > 458 && this.app.mouseY < 545){                 
                    this.app.image(this.btnFeed,475,431);
                }
                if(this.app.mouseX > 475 && this.app.mouseX < 722 && this.app.mouseY > 551 && this.app.mouseY < 690){                 
                    this.app.image(this.btnFeed,475,551);
                }
                this.app.image(this.botonJugar,502,458);
                this.app.image(this.botonInstru,502,579);
                
            break;
            //Pantalla Instrucciones
            case 1:
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
            break;
            //Pantalla previa al juego ingresar nombre de usuario
            case 2:
                this.app.textFont(this.fuente);
                this.app.textSize(50);
                this.app.fill(0);
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                this.app.text(this.textBox, this.px, this.py);
                this.app.fill(250,45,40);
                if(this.error){
                    this.app.textSize(25);
                    this.app.text("Introduce tu nombre", 220, 435);
                }
                this.app.noFill();
            break;
            // Pantalla de Juego
            case 3:
                this.app.textFont(this.fuente);
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                this.app.image(this.imgReloj, 924, 23);
                this.app.textSize(60);
                this.app.fill(255);
                this.app.text(this.tiempo.mostrarTiempo(), 1019, 80);
                
                for (let i = 0; i < 3; i++) {
                        if(this.vidas[i] != null){
                        this.vidas[i].pintar();
                    }
                }

                

                for (let i = 0; i < 4; i++) {
                   this.botonesHud[i].pintar();
                }
                this.posicionamiento();
            
                if(this.aliados != null){
                    for (let i = 0; i < this.aliados.length; i++) {
                        this.aliados[i].pintar();
                     }
                    }
                if(this.enemigos != null){
                for (let i = 0; i < this.enemigos.length; i++) {
                    if(this.enemigos[i] != null){
                    this.enemigos[i].pintar();
                    this.enemigos[i].mover();
                    }
                 }
                }

                

                for (let i = 0; i < this.enemigos.length; i++) {
                    const enemigo = this.enemigos[i];
                    if(enemigo.getX() <= 0){
                        this.enemigos.splice(i,1);
                        this.vidas.splice(0, 1);
                    }  
                    if(this.vidas [0] == null){
                        this.tiempo.parar();
                        this.pantalla = 4;
                        this.pararIntervalo();
                    }
                }
                this.app.textSize(30);
                this.app.fill(255);
                this.app.text("x" + this.cantPoderes, 505, 100);

                if(this.poderes != null){
                    for (let i = 0; i < this.poderes.length; i++) {
                        if(this.poderes[i] != null){
                            const poder = this.poderes[i];
                        poder.pintar();
                        poder.mover();
                        if(poder.getY() >= 740){
                            this.poderes.splice(poder,1);
                        }
                        }
                     }
                    }
                    
                if(this.seleccion != null){   
                    this.seleccion.pintar();       
                    this.seleccion.setPos(this.app.mouseX, this.app.mouseY);
                }
            break;
            case 4:
                this.app.image(this.imgPantalla[this.pantalla], 0, 0);
                this.app.textSize(40);
                this.app.fill(0);
                this.app.text(this.letra,220,400);
                this.app.text(this.tiempo.mostrarTiempo(), 800,400);
                this.app.noFill();
            break;
        }
    }

    posicionamiento(){

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                if(this.app.mouseX > this.lineasX[i]-159/2 && this.app.mouseX < this.lineasX[i]+159/2 &&
                    this.app.mouseY > this.lineasY[j]-134/2 && this.app.mouseY < this.lineasY[j]+134/2 && this.seleccion!=null){ 
                        switch (this.seleccion.getTipo()) {
                            case 3:
                            this.seleccion.setPos(this.lineasX[i], this.lineasY[j]-50);
                            this.seleccion.setPuesto(true);
                                break;
                        
                            default:
                            this.seleccion.setPos(this.lineasX[i], this.lineasY[j]);
                            this.seleccion.setPuesto(true);
                                break;
                        }      
               }               
            }               
          }
    }
    crearEnemigos(){
        this.i = Math.floor(this.app.random(1,4));
                this.enemigos.push(new Enemigo (this.app, this.i ,this));         

    }
    crearPoder(){
        this.poderes.push(new PowerUp (this.app));  
    }
    //Clicks
    clickOprimido(){
        switch(this.pantalla){
            //PANTALLA INICIAL
            case 0:
                //Condicion para pasar a pantalla previa al juego
                if(this.app.mouseX > 502 && this.app.mouseX < 697 && this.app.mouseY > 458 && this.app.mouseY < 545){                 
                    this.pantalla=2;
                }
                //Condicion para pasar a pantalla de instrucciones
                if(this.app.mouseX > 502 && this.app.mouseX < 598 && this.app.mouseY > 579 && this.app.mouseY < 664){              
                    this.pantalla=1;
                }
            break;
            //PANTALLA DE INSTRUCCIONES
            case 1:
                //Condicion para pasar a pantalla previa al juego
                if(this.app.mouseX > 904 && this.app.mouseX < 1141 && this.app.mouseY > 350 && this.app.mouseY < 426){                 
                    this.pantalla=2;
                }
            break;
            //PANTALLA PREVIA AL JUEGO
            case 2:
                //Condicion para pasar a pantalla de juego
                if(this.app.mouseX > 499 && this.app.mouseX < 694 && this.app.mouseY > 485 && this.app.mouseY < 572 ){ 
                    if(this.textBox != ""){
                    this.pantalla=3;
                    this.letra = this.textBox;
                    this.tiempo.inicio();
                    this.intervalo();
                    this.error = false;
                    } 
                    this.error = true; 
                }
                //Condicion para pasar a pantalla de instrucciones
                if(this.app.mouseX > 20 && this.app.mouseX < 362 && this.app.mouseY > 604 && this.app.mouseY < 674){                 
                    this.pantalla=1;
                }
            break;
            //PANTALLA DE JUEGO
            case 3:  
                      
                
                //Condicion para tomar una maquina tipo 3
                if(this.botonesHud[3].validar(this.app.mouseX,this.app.mouseY)){                 
                    this.seleccion = new Aliado(this.app,3,this);
                 }
                //Condicion para tomar una maquina tipo 2
                 if(this.botonesHud[2].validar(this.app.mouseX,this.app.mouseY)){                 
                    this.seleccion = new Aliado(this.app,2,this);
                 }
                //Condicion para tomar una maquina tipo 2
                if(this.botonesHud[1].validar(this.app.mouseX,this.app.mouseY)){                 
                    this.seleccion = new Aliado(this.app,1,this);
                 }
                 if(this.poderes.length != 0){
                 for (let i = 0; i < this.poderes.length; i++) {
                    if(this.poderes[i] != null){
                    const poder = this.poderes[i];
                    if(poder.validar(this.app.mouseX,this.app.mouseY)){
                        this.cantPoderes += 1;
                        this.poderes.splice(i,1);
                        }
                    }
                    }
                }
                //Condicion para tomar una maquina tipo 3
                if(this.poderes != null && this.botonesHud[0].validar(this.app.mouseX,this.app.mouseY) ){ 
                    if(this.poderes.length != 0){
                    for (let i = 0; i < this.poderes.length; i++) {
                        if(this.poderes[i] != null){

                            this.seleccion = this.poderes[i];
                        }                
                    }
                }
                }   
                
                
            break;
            case 4:
                 this.reiniciar();
            break;
        }
    }
    clickSoltado(){
        if(this.seleccion != null){
            this.seleccion.setPos(this.app.mouseX, this.app.mouseY);
        }   
                if(this.seleccion != null && this.seleccion.getPuesto() == true){
                    this.posicionamiento();
                    this.aliados.push(this.seleccion);
                   this.seleccion.setPuesto(!this.seleccion.getPuesto());
                    
                }
                if(this.seleccion != null && this.seleccion.getPuesto() == false){
                    this.seleccion = null;

                }            
                this.seleccion = null;    
    }
    reiniciar() {
         //Variables para texto
         this.contador=0;
         this.textBox = "";
         this.letra = null;
         this.error = false;

        this.contarEnemigos = 0;
        this.pantalla = 0;
        this.vidas = [];
        for (let i = 0; i < 3; i++) {
            this.vidas.push(new Vida(this.app,666+(75*i)));
        }
        this.aliados = [];
        this.enemigos = [];
        this.tiempo = new Cronometro();  
        this.intervalo(); 
    }
    //Metodos de texto
    texto() {
        this.error = false;
        this.textBox += this.app.key;
      
      }
    eliminar() {
        if (this.app.keyCode == this.app.BACKSPACE) {
          this.contador-=1;
          this.textBox = this.textBox.slice(0, -1);
        }
    
      this.contador+=1;
    
    if (this.app.keyCode==this.app.ENTER){
        
      this.textBox=this.textBox+"\n";
      this.contador=0;
    
    }
      if(this.contador==36 &&
         this.app.keyCode != this.app.BACKSPACE && 
         this.app.keyCode !=this.app.ENTER){

        this.contador=0;
      }
      }
}

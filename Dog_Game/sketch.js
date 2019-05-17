//Objetos recogibles
let alimentos;
let huesosArray;
let chalecos;
let carnes;
// Animacion de Perro y sus variables para movimiento
let perroAnimated;
var salto;
let saltando;
var gravedad;
// Variables para vida
let vidas;
let arrayVida;
let imageVida;
let colisiona;
let contadorColisiona;
//Variables para obstaculos o colisionadores
let meta;
let obstaculos;
var plataforma;
var plataformaImg;
// Arreglo para pantalla y fondos, XImg para mover el fondo
let pantalla;
let xImg;
// Variables para imagenes
let comida;
let powerUp;
let hueso;
let feedPunt;
let imgPunt;
// Dar tiempo de poder
let tiempoPower;
// Tipografía
let fuente;
//Variables contadoras
let puntaje;
let comidas;
let total;
let huesos;
let powerUps;
//Variables de cronometro
let tiempo;
let reloj; // imagen de reloj
// Var cambiar pantalla
let numPantalla;
// Cargar fuente
function preload() {
    fuente = loadFont('./Dog_Game/Recursos/tipo.ttf')
}

function setup() {
    const canvas = createCanvas(1200, 700);
    canvas.parent('sketch');
    // Crear piso con el cual colisionar, añadir animacion
    plataformaImg = createSprite(0, 670);
    plataformaImg.addAnimation('normal', './Dog_Game/Recursos/plataforma.png', './Dog_Game/Recursos/plataforma.png');
    plataformaImg.setCollider("rectangle", 0, -30, 1200, 130); // Manejo del area sensible
    //plataformaImg.debug = true; // Con esto puedo ver el area sensible del colisionador

    //Definir perroAnimated como clase Perro para usar las posiciones, añadir animacion y colisionador
    perroAnimated = new Perro(200, 490);
    perroAnimated = createSprite(perroAnimated.posX, perroAnimated.posY);
    perroAnimated.setCollider('rectangle', 0, 0, 150, 155);
    //perroAnimated.debug = true;

    //Definir pantalla como arreglo y agregar imagenes
    pantalla = [];
    for (let i = 1; i <= 3; i++) {
        pantalla.push(loadImage("./Dog_Game/Recursos/pantalla" + i + ".png"));
    }
    // Tiempo se maneja con una clase diferente para funcionar como cronometro
    tiempo = new Cronometro();

    //Definir vidas como arreglo de clases y agregar imagenes
    vidas = [];
    vidas.push(new Vida(10, 10));
    vidas.push(new Vida(87, 10));
    vidas.push(new Vida(164, 10));
    //variables para la colision y eliminacion de vidas
    colisiona = false;
    contadorColisiona = 0;
    arrayVida = [1, 1, 1];
    alimentos = new Group();
    // Booleano para saber si está activo el poder
    feedPunt = false;

    //Agregar animacion e imagenes de perro
    dibujarPerro();

    //Definir variables que son solo una imagen
    fondo = loadImage("./Dog_Game/Recursos/fondo-03.png");
    imageVida = loadImage("./Dog_Game/Recursos/Corazon.png");
    reloj = loadImage("./Dog_Game/Recursos/reloj.png");
    comida = loadImage("./Dog_Game/Recursos/comida6.png");
    powerUp = loadImage("./Dog_Game/Recursos/PowerUp.png");
    hueso = loadImage("./Dog_Game/Recursos/hueso1.png");
    imgPunt = loadImage("./Dog_Game/Recursos/feedPunt.png");

    // Inicializar variables contadoras
    xImg = 0;
    puntaje = 0;
    tiempoPower = 0;
    comidas = 0;
    huesos = 0;
    powerUps = 0;
    total = 0;

    //Definir variable para cambiar pantalla
    numPantalla = 0;
    //Agregar animacioes de objetos y un intervalo, que se dibujen cada cierto tiempo
    intervalo();
    dibujarAlimento();
    dibujarObstaculos();
    dibujarHuesos();
    dibujarPowerUps();
    dibujarMeta();
}
// Dibujar cada cierto tiempo
function intervalo() {
    setInterval(function () { dibujarAlimento() }, 9000);
    setInterval(function () { dibujarObstaculos() }, 53000);
}

function draw() {
    // Switch para cambiar la pantalla
    switch (numPantalla) {
        //Pantalla de inicio
        case 0:
            image(pantalla[numPantalla], 0, 0);
            break;
        case 1:
            //Como jugar
            image(pantalla[numPantalla], 0, 0);
            break;
        case 2:
            //Pantalla resumen
            image(pantalla[numPantalla], 0, 0);
            textFont(fuente);
            textSize(40);
            fill(255);
            // Texto que varía segun su variable
            total = (puntaje + 100 + (powerUps * 10));
            text("" + huesos, 255, 385);
            text("" + comidas, 255, 280);
            text("" + total, 663, 510);
            text("" + puntaje, 267, 510);
            tiempo.parar();
            text("" + tiempo.mostrarTiempo(), 643, 333);
            break;
        //Pantalla de juego
        case 3:
        //Bucle de imagen del fondo
            image(fondo, xImg, 0);
            xImg-=2;
            if (xImg <= (2600 - 200) * -1) {
                xImg = 0;
                image(fondo, xImg, 0);
                xImg-=2;
            }
            textFont(fuente);
            textSize(40);
            fill(255);
            // Poner feedback de poder de doble puntaje
            if (feedPunt) {
                image(imgPunt, 0, 620);
                puntaje++;
                tiempoPower++;
                if (tiempoPower == 100) {
                    feedPunt = false
                    tiempoPower = 0;
                }
            }
            text("Puntaje: " + puntaje, 10, 675);
            text(": " + tiempo.mostrarTiempo(), 1080, 677);
            image(reloj, 1010, 627);
            image(powerUp, 977, 5);
            text("* " + powerUps, 1060, 55);
            image(hueso, 503, 17);
            text("* " + huesos, 610, 55);
            image(comida, 750, 8);
            text("* " + comidas, 835, 55);
            //Condiciones para ir a pantalla de resumen
            if (arrayVida[0] == null || tiempo.mostrarMin() >= 1 || perroAnimated.collide(meta)) {
                //Esperar un tiempo antes de cambiar de pantalla
                setTimeout(function () {
                    numPantalla = 2;
                    tiempo.parar();
                }, 2000);
            }
            dibujarVida();
            break;
    }
    //pantalla de juego y funciones
    if (numPantalla == 3) {
        //Colision entre objetos y el perro
        perroAnimated.overlap(alimentos, Coleccionar);
        perroAnimated.overlap(huesosGroup, ColeccionHueso);
        perroAnimated.overlap(chalecos, DarPoder);
        perroAnimated.overlap(carnes, DarPoder);
        //Colision entre obstaculos y el perro
        if (perroAnimated.collide(obstaculos1)) {
            colisiona = true;
            perroAnimated.position.x = 215;
            setTimeout(function () {
                perroAnimated.position.x = 200;
            }, 500);
            contadorColisiona++;
        }
        if (perroAnimated.collide(obstaculos2)) {
            colisiona = true;
            perroAnimated.position.x = 215;
            setTimeout(function () {
                perroAnimated.position.x = 200;
            }, 500);
            contadorColisiona++;
        }
        //Condicion para perder vida
        if (colisiona == true && contadorColisiona == 1) {
            colisiona = false;
            arrayVida.splice(0, 1);
            setTimeout(function () {
                contadorColisiona = 0;
            }, 3000);
        }
        //Aplicar gravedad
        perroAnimated.velocity.y += gravedad;
        //Chocar con suelo para parar 
        if (perroAnimated.collide(plataformaImg)) {
            perroAnimated.velocity.y = 0;
            perroAnimated.changeAnimation('normal');
        }
        //Movimiento Saltar
        if (keyWentDown(UP_ARROW)) {
            saltando = true;
            perroAnimated.changeAnimation('saltar');
            perroAnimated.animation.rewind();
            if (perroAnimated.position.y >= 350) {
                perroAnimated.velocity.y = -salto;
            }
        }
        //Movimiento agachar      
        if (keyIsDown(DOWN_ARROW)) {
            perroAnimated.changeAnimation('agachar');
            saltando = false;
            perroAnimated.position.y = 550;

        }
        if (keyWentUp(DOWN_ARROW)) {
            saltando = false;
            perroAnimated.changeAnimation('normal');
            perroAnimated.position.y = 500;
        }
        //Dibujar Animaciones p5.play
        drawSprites();
    }
}
//Eventos del mouse al hacer click en los botones
function mousePressed() {
    //boton Jugar 
    if (mouseX > 862 && mouseX < 1091 && mouseY > 275 && mouseY < 414 && numPantalla == 0) {
        tiempo.inicio();
        //console.log(tiempo.mostrarTiempo());
        numPantalla = 3;
    }
    //boton intrucciones
    if (mouseX > 862 && mouseX < 1091 && mouseY > 443 && mouseY < 582 && numPantalla == 0) {
        numPantalla = 1;
    }
    //Pasar  Jugar despues de instrucciones
    if (mouseX > 1007 && mouseX < 1156 && mouseY > 614 && mouseY < 692 && numPantalla == 1) {
        tiempo.inicio();
        //console.log(tiempo.mostrarTiempo());
        numPantalla = 3;
    }
    //Boton reiniciar
    if (mouseX > 280 && mouseX < 480 && mouseY > 605 && mouseY < 671 && numPantalla == 2) {
        numPantalla = 0;
        Reiniciar();
    }
}
//Funcion coleccionar comidas
function Coleccionar(collector, collected) {
    collected.remove();
    comidas += 1;
    puntaje += 1;
}
//Funcion coleccionar huesos
function ColeccionHueso(collector, collected) {
    collected.remove();
    huesos += 1;
    feedPunt = true;
}
//Funcion coleccionar PowerUps
function DarPoder(collector, collected) {
    collected.remove();
    perroAnimated.changeAnimation('poderoso');
    powerUps += 1;
}
//Funcion para dibujar el perro
function dibujarPerro() {
    perroAnimated.addAnimation('normal', './Dog_Game/Recursos/Perro1.png', './Dog_Game/Recursos/Perro2.png', './Dog_Game/Recursos/Perro3.png', './Dog_Game/Recursos/Perro4.png');
    perroAnimated.addAnimation('saltar', './Dog_Game/Recursos/Perro4.png');
    perroAnimated.addAnimation('agachar', './Dog_Game/Recursos/Perro2.png');
    perroAnimated.addAnimation('poderoso', './Dog_Game/Recursos/PerroR1.png', './Dog_Game/Recursos/PerroR2.png', './Dog_Game/Recursos/PerroR3.png', './Dog_Game/Recursos/PerroR4.png');
    //Propiedades
    salto = 10;
    saltando = false;
    gravedad = 0.25;
}
//Funcion para dibujar las vidas
function dibujarVida() {
    //Condiciones para que se dibujen o no
    if (arrayVida[0] == 1) {
        image(imageVida, vidas[0].posX, vidas[0].posY);
    }
    if (arrayVida[1] == 1) {
        image(imageVida, vidas[1].posX, vidas[1].posY);
    }
    if (arrayVida[2] == 1) {
        image(imageVida, vidas[2].posX, vidas[2].posY);
    }
}
//Funciones para dibujar los objetos y reiniciar
function dibujarAlimento() {
    //Alimentos es un grupo (parecido a arreglo), esto para poder realizar la colision entre el perro y objetos
    
    //Arreglo para mantener posiciones de alimentos 
    let posObjX = [1100, 1200, 1300, 1400, 1500];
    let posObjY = [500, 400, 300, 400, 500];
    // Crear alimentos
    for (var i = 0; i < posObjX.length; i++) {
        let alimento = createSprite(posObjX[i], posObjY[i]);
        //Imagenes random de alimentos
        let imgAlimentos = Math.floor(random(1, 6));
        alimento.addAnimation('comida', './Dog_Game/Recursos/comida' + imgAlimentos + '.png');
        //Se pone un colisionador para validar 
        alimento.setCollider('circle', 0, 0, 30);
        //alimento.debug = true;
        alimentos.add(alimento);
        alimento.velocity.x = -3;
    }
}
function dibujarObstaculos() {
    //Obstaculos tipo saltar
    obstaculos1 = new Group();
    //Obstaculos tipo agacharse
    obstaculos2 = new Group();
    let posObjX = [1100, 2200, 3300];
    let posObjX2 = [5100, 6200, 7300];
    for (var i = 0; i < 5; i++) {
        let obsta1 = createSprite(posObjX[i], 590);
        obsta1.addAnimation('Saltar', './Dog_Game/Recursos/Obstaculo3.png');
        obsta1.setCollider('rectangle', 0, 0, 120, 62);
        //obsta1.debug = true;
        obstaculos1.add(obsta1);
        obsta1.velocity.x = -3;
    }
    for (var i = 0; i < 5; i++) {
        let obsta2 = createSprite(posObjX2[i], 265);
        obsta2.addAnimation('Agachar', './Dog_Game/Recursos/Obstaculo2.png');
        obsta2.setCollider('rectangle', 0, 130, 180, 100);
        //obsta2.debug = true;
        obstaculos2.add(obsta2);
        obsta2.velocity.x = -3;
    }
}
function dibujarHuesos() {
    huesosGroup = new Group();
    for (var i = 0; i < 4; i++) {
        let hueso = createSprite(random(1300, 8000), 500);
        hueso.addAnimation('comida', './Dog_Game/Recursos/Hueso.png');
        hueso.setCollider('rectangle', 0, 0, 100, 20);
        //hueso.debug = true;
        huesosGroup.add(hueso);
        hueso.velocity.x = -3;
    }
}
function dibujarPowerUps() {
    //Power UP tipo CHALECO
    chalecos = new Group();
    //Power Up tipo CARNES
    carnes = new Group();
    //Crear Chalecos y carnes con colisionador
    for (var i = 0; i < 2; i++) {
        let chaleco = createSprite(random(1500, 15000), random(150, 500));
        chaleco.addAnimation('Chaleco', './Dog_Game/Recursos/Chaleco.png');
        chaleco.setCollider('rectangle', 0, 0, 70, 62);
        //chaleco.debug = true;
        chalecos.add(chaleco);
        chaleco.velocity.x = -3;
    }
    for (var i = 0; i < 3; i++) {
        let carne = createSprite(random(2000, 10000), random(150, 500));
        carne.addAnimation('Carne', './Dog_Game/Recursos/Carnes.png');
        carne.setCollider('rectangle', 0, 0, 70, 100);
        //carne.debug = true;
        carnes.add(carne);
        carne.velocity.x = -3;
    }
}
function dibujarMeta() {
    meta = createSprite(11800, 466);
    meta.addAnimation('Meta', './Dog_Game/Recursos/Meta.png');
    meta.setCollider('rectangle', 0, 0, 264, 311);
    //meta.debug = true;
    meta.velocity.x = -3;
}
function Reiniciar() {
    createCanvas(1200, 700);
    puntaje = 0;
    comidas = 0;
    huesos = 0;
    powerUps = 0;
    arrayVida=[1,1,1];
    tiempo = new Cronometro();   
    drawSprites();
}









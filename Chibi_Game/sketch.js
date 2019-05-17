new p5(function(app){
    var logica;

    app.setup = function() {
        logica = new Logica(app);
    }
    
    app.draw = function() {
        logica.pintar();
    }

    app.mousePressed = function(){
        logica.clickOprimido();
    }

   app.mouseReleased = function(){
        logica.clickSoltado();
    }

});
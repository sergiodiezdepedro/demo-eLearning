$(document).foundation();
// Guardar el contenedor principal en una variable
var c = $('#slider');
// Guardar las secciones del slider
var s = c.find('section');
// Guardar el número de secciones
var n = s.length;
// Crear el contenedor interior que engloble las secciones.
c.wrapInner('<div class="slider-inner" />');
// Guardar el contenedor interno en una variable
var contenedorInterno = $('.slider-inner');
// Definir dinámicamente el ancho del contenedor
// interno en función de las secciones que haya
contenedorInterno.css('width',100*n+'%');
// Definir el ancho de las secciones en función del número que haya
s.css('width',100/n+'%');
// Crear botones de avance y retroceso
c.after('<button id="next">Siguiente</button>');
c.after('<button id="prev">Anterior</button>');
// Guardar los botones en variables
var next = $('#next');
var prev = $('#prev');
// Envolver los botones
next.add(prev).wrapAll('<div id="slider-nav" />');
/*
	Crear la función para navegar entre las secciones
*/
// Índice para movernos entre las secciones
var i = 0;
// Función para moverse
function mover(){
	if(i===0){
		contenedorInterno.css('left',0);
	} else if(i>0){
		contenedorInterno.css('left','-'+100*i+'%');
	}
}
// Hacer que el botón de avance funcione adecuadamente,
// es decir, que deje de avanzar al llegar al último elemento
next.on('click',function(){
    if(i<n-1){
        i++;
        mover();
    }
});
// Hacer lo propio para el botón de retroceso
prev.on('click',function(){
    if(i>0){
        i--;
        mover();
    }
});

// Eventos de teclado. Avanzar y retroceder con teclas
// Flecha derecha(avanzar): 39, Flecha izquierda(retroceder): 37
// 'which' captura la tecla que se pulsa. La estructura switch {case
// case} actúa como un 'if'. 'break' interrumpe la ejecución si se cumple
// lo declarado en case. 'next.trigger('click')' y 'prev.trigger('click')'
// enlazan la presión de la tecla al evento correspondiente a cada botón
$(document).on('keydown',function(e){
    switch(e.which){
        case 39:
            next.trigger('click');
            break;
        case 37:
            prev.trigger('click');
            break;
    }
});

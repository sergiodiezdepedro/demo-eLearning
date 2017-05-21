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


(function() {
  var questions = [{
    question: "¿Cuál es la capital de Paraguay?",
    choices: ["Montevideo", "Asunción", "Lima", "La Paz", "Quito"],
    correctAnswer: 1 //Count starts at '0'
  }, {
    question: "¿Cuál de estos no es un mamífero?",
    choices: ["Manatí", "Orca", "Ornitorrinco", "Lémur", "Ruibarbo"],
    correctAnswer: 4
  }, {
    question: "¿Quién de estos no ha ganado un óscar como director",
    choices: ["Alfred Hitchcock", "John Ford", "James Cameron", "Frank Capra", "Kevin Costner"],
    correctAnswer: 0
  }, {
    question: "¿Cuántas caras tiene un dodecaedro?",
    choices: [10, 6, 14, 12, 16],
    correctAnswer: 3
  }, {
    question: "¿Cuántos jugadores tiene un equipo de béisbol?",
    choices: [11, 10, 9, 15, 6],
    correctAnswer: 2
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#siguiente').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Elige una respuesta');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'anterior' button
  $('#anterior').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.boton-quiz').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.boton-quiz').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h3 class="cabecera-pregunta">Pregunta ' + (index + 1) + '</h3>');
    qElement.append(header);

    var question = $('<p class="texto-pregunta">').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul class="lista-respuestas">');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li class="lista-respuestas__item">');
      input = '<input type="radio" class="radio-quiz" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#anterior').show();
        } else if(questionCounter === 0){

          $('#anterior').hide();
          $('#siguiente').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#siguiente').hide();
        $('#anterior').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('Tienes ' + numCorrect + ' aciertos de ' +
                 questions.length + ' preguntas');
    return score;
  }
})();



function fadeOutFlashcardText(){
  $(".flashcard-text").fadeOut(200);
}

function fadeInFlashcardText(){
  $(".flashcard-text").fadeIn(500);
}

function changeFlashcard(){
  fadeOutFlashcardText();
  div.slideUp(700);
  div.slideDown(700);
  setTimeout(function(){
    fadeInFlashcardText();
  }, 1000);
}

window.onload = function(){
  
  var randomNumber = Math.floor(Math.random()*100)+1;
  var guesses = document.querySelector('.guesses');
  var lastResult = document.querySelector('.lastResult');
  var lowOrHi = document.querySelector('.lowOrHi');

  var guessSubmit = document.querySelector('.guessSubmit');
  var guessField = document.querySelector('.guessField');
	guessField.focus();
	
  function keydown(e){
      if(e.keyCode === 13){
        var obj = document.activeElement;
        console.log(obj);
        obj.nextElementSibling.focus();
      }
    }
    
  guessField.onkeydown = keydown;

  var guessCount = 1;
  var resetButton;

  function checkGuess() {
 
    var userGuess = Number(guessField.value);
    if(guessCount === 1) {
      guesses.textContent = '推測した値: ';
    }
    guesses.textContent += userGuess + ' ';
 
    if(userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! 正解です!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if(guessCount === 10) {
      lastResult.textContent = '!!!GAME OVER!!!';
      setGameOver();
    } else {
      lastResult.textContent = '違うよ!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = '小さすぎる!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = '大きすぎる!';
      }
      guessField.focus();
    }
 
    guessCount++;
    guessField.value = '';
  }
  guessSubmit.addEventListener('click', checkGuess);
  
  function setGameOver() {
	  guessField.disabled = true;
	  guessSubmit.disabled = true;
	  resetButton = document.createElement('button');
	  resetButton.textContent = 'もう一回やる？';
	  document.body.appendChild(resetButton);
	  resetButton.addEventListener('click', resetGame);
    resetButton.focus();
  }
  
  function resetGame() {
	  guessCount = 1;
	
	  var resetParas = document.querySelectorAll('.resultParas p');
	  for(var i = 0; i < resetParas.length; i++) {
		  resetParas[i].textContent = '';
	  }
	  resetButton.parentNode.removeChild(resetButton);
	
	  guessField.disabled = false;
	  guessSubmit.disabled = false;
	  guessField.value = '';
	  guessField.focus();
	
	  lastResult.style.backgroundColor = 'white';
	
	  randomNumber = Math.floor(Math.random()*100)+1;
	  console.log(randomNumber);
  }
}

questionApp();
document.getElementById("header").className = "appear";
document.getElementById("price").className = "appear";
function questionApp() {
	var total = 0;
  var score = 0;
  var currentQuestion = 1;
  var questionCount = Questions.question.length;
  var wrapper = document.getElementById("wrapper");

  
  function checkAnswer(question, userAnswer, button) {
    var correctAnswer = question.correct;
		var difference = Math.abs(correctAnswer - userAnswer);
    if(difference <= 5) {
      score = 20;
			total += score;
    } 
    else if(difference > 5 && difference <= 10) {
      score = 10;
			total += score;
    } 
    else if(difference > 10 && difference <= 20) {
      score = 5;
			total += score;
    } 
    else {
      score = 0;
			total += score;
    } 
    
    button.setAttribute("disabled", "disabled"); 
    if (currentQuestion === questionCount) {
			roundScore(correctAnswer);
      finalScore();
    } 
		else {
			roundScore(correctAnswer);
      var qDiv = wrapper.lastChild;
      qDiv.className = "disappear";
      currentQuestion++;
      generateQuestion();
    }
  }
  
  function roundScore(correctPrice) {
    var roundScore = document.createElement("div");
    var roundScoreText = document.createElement("h1");
    wrapper.appendChild(roundScore);
    roundScore.appendChild(roundScoreText);
    roundScore.setAttribute("id","rscore");
    roundScore.className = "appear";
    roundScoreText.innerHTML = "Item Price: $" + correctPrice + "<br>" +  "You earned " + score + " points!";
		roundScore.className = "disappear";
	}
	
  function finalScore() {
    var finalScore = document.createElement("div");
    var finalScoreText = document.createElement("h1");
    wrapper.appendChild(finalScore);
    finalScore.appendChild(finalScoreText);
    finalScore.setAttribute("id","score");
    finalScore.className = "appear";
    finalScoreText.innerHTML = "You earned " + total + " points total!";
    
    var resetButton = document.createElement("button");
    finalScore.appendChild(resetButton);
    var resetLabel = document.createTextNode("Continue");
    resetButton.appendChild(resetLabel);
    resetButton.setAttribute("id","reset")
    resetButton.addEventListener('click', function(){
			location.href = "";
		}, false);
  }
  
  function reset() {
    while(wrapper.lastChild && wrapper.lastChild.tagName === "DIV") {
      wrapper.removeChild(wrapper.lastChild);
    }
		
	    questionApp();
  }
	
	function showValue(newValue) {
		document.getElementById('priceGuess').value = newValue;
	}
  
  function generateQuestion() {
    var selectedQuestion = Questions.question[currentQuestion-1];

		document.getElementById('description').innerHTML = "<h1>" + selectedQuestion.itemName + "</h1><p>" + selectedQuestion.description + "</p></div>";
    var questionDiv = document.createElement("div");

    var priceGuess = document.createElement("input");
		priceGuess.setAttribute("type", "range");
		priceGuess.setAttribute("id", "priceSlider");
		priceGuess.setAttribute("min", "0");
		priceGuess.setAttribute("max", "50");
		priceGuess.setAttribute("value", "10");
		priceGuess.setAttribute("step", "5");
		priceGuess.setAttribute("onchange", "showValue(this.value)");
    
    wrapper.appendChild(questionDiv);
		questionDiv.appendChild(priceGuess);

    var image1 = document.getElementById('productImage1');
		image1.setAttribute('src', "img/game/" + selectedQuestion.question + "1.png");

    var button = document.createElement("button");
    questionDiv.appendChild(button);
    var label = document.createTextNode(" Guess");
		var icon = document.createElement("i");
		icon.setAttribute("class", "fa fa-money");
		icon.setAttribute("aria-hidden", "true");
		icon.appendChild(label);
    button.appendChild(icon);
    button.setAttribute("id", "button" + currentQuestion);
		
		var modal = document.getElementById('productInfo');
		var span = document.getElementsByClassName("close")[0];


    questionDiv.className = "appear";
		document.getElementById("price").className = "appear";
		document.getElementById("preview").className = "appear";
		document.getElementById("description").className = "appear";
		document.getElementById("price").style.display = '';
		document.getElementById("preview").style.display = '';
		document.getElementById("description").style.display = '';
        
    var currentButton = document.getElementById("button" + currentQuestion);
		var radios = document.getElementsByName('price');
		
    button.addEventListener('click', function(){
			checkAnswer(selectedQuestion, priceGuess.value, currentButton);
			}, false);
			document.getElementById("range").innerHTML="10";
  	}
  
  generateQuestion();
  
  
}


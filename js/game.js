document.getElementById("preview").style.display = 'none';
document.getElementById('description').style.display = 'none';

function questionApp() {
  var score = 0;
  var currentQuestion = 1;
  var questionCount = Questions.question.length;
  var wrapper = document.getElementById("wrapper");
  var start = document.getElementById("start");
  start.setAttribute("disabled","disabled");

  
  function checkAnswer(question, userAnswer, button) {
    var answer = userAnswer.split("").splice(6, 2).join("");
    var priceGuess = answer * 10;
    var correctAnswer = question.correct;
		var difference = Math.abs(correctAnswer - priceGuess);
    if(difference <= 5) {
      score += 20;
    } 
    else if(difference > 5 && difference <= 10) {
      score += 10;
    } 
    else if(difference > 10 && difference <= 20) {
      score += 5;
    } 
    else {
      score += 0;
    } 
    
    button.setAttribute("disabled", "disabled"); 
    if (currentQuestion === questionCount) {
      finalScore();
    } 
		else {
      var qDiv = wrapper.lastChild;
      qDiv.className = "disappear";
      currentQuestion++;
      generateQuestion();
    }
  }
  
  function finalScore() {
    var finalScore = document.createElement("div");
    var finalScoreText = document.createElement("h1");
    wrapper.appendChild(finalScore);
    finalScore.appendChild(finalScoreText);
    finalScore.setAttribute("id","score");
    finalScore.className = "appear";
    finalScoreText.innerHTML = "You earned " + score + " points!";
    
    var resetButton = document.createElement("button");
    finalScore.appendChild(resetButton);
    var resetLabel = document.createTextNode("Try again");
    resetButton.appendChild(resetLabel);
    resetButton.setAttribute("id","reset")
    resetButton.addEventListener('click', function(){reset();}, false);
  }
  
  function reset() {
    while(wrapper.lastChild && wrapper.lastChild.tagName === "DIV") {
      wrapper.removeChild(wrapper.lastChild);
    }
		
	    questionApp();
  }
	
	function showValue(newValue) {
		document.getElementById("priceGuess").value = newValue;
		document.getElementById("sliderValue").innerHTML = newValue;
	}
  
  function generateQuestion() {
    var selectedQuestion = Questions.question[currentQuestion-1];

		document.getElementById('description').innerHTML = "<h1>" + selectedQuestion.question + "</h1><p>" + selectedQuestion.description + "</p></div>";
    var questionDiv = document.createElement("div");
		var slider = document.createElement("div");
		slider.innerHTML = "<div class='sliderthumb id='sliderthumb1'></div>";
    var priceGuess = document.createElement("input");
		priceGuess.setAttribute("type", "range");
		priceGuess.setAttribute("min", "0");
		priceGuess.setAttribute("max", "50");
		priceGuess.setAttribute("value", "10");
		priceGuess.setAttribute("step", "5");
		priceGuess.setAttribute("oninput", "showValue(this.value)");
		
		var sliderValue = document.createElement("span");
		priceGuess.appendChild(sliderValue);
    
    wrapper.appendChild(questionDiv);
		questionDiv.appendChild(slider);
		slider.appendChild(priceGuess);
    questionDiv.appendChild(priceGuess);
    var image1 = document.getElementById('productImage1');
		image1.setAttribute('src', "img/game/" + selectedQuestion.question + "1.jpg");
    var image2 = document.getElementById('productImage2');
		image2.setAttribute('src', "img/game/" + selectedQuestion.question + "2.jpg");
    var image3 = document.getElementById('productImage3');
		image3.setAttribute('src', "img/game/" + selectedQuestion.question + "3.jpg");	
    
    var button = document.createElement("button");
    questionDiv.appendChild(button);
    var label = document.createTextNode("Input answer!");
    button.appendChild(label);
    button.setAttribute("id", "button" + currentQuestion);
		
		var modal = document.getElementById('productInfo');
		var span = document.getElementsByClassName("close")[0];

    questionDiv.className = "appear";
		document.getElementById("preview").className = "appear";
		document.getElementById("description").className = "appear";
		document.getElementById("preview").style.display = '';
		document.getElementById("description").style.display = '';
        
    var currentButton = document.getElementById("button" + currentQuestion);
		var radios = document.getElementsByName('price');
		
    button.addEventListener('click', function(){
			checkAnswer(selectedQuestion, priceGuess.value, currentButton);
			}, false);
  	}
  
  generateQuestion();
  
  
}

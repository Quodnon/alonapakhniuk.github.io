function compareRandom() {
  return Math.random() - 0.5;
}

function ClickButtonAdd(item) {
	if (item.tagName == 'BUTTON') {
    	var newBtnResult = document.createElement('button');
		newBtnResult.innerHTML = item.innerHTML;
		result.appendChild(newBtnResult);
		answer.removeChild(item);
		resultAnswerArray.push(item.innerHTML);
	}
}

function ClickButtonRemove(item) {
	// console.log(result.children.length);
	if (item.tagName == 'BUTTON') {
    	var newBtnResult = document.createElement('button');
		newBtnResult.innerHTML = item.innerHTML;
		answer.appendChild(newBtnResult);
		result.removeChild(item);
		resultAnswerArray = [];
		for (var i = 0; i < result.children.length; i++){
			resultAnswerArray[i] = result.children[i].innerHTML;
		}
		
	}
}

var correctAnswer = document.getElementById('correct-answer');
var totalAnswer = document.getElementById('total-answer');
var question = document.getElementById('question');
var questionId = document.getElementById('question-id');
var category = document.getElementById('category');
var skipBtn = document.getElementById('skip-btn');
var nextBtn = document.getElementById('next-btn');
var result = document.getElementById('result-letters');
var answer = document.getElementById('letters-box');
var successMessage = document.getElementById('success-message');
var errorMessage = document.getElementById('error-message');
var resultAnswerArray = [];
var counterTrueAnswer = 0;
var counterAllAnswer = 0;
var totalFunctionsCreated =0;


var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var arrayObj = JSON.parse(this.responseText);
	  	var answerArray = arrayObj[0].answer.split('');

		question.innerHTML = arrayObj[0].question;
		questionId.innerHTML = arrayObj[0].id;
		category.innerHTML = arrayObj[0].category.title;
		console.log(arrayObj[0].answer);

		answerArray.sort(compareRandom).forEach( function (item, i, array){
			var newBtnAnswer = document.createElement('button');
			newBtnAnswer.innerHTML = item;
			answer.appendChild(newBtnAnswer);
		});
		
		resultAnswerArray = [];
	    	totalFunctionsCreated++;
		answer.onclick = function(){
			var target = event.target;
			ClickButtonAdd(target);
			if (answer.children.length === 0 && resultAnswerArray.join('') === arrayObj[0].answer) {
				successMessage.style.display = 'block';
				nextBtn.style.display = 'block';
			} else if( answer.children.length === 0 && resultAnswerArray.join('') !== arrayObj[0].answer ){
				errorMessage.style.display = 'block';
			}
		};

	    	totalFunctionsCreated++;
		result.onclick = function(){
			var target = event.target;
			ClickButtonRemove(target);
			if ( answer.children.length !== arrayObj[0].answer.length ) {
				successMessage.style.display = 'none';
				nextBtn.style.display = 'none';
				errorMessage.style.display = 'none';
			}
		};
		totalFunctionsCreated++
		nextBtn.onclick = function(){
			if ( resultAnswerArray.join('') === arrayObj[0].answer ) {
				counterTrueAnswer++;
				counterAllAnswer++;
				correctAnswer.innerHTML = counterTrueAnswer;
				totalAnswer.innerHTML = counterAllAnswer;
				result.innerHTML = "";
				successMessage.style.display = "none";
				errorMessage.style.display = "none";
				nextBtn.style.display = "none";

				xhr.open('GET', 'https://jservice.io/api/random', true);
				xhr.send();
			}
		};
    }
};

xhr.open('GET', 'http://jservice.io/api/random', true);

xhr.onerror = function() {
  	console.log( 'Error ' + this.status );
}

xhr.send();



skipBtn.onclick = function(){
	counterAllAnswer++;
	totalAnswer.innerHTML = counterAllAnswer;
	result.innerHTML = "";
	answer.innerHTML = "";
	successMessage.style.display = "none";
	errorMessage.style.display = "none";
	nextBtn.style.display = "none";

	xhr.open('GET', 'https://jservice.io/api/random', true);
	xhr.send();
	alert(totalFunctionsCreated);
};



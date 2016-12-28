var myNumber = generateRandomNumber();
var myTurn = false;

$(document).ready(function(){
	$(".easy-mode").click(function() {
		$(".description").text("Em chỉ chơi được số 5 chữ số thôi nha");
	});
});

function getNumber(input) {
	if(event.keyCode == 13) {
		checkInputNumber($("#number").val());
	}
}

function checkInputNumber(number) {
	var patt = /\d/g;
	if (!patt.test(number)) {
		$(".number-error").text("Chị chỉ được nhập số thôi");
	}else if(number.length != 5) {
		$(".number-error").text("Số có 5 chữ số nha");
	} else {
		answer(myNumber, number);
		$(".input").attr('disabled','disabled');
		myTurn = !myTurn;
		if (myTurn) {
			$(".person").text("Em đoán");
		}	
	}
}

function answer(myNumber, number) {
	console.log(myNumber);
	var numCorrectNumberAnswer = numCorrectNumber(myNumber, number);
  	var numCorrectPositionAnswer = numCorrectPosition(myNumber, number);
  	$(".answer").text(numCorrectNumberAnswer + "Đ " + numCorrectPositionAnswer + "V");
}

function generateRandomNumber() {
  var number = "";
  for(var i = 0 ; i < 5; i++) {
    var letter = Math.floor(Math.random() * 10);
    number += letter.toString();
  }
  return number;
}

function numCorrectNumber(myNumber, opponentGuess) {
  var arrMyNumber = myNumber.split("").map(function(x){return parseInt(x);}).sort();
  var arrOpponentGuess = opponentGuess.split("").map(function(x){return parseInt(x);}).sort();
  var result = [];
  while( arrMyNumber.length > 0 && arrOpponentGuess.length > 0 )
  {  
     if      (arrMyNumber[0] < arrOpponentGuess[0] ){ arrMyNumber.shift(); }
     else if (arrMyNumber[0] > arrOpponentGuess[0] ){ arrOpponentGuess.shift(); }
     else /* they're equal */
     {
       result.push(arrMyNumber.shift());
       arrOpponentGuess.shift();
     }
  }
  //console.log(result);
  return result.length;
}

function numCorrectPosition(myNumber, opponentGuess) {
  var correctPosition = 0;
  for(var i = 0; i < myNumber.length; i++) {
    if(myNumber[i] == opponentGuess[i]) {
      correctPosition++;
    }
  }
  return correctPosition;
}
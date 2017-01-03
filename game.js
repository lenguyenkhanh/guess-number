var myNumber = generateRandomNumber();
var myTurn = false;

$(document).ready(function(){
  $(".guess-number").focus();
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
	var patt = /^[0-9]+$/g;
	if (!patt.test(number)) {
		$(".number-error").text("Chị chỉ được nhập số thôi");
	}else if(number.length != 5) {
		$(".number-error").text("Số có 5 chữ số nha");
	} else {
		answer(myNumber, number);
		myTurn = !myTurn;
		if (myTurn) {
			$(".person").text("Em đoán");
      var myGuess = generateGuessNumber();
      $(".input").html("<div class='guess text-center'>" + myGuess + "</p>");
      $(".answer").html("<input type='text' class='form-control correct-digit' id='number' onkeydown='getYourNumber(this)'></input> <span style='margin-right:10px'>Đ</span>" + 
                        "<input type='text' class='form-control correct-position' id='number' onkeydown='getYourNumber(this)'></input><span> V</span>" +
                        "<div class='text-center error'></div>");
		  $(".correct-digit").focus();
    }	
	}
}

function getYourNumber(input) {
  var patt1 = /^[0-9]$/g;
  var patt2 = /^[0-9]$/g;
  if (event.keyCode == 13) {
    var number = $(".guess").text();
    var numCorrectDigit = $(".correct-digit").val();
    var numCorrectPosition = $(".correct-position").val();

    if (numCorrectDigit == 5 && numCorrectPosition == 5) {
      alert("Em thang roi ^^");
      return;
    }

    if (!patt1.test(numCorrectDigit) || !patt2.test(numCorrectPosition)) {
      $(".error").text("Chị chỉ được nhập số");
    } else {
      console.log(number,"------");
      // number = parseInt(number);
      // numCorrectDigit = parseInt(numCorrectDigit);
      // numCorrectPosition = parseInt(numCorrectPosition);  
      opponentNumber.guessedNumber.push(number);
      opponentNumber.numberCorrectDigit.push(numCorrectDigit);
      opponentNumber.numberCorrectPosition.push(numCorrectPosition);

      if(numCorrectDigit == 0 && opponentNumber.baseGuess) {
        var arrDigit = getDigitFromNumber(number);
        for(var i = 0; i < arrDigit.length; i++) {
          opponentNumber.exclusiveDigit.push(arrDigit[i]);
        }
      } else if (numCorrectDigit == 5) {
        if(opponentNumber.special) {
          opponentNumber.specialArrayResult.push([number, numCorrectPosition]);
        }
        opponentNumber.correctResult.push([number,numCorrectPosition]);
      } else if (!opponentNumber.baseGuess ) {
          opponentNumber.imply.push([number, numCorrectDigit, numCorrectPosition]);
      } else {
        opponentNumber.useToGuess.push([number, numCorrectDigit, numCorrectPosition]);
      }

      $(".k").append("<tr><td>" + number + "</td><td>" + numCorrectDigit + "</td><td>" + numCorrectPosition + "</td></tr>" );
      myTurn = !myTurn;
      if (!myTurn) {
        $(".person").text("Chị đoán");
        $(".input").html("<div class='col-md-4 col-md-offset-4'><input type='text' class='form-control guess-number' id='number' onkeydown='getNumber(this)'></div>" +
                         "<div class='col-md-4 number-error'></div>");
        $(".answer").text("");
        $(".guess-number").focus();
      }
    }

  }
}

function answer(myNumber, number) {
	var numCorrectNumberAnswer = numCorrectNumber(myNumber, number);
	var numCorrectPositionAnswer = numCorrectPosition(myNumber, number);
  if (isWin("shea", numCorrectNumberAnswer, numCorrectPositionAnswer)) {
    alert("Congrelation!!! C thang roi ^^");
    return;
  }
	$(".answer").text(numCorrectNumberAnswer + "Đ " + numCorrectPositionAnswer + "V");
    $(".shea").append("<tr><td>" + number + "</td><td>" + numCorrectNumberAnswer + "</td><td>" + numCorrectPositionAnswer + "</td></tr>" );
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

function isWin (name, digit, position) {
  return digit == 5 && position == 5;
}
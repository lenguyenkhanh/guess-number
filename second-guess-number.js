var opponentNumber = {
  guessedNumber: [],
  start: "00000",
  numberCorrectDigit: [],
  numberCorrectPosition: [],
  arrCorrectDigit: [],
  exclusiveDigit: [],
  numberGuess: 0
};

$(document).ready(function() {
  var myNumber = generateNumber();
  var opponentGuessNumber = "";
  do {
    opponentGuessNumber = prompt("You guess:");
    if(opponentGuessNumber == "" || opponentGuessNumber == null) {
      alert("You lose. My number is " + myNumber);
      console.log(opponentNumber);
      return;
    } else {
      answer(myNumber, opponentGuessNumber);
      guessOpponentNumber();
    }
  } while(!isWin(myNumber, opponentGuessNumber));
  alert("CONGRATULATION!!!YOU WIN");
});

function generateBaseGuessNumber(index) {
  return (2 * index - 1).toString().repeat(3) + ((2 * index) % 10).toString().repeat(2);

}
function generateGuessNumber() {
  console.log("start: " + opponentNumber.start);
  console.log("guessed: ", opponentNumber.guessedNumber);
  console.log("index digit: ", opponentNumber.numberCorrectDigit);
  console.log("index position: ", opponentNumber.numberCorrectPosition);
  console.log("exclusive: ", opponentNumber.exclusiveDigit);
  var numberToGuess = "";
  if(opponentNumber.numberGuess == 1) {
    numberToGuess = generateNumber();
  } else {
    for(var a = parseInt(opponentNumber.start[0]); a <= 9; a++) {
      if(opponentNumber.exclusiveDigit.indexOf(a) >= 0)
        continue;
      for(var b = 0; b <= 9; b++) {
        if(opponentNumber.exclusiveDigit.indexOf(b) >= 0)
          continue;
        for(var c = 0; c <= 9; c++) {
          if(opponentNumber.exclusiveDigit.indexOf(c) >= 0)
            continue;
          for(var d = 0; d <= 9; d++) {
            if(opponentNumber.exclusiveDigit.indexOf(d) >= 0)
              continue;
            for(var e = 0; e <= 9; e++) {
               if(opponentNumber.exclusiveDigit.indexOf(e) >= 0)
                continue;
                numberToGuess = a.toString() + b.toString() + c.toString() + d.toString() + e.toString();
                if(valid(numberToGuess)) {
                  opponentNumber.start = numberToGuess;
                  return numberToGuess;  
                }
            }
          }
        }
      }
    }
  }
  
  return numberToGuess;
}

function valid(number) {
  for(var i = 0; i < opponentNumber.guessedNumber.length; i++) {
    var correctDigit = numCorrectNumber(number, opponentNumber.guessedNumber[i])
    if(correctDigit != opponentNumber.numberCorrectDigit[i])
      return false;
    if(numCorrectPosition(number, opponentNumber.guessedNumber[i]) != opponentNumber.numberCorrectPosition[i])
      return false;
  }
  return true;
}

function sumArray(arr) {
  if(arr.length == 0) {
    return 0;
  } else {
    return arr.shift() + arr;
  }
}

function getDigitFromNumber(number) {
  var arrDigit = [];
  for(var i = 0; i < number.length; i++) {
    if(arrDigit.indexOf(parseInt(number[i])) < 0) {
      arrDigit.push(parseInt(number[i]));
    }
  }
  return arrDigit;
}

function guessOpponentNumber() {
  opponentNumber.numberGuess++;
  var guessNumber = generateGuessNumber();
  console.log("I guess");
  alert("I guess: " + guessNumber);
  var numberCorrectDigit = parseInt(prompt("Number correct digit: "));
  var numberCorrectPosition = parseInt(prompt("Number correct position: "));
  opponentNumber.guessedNumber.push(guessNumber);
  opponentNumber.numberCorrectDigit.push(numberCorrectDigit);
  opponentNumber.numberCorrectPosition.push(numberCorrectPosition);
  if(numberCorrectDigit == 0) {
    var arrDigit = getDigitFromNumber(guessNumber);
    for(var i = 0; i < arrDigit.length; i++) {
      opponentNumber.exclusiveDigit.push(arrDigit[i]);
    }
  } 
}



function answer(myNumber, numberOpponentGuess) {
  var numCorrectNumberAnswer = numCorrectNumber(myNumber, numberOpponentGuess);
  var numCorrectPositionAnswer = numCorrectPosition(myNumber, numberOpponentGuess);
  console.log("you guess: " + numberOpponentGuess + "       " + numCorrectNumberAnswer + " dung     " + numCorrectPositionAnswer + " vi");
}

function isWin(myNumber, numberOpponentGuess) {
  return (numCorrectNumber(myNumber, numberOpponentGuess) == 5) && (numCorrectPosition(myNumber, numberOpponentGuess) == 5);
}

function generateNumber() {
  var number = "";
  for(var i = 0 ; i < 5; i++) {
    var letter = Math.floor(Math.random() * 10);
    number += letter.toString();
  }
  //console.log("random number: " + number);
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
  //console.log(correctPosition);
  return correctPosition;
}
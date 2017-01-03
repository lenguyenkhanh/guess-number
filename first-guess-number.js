// var opponentNumber = {
// 	numberGuess: 0,
// 	useToGuessArray: [],
// 	baseGuessArray: [],
// 	correctDigitArray: [],
// 	correctPositionArray: [],
// 	implyArray:  [],
// 	isImply: false
// }

// var guessOpponentNumber = function() {
// 	opponentNumber.numberGuess++;
// 	console.log(opponentNumber.correctDigitArray);
// 	console.log(opponentNumber.correctPositionArray);

// 	console.log("total correct digit: ", totalCorrectDigit());
// 	if (opponentNumber.baseGuessArray.length < 5 && totalCorrectDigit() < 5) {
// 		console.log("base guess");
// 		return generateBaseGuess();
// 	}

// 	if (totalCorrectDigit() == 5) {
// 		console.log("imply guess");
// 		opponentNumber.useToGuessArray = sort(opponentNumber.useToGuessArray);
// 		console.log(opponentNumber.useToGuessArray);
// 		if(opponentNumber.useToGuessArray.length >= 2) {
// 		  var firstNumber = opponentNumber.useToGuessArray.shift();
// 		  var secondNumber = opponentNumber.useToGuessArray.shift();
// 		  opponentNumber.implyArray.push(firstNumber);
// 		  opponentNumber.implyArray.push(secondNumber);
// 		  opponentNumber.isImply = true;
// 		  return getDigitFromNumber(firstNumber[0])[0].toString().repeat(3) + getDigitFromNumber(secondNumber[0])[0].toString().repeat(2);
// 		} 
// 	}

// 	if (opponentNumber.isImply) {

// 	}
// }

// var totalCorrectDigit = function() {
// 	return opponentNumber.correctDigitArray.reduce(function(x, y) {
// 		return parseInt(x) + parseInt(y);
// 	}, 0);
// }

// var generateBaseGuess = function() {
// 	var index = opponentNumber.numberGuess;
// 	return (2 * index - 1).toString().repeat(3) + ((2 * index) % 10).toString().repeat(2); 
// }

// function sort(arr) {
//   arr = arr.map(x => [x[1], x[0], x[2]]).sort().reverse().map(x => [x[1], x[0], x[2]]);
//   return arr;
// }

// function getDigitFromNumber(number) {
//   var arrDigit = [];
//   for(var i = 0; i < number.length; i++) {
//     if(arrDigit.indexOf(parseInt(number[i])) < 0) {
//       arrDigit.push(parseInt(number[i]));
//     }
//   }
//   return arrDigit;
// }




var opponentNumber = {
  guessedNumber: [],
  numberCorrectDigit: [],
  numberCorrectPosition: [],
  useToGuess: [],
  speicalArray: [],
  specialArrayResult: [],
  exclusiveDigit: [],
  listFinish: [],
  tail:"",
  special: false,
  baseGuess: true,
  guessResult: false,
  actualResult: [],
  resultArr: [],
  result: {
    "firstHalf": [],
    "secondHalf": []
  },
  correctResult: [],
  maybeArr:[],
  imply: [],
  type: "",
  numberGuess: 0
};
var stop = false;

var isValidResult = function(result) {
  return (result.firstHalf <= 3) && (result.secondHalf <=2);
};


var Maybe = function(firstHalf, secondHalf){
    this.firstHalf = firstHalf;
    this.secondHalf = secondHalf;
  };

// $(document).ready(function() {
//   var myNumber = generateNumber();
//   var opponentGuessNumber = "";
//   do {
//     // opponentGuessNumber = prompt("You guess:");
//     // if(opponentGuessNumber == "" || opponentGuessNumber == null) {
//     //   alert("You lose. My number is " + myNumber);
//     //   console.log(opponentNumber);
//     //   return;
//     // } else {
//     //   answer(myNumber, opponentGuessNumber);
//       guessOpponentNumber();
//       if(stop)
//         return;
//     // }
//   } while(!isWin(myNumber, opponentGuessNumber));
//   alert("CONGRATULATION!!!YOU WIN");
// });

function generateBaseGuessNumber(index) {
  return (2 * index - 1).toString().repeat(3) + ((2 * index) % 10).toString().repeat(2);
}

function permutation(str) {
  var number = "";
  if(str.length == 3) {
    var arrPermutation = [
      str.substring(0, 1) + str.substring(1, 2) + str.substring(2, 3),
      str.substring(0, 1) + str.substring(2, 3) + str.substring(1, 2),
      str.substring(1, 2) + str.substring(0, 1) + str.substring(2, 3),
      str.substring(1, 2) + str.substring(2, 3) + str.substring(0, 1),
      str.substring(2, 3) + str.substring(0, 1) + str.substring(1, 2),
      str.substring(2, 3) + str.substring(1, 2) + str.substring(0, 1),
    ];
    for(var i = 0; i < arrPermutation.length; i++){
      var duplicate = false;
      number = arrPermutation[i];
      for(var j = 0; j < opponentNumber.correctResult.length; j++ ){
        var firstGuessed = opponentNumber.correctResult[j][0].substring(0, 3);
        if(number.substring(0, 3) == firstGuessed){
          duplicate = true;
          break;
        }
      }
      if(!duplicate) {
        for(var j = 0; j < opponentNumber.correctResult.length; j++ ){
          var firstGuessed = opponentNumber.correctResult[j][0].substring(0, 3);
          var correctDigit = opponentNumber.correctResult[j][1] >= 2? opponentNumber.correctResult[j][1] -2 : opponentNumber.correctResult[j][1];
          if(numCorrectPosition(number.substring(0, 3), firstGuessed) == correctDigit) {
            return number;
          } 
        }
      }
    }
  }
}

function permutationSpecial(input,firstNumber, secondNumber) {
  if(str.length == 0) {
    return [];
  } else if(str.length == 1) {
    return [str];
  } else {
    var result = [];
    for(var k = 0; k < str.length; k++) {
      var first = str.substring(k, k + 1);
      var last = str.substring(0, k) + str.substring(k + 1, str.length);
      var subPermutation = permutation(last);
      for(var i = 0; i < subPermutation.length; i++) {
        var value = first + subPermutation[i];
        if(result.indexOf(value) < 0 && numCorrectPosition(value, firstNumber[0]) == firstNumber[2] && numCorrectPosition(value, secondNumber[0]) == secondNumber[2]) {
          result.push(first + subPermutation[i]);
        }
      }
    }
    return result;
  }
}

function getSpecialArray() {
  if(opponentNumber.specialArrayResult.length == 0) {
    return opponentNumber.speicalArray.shift();
  } else {
    var number = opponentNumber.speicalArray.shift();
    for(var i = 0; i < opponentNumber.specialArrayResult.length; i++) {
      var pass = opponentNumber.specialArrayResult[i];
      if(numCorrectPosition(number, pass[0]) == pass[1]) {
        return pass[0];
      }
    }
  }
}

function generateGuessNumber() {
  opponentNumber.numberGuess++;
  var numberToGuess = "";
  if(opponentNumber.correctResult.length > 0) {
    guess = opponentNumber.correctResult[opponentNumber.correctResult.length - 1];
    if(guess[1] == 2) {
      opponentNumber.tail = guess[0].substring(3, 5);
      numberToGuess = permutation(guess[0].substring(0,3 )) + opponentNumber.tail;
    } else if(guess[1] == 1) {
      opponentNumber.tail = guess[0].substring(4,5) + guess[0].substring(3, 4);
      numberToGuess = permutation(guess[0].substring(0, 3)) + opponentNumber.tail;
    } else if (guess[1] == 0) {
      opponentNumber.tail = guess[0].substring(4, 5) + guess[0].substring(3, 4);
      // guess = guess[0].substring(0, 3) + opponentNumber.tail;
      numberToGuess = permutation(guess[0].substring(0, 3))  + opponentNumber.tail;
    } else if (guess[1] == 3) {
      var tail = opponentNumber.tail.length > 0? opponentNumber.tail: guess[0].substring(4, 5) + guess[0].substring(3, 4);
      if(opponentNumber.tail.length == 0)
        numberToGuess = guess[0].substring(0, 3) + tail;
      else
        numberToGuess = permutation(guess[0].substring(0, 3)) + tail;
    }
    return numberToGuess;
  }
  if(opponentNumber.actualResult.length > 0) {
    numberToGuess = opponentNumber.actualResult.shift();
    return numberToGuess;
  }
  if(opponentNumber.imply.length >= 3) {
    opponentNumber.type = opponentNumber.imply[0][1].toString() + "-" + opponentNumber.imply[1][1].toString();
    switch(opponentNumber.type) {
      case "1-1":
        var firstNumber = opponentNumber.imply[0];
        var secondNumber = opponentNumber.imply[1];
        var result = opponentNumber.imply[2];
        if (result[1] == 2) {
          if(firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          }

          if(secondNumber[2] == 1) {
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            } else {
              opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }
        } else if (result[1] == 0) {
          if(firstNumber[2] == 1) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          }

          if(secondNumber[2] == 1) {
              opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            } else {
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          }
        } else {
          if(firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            var arrFirstNumber = getDigitFromNumber(firstNumber[0]);
            var arrSecondNumber = getDigitFromNumber(secondNumber[0]);
            var secondHalf = arrFirstNumber[0].toString() + arrSecondNumber[1].toString();
            var firstHalf = arrSecondNumber[0].toString() + arrFirstNumber[1].toString();
            var maybe1 = new Maybe(firstHalf, "");
            var maybe2 = new Maybe("", secondHalf);
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 1) {
            console.log("cannot happen");
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 0) {
            console.log("cannot happen");
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            var arrFirstNumber = getDigitFromNumber(firstNumber[0]);
            var arrSecondNumber = getDigitFromNumber(secondNumber[0]);
            var secondHalf = arrFirstNumber[1].toString() + arrSecondNumber[0].toString();
            var firstHalf = arrSecondNumber[1].toString() + arrFirstNumber[0].toString();
            var maybe1 = new Maybe(firstHalf, "");
            var maybe2 = new Maybe("", secondHalf);
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          }
        }
        break;
      case "2-2":
        var firstNumber = opponentNumber.imply[0];
        var secondNumber = opponentNumber.imply[1];
        var result = opponentNumber.imply[2];
        if (result[1] == 4) {
          if(firstNumber[2] == 2) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.second.push(getDigitFromNumber(firstNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          }

          if(secondNumber[2] == 2) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (secondNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.second.push(getDigitFromNumber(secondNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }
        } else if(result[1] == 3) {
          if(firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 2) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 1) {
            //2v-2v-1v:first[0]second[0]second[0]/fist[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 3) {
            //2v-1v-3v:first[0]first[0]/second[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 2) {
            //2v-1v-2v:fist[0]second[0]/second[0]fist[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 3) {
            //2v-0v-3v:sirst[0]first[0]second[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 1) {
            //1v-2v-1v: first[0]second[0]/fist[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 0) {
            //1v-2v-0v: second[0]second[0]/fist[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
            //1v-1v-0v: first[0]second[0]second[1]/fist[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 3) {
            //1v-1v-3v: first[0]first[1]second[0]/second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
            var arrDigit1 = getDigitFromNumber(firstNumber[0]);
            var arrDigit2 = getDigitFromNumber(secondNumber[0]);
            var maybe1 = new Maybe(arrDigit1[0].toString() + arrDigit1[1].toString(), arrDigit2[0].toString() + arrDigit2[0].toString());
            var maybe2 = new Maybe(arrDigit1[0].toString() + arrDigit2[1].toString(), arrDigit1[1].toString() + arrDigit2[0].toString());
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 2 && result[2] == 0) {
            //0v-2v-0v: second[0]second[0]fist[1]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 1) {
            //0v-1v-1v: second[0]first[1]/second[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: second[0]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else {
            console.log("cannot exist");
          }

        } else if(result[1] == 2) {
          if(firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 2) {
            //2v-2v-2v: first[0]first[0]/second[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 0) {
            //2v-2v-0v: second[0]second[0]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 1) {
            //2v-2v-1v: first[0]second[0]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 2) {
            //2v-1v-2v: first[0]first[0]second[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstNumber.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]second[0]second[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 2) {
            //2v-0v-2v: first[0]second[1]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 0) {
            //1v-2v-0v: second[0]second[0]first[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 1) {
            //1v-2v-1v: first[0]second[0]first[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 2) {
            //1v-1v-2v: first[0]first[1]/second[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if(firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            var arrDigit1 = getDigitFromNumber(firstNumber[0]);
            var arrDigit2 = getDigitFromNumber(secondNumber[0]);
            var maybe1 = new Maybe(arrDigit1[0].toString() + arrDigit2[1].toString(), arrDigit1[0].toString() + arrDigit2[1].toString());
            var maybe2 = new Maybe(arrDigit1[1].toString() + arrDigit2[0].toString(), arrDigit1[1].toString() + arrDigit2[0].toString());
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
            //1v-1v-0v: second[0]second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            //1v-0v-1v: second[1]second[1]first[0]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
            //1v-0v-2v: first[0]first[1]second[1]/second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 2 && result[2] == 0) {
            //0v-2v-0v: first[1]second[0]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if(firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            var arrDigit1 = getDigitFromNumber(firstNumber[0]);
            var arrDigit2 = getDigitFromNumber(secondNumber[0]);
            var maybe1 = new Maybe(arrDigit2[0].toString() + arrDigit2[0].toString() + arrDigit1[1].toString(), arrDigit1[1].toString());
            var maybe2 = new Maybe(arrDigit1[1].toString() + arrDigit2[0].toString() + arrDigit2[1].toString(), arrDigit1[0].toString());
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            //0v-0v-0v: second[1]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
            //0v-0v-2v: first[1]first[1]/second[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
            //0v-0v-1v: first[1]second[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else {
            console.log("cannot exist");
          }          

        } else if(result[1] == 1) {
          if(firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]second[1]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 0) {
            //2v-1v-0v: second[0]second[1]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 1) {
            //2v-0v-1v: first[0]second[1]second[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 1) {
            //1v-2v-1v: first[0]first[1]/second[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 0) {
            //1v-2v-0v: first[1]second[0]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]first[1]second[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
            //1v-1v-0v: first[1]second[0]second[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 0) {
            //1v-0v-0v: second[1]second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            //1v-0v-1v: first[1]second[1]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 2 && result[2] == 0) {
            //0v-2v-0v: first[1]first[1]second[0]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: first[1]second[1]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 1) {
            //0v-1v-1v: first[1]first[1]/second[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            //0v-0v-0v: first[1]second[1]second[1]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
            //0v-0v-1v: first[1]first[1]second[1]/second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }  else {
            console.log("cannot exist");
          }
        } else {

          if(firstNumber[2] == 2) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          }

          if(secondNumber[2] == 2) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (secondNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.second.push(getDigitFromNumber(secondNumber[0])[1]);
          } else {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          }
        }
        break;  
      case "2-1":
      	console.log("this case");
        var firstNumber = opponentNumber.imply[0];
        var secondNumber = opponentNumber.imply[1];
        var result = opponentNumber.imply[2];
        if (result[1] == 3) {
          if(firstNumber[2] == 2) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          }

          if(secondNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }
        } else if(result[1] == 2) {
        	console.log("here");
            if(firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 2) {
              //2v-1v-2v:first[0]first[0]/second[1]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
              //2v-1v-1v: first[0]second[0]/first[1]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 2) {
              var arrDigit1 = getDigitFromNumber(firstNumber[0]);
              var arrDigit2 = getDigitFromNumber(secondNumber[0]);
              var maybe1 = new Maybe(arrDigit1[0].toString() + arrDigit1[0].toString() + arrDigit2[1].toString(), "");
              var maybe2 = new Maybe(arrDigit1[0].toString(), arrDigit1[1].toString() + arrDigit2[0].toString());
              opponentNumber.maybeArr.push([maybe1, maybe2]);
            } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
              var arrDigit1 = getDigitFromNumber(firstNumber[0]);
              var arrDigit2 = getDigitFromNumber(secondNumber[0]);
              var maybe1 = new Maybe(arrDigit1[0].toString(), arrDigit1[0].toString() + arrDigit2[1].toString());
              var maybe2 = new Maybe(arrDigit1[0].toString() + arrDigit1[1].toString() + arrDigit2[0].toString(), "");
              console.log("maybe 1: ", maybe1);
              console.log("maybe 2: ", maybe2);
            opponentNumber.maybeArr.push([maybe1, maybe2]);
            } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
              //1v-1v-0v: second[0]/first[0]first[1]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
              //1v-0v-1v: first[0]second[1]/first[0]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
              //1v-0v-2v: first[0]first[1]/second[0]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
              //0v-1v-0v: first[1]second[0]/first[1]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
              //0v-0v-0v: second[1]/first[0]first[0]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
              //0v-0v-1v: first[1]/first[0]second[0]
              opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
              opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            } else {
              console.log("cannot exist");
            }
        } else if(result[1] == 1) {
          if(firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 0) {
            //2v-1v-0v: second[0]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 1) {
            //2v-0v-1v: first[0]second[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]first[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
            //1v-1v-0v: first[1]second[0]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            var arrDigit1 = getDigitFromNumber(firstNumber[0]);
            var arrDigit2 = getDigitFromNumber(secondNumber[0]);
            var maybe1 = new Maybe(arrDigit1[0].toString() + arrDigit1[1].toString() + arrDigit2[1].toString(), "");
            var maybe2 = new Maybe(arrDigit1[1].toString(), arrDigit1[1].toString() + arrDigit2[0].toString());
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 0) {
            //1v-0v-0v: second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            var arrDigit1 = getDigitFromNumber(firstNumber[0]);
            var arrDigit2 = getDigitFromNumber(secondNumber[0]);
            var maybe1 = new Maybe(arrDigit1[1].toString(), arrDigit2[0].toString() + arrDigit2[1].toString());
            var maybe2 = new Maybe(arrDigit1[1].toString() + arrDigit1[1].toString() + arrDigit2[0].toString(), "");
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            //0v-0v-0v: first[1]second[1]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
            //0v-0v-1v: first[1]first[1]/second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else {
            console.log("cannot exist");
          }
        } else {
          if(firstNumber[2] == 2) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          }

          if(secondNumber[2] == 1) {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          }
        }
        break;
      case "3-2":
        var firstNumber = opponentNumber.imply[0];
        var secondNumber = opponentNumber.imply[1];
        var result = opponentNumber.imply[2];
        if (result[1] == 5) {
          if(firstNumber[2] == 3) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if(firstNumber[2] == 2) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          }

          if(secondNumber[2] == 2) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if(secondNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }
        } else if(result[1] == 4) {
          if(firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 4) {
            //3v-1v-4v: first[0]first[0]first[0]/second[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 3) {
            //3v-1v-3v: first[0]first[0]second[0]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 2) {
            //2v-2v-2v: first[0]first[0]second[0]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 1) {
            //2v-2v-1v: first[0]second[0]second[0]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 3) {
            //2v-0v-3v: first[0]first[0]second[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 4) {
            //2v-0v-4v: first[0]first[0]first[1]/second[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]second[0]second[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 2) {
            //1v-1v-2v: first[0]first[1]second[0]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 2 && result[2] == 0) {
            //0v-2v-0v: first[1]second[0]second[0]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } 

        } else if(result[1] == 3) {
          if(firstNumber[2] == 3 && secondNumber[2] == 2 && result[2] == 3) {
            //3v-2v-3v: first[0]first[0]first[0]/second[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 2 && result[2] == 2) {
            //3v-2v-2v: first[0]first[0]second[0]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 2 && result[2] == 1) {
            //3v-2v-1v: first[0]second[0]second[0]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 0 && result[2] == 3) {
            //3v-0v-3v: first[0]first[0]second[1]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 2) {
            var arrDigit1 = getDigitFromNumber(firstNumber[0]);
            var arrDigit2 = getDigitFromNumber(secondNumber[0]);
            var maybe1 = new Maybe(arrDigit1[0].toString() + arrDigit1[0].toString() + arrDigit2[1].toString(), arrDigit1[0].toString() + arrDigit2[1].toString());
            var maybe2 = new Maybe(arrDigit1[0].toString() + arrDigit1[1].toString() + arrDigit2[0].toString(), arrDigit1[1].toString() + arrDigit2[0].toString());
            opponentNumber.maybeArr.push([maybe1, maybe2]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]second[0]second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 1) {
            //1v-2v-1v: first[0]first[1]second[0]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 2 && result[2] == 0) {
            //1v-2v-0v: first[1]second[0]second[0]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[1]second[0]/first[0]first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            //1v-0v-1v: first[0]second[1]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
            //1v-0v-2v: first[0]first[1]second[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 3) {
            //1v-0v-3v: first[0]first[1]first[1]second[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: first[1]second[0]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 1) {
            //0v-1v-1v: first[1]first[1]second[0]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }

        } else if(result[1] == 2) {
          if(firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 2) {
            //3v-1v-2v: first[0]first[0]second[1]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 1) {
            //3v-1v-1v: first[0]second[0]second[1]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 2) {
            //2v-2v-2v: first[0]first[0]first[1]/second[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 2 && result[2] == 1) {
            //2v-2v-1v: first[0]first[1]second[0]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 1) {
            //2v-0v-1v: first[0]second[1]second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 2) {
            //2v-0v-2v: first[0]first[1]second[1]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]first[1]second[1]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 2) {
            //1v-1v-2v: first[0]first[1]first[1]/second[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 2 && result[2] == 0) {
            //0v-2v-0v: first[1]first[1]second[0]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            //0v-0v-0v: first[1]second[1]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
            //0v-0v-1v: first[1]first[1]second[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } 

        } else if(result[1] == 1) {
          if(firstNumber[2] == 3 && secondNumber[2] == 0 && result[2] == 1) {
            //3v-0v-1v: first[0]second[1]second[1]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]first[1]second[1]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 0) {
            //1v-0v-0v: first[1]second[1]second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: first[1]first[1]second[1]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          }
        }
        break;
      case "3-1":
        var firstNumber = opponentNumber.imply[0];
        var secondNumber = opponentNumber.imply[1];
        var result = opponentNumber.imply[2];
        if (result[1] == 4) {
          if(firstNumber[2] == 3) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if(firstNumber[2] == 2) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          }

          if(secondNumber[2] == 1) {
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else {
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          }
        } else if(result[1] == 3) {
          if(firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 3) {
            //3v-1v-3v: first[0]first[0]first[0]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 2) {
            //3v-1v-2v: first[0]first[0]second[0]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 0 && result[2] == 3) {
            //3v-0v-3v: first[0]first[0]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 2) {
            //2v-1v-2v: first[0]first[0]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]second[0]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && res0lt[2] == 2) {
            //2v-0v-2v: first[0]first[0]second[1]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 3) {
            //2v-0v-3v: first[0]first[0]first[1]/second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]first[1]second[0]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            //1v-0v-1v: first[0]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
            //1v-0v-2v: first[0]first[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: first[1]second[0]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } 

        } else if(result[1] == 2) {
          if(firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 2) {
            //3v-1v-2v: first[0]first[0]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 1 && result[2] == 1) {
            //3v-1v-1v: first[0]second[0]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 3 && secondNumber[2] == 0 && result[2] == 2) {
            //3v-0v-2v: first[0]first[0]second[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 2) {
            //2v-1v-2v: first[0]first[0]first[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]first[1]second[0]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 2) {
            //2v-0v-2v: first[0]first[1]/first[1]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 1) {
            //2v-0v-1v: first[0]second[1]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]first[1]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 0) {
            //1v-1v-0v: first[1]second[0]/first[0]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 2) {
            //1v-0v-2v: first[0]first[1]first[1]/second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 1) {
            //1v-0v-1v: first[0]first[1]second[1]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: first[1]first[1]second[0]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 1) {
            //0v-0v-1v: first[1]first[1]/first[0]second[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[0]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            //0v-0v-0v: first[1]second[1]/first[0]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          } 

        } else if(result[1] == 1) {
          if(firstNumber[2] == 3 && secondNumber[2] == 0 && result[2] == 1) {
            //3v-0v-1v: first[0]second[1]/first[1]first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 1 && result[2] == 1) {
            //2v-1v-1v: first[0]first[1]/first[1]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 2 && secondNumber[2] == 0 && result[2] == 1) {
            //2v-0v-1v: first[0]first[1]second[1]/first[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 1 && result[2] == 1) {
            //1v-1v-1v: first[0]first[1]first[1]/second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 1 && secondNumber[2] == 0 && result[2] == 0) {
            //1v-0v-0v: first[1]second[1]/first[1]first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 1 && result[2] == 0) {
            //0v-1v-0v: first[1]first[1]/first[0]second[1]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(secondNumber[0])[1]);
          } else if (firstNumber[2] == 0 && secondNumber[2] == 0 && result[2] == 0) {
            //0v-0v-0v: first[1]first[1]second[1]/first[0]
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(firstNumber[0])[1]);
            opponentNumber.result.firstHalf.push(getDigitFromNumber(secondNumber[0])[1]);
            opponentNumber.result.secondHalf.push(getDigitFromNumber(firstNumber[0])[0]);
          }
        }
      case "4-1":
        opponentNumber.special = true;
        var firstNumber = opponentNumber.imply[0];
        var secondNumber = opponentNumber.imply[1];
        var result = opponentNumber.imply[2];
        var value = "";
        if (result[1] == 4) {
          var firstDigit = getDigitFromNumber(firstNumber[0]);
          var secondDigit = getDigitFromNumber(secondNumber[0]);
          value = firstDigit[0].toString().repeat(3) + firstDigit[1] + secondDigit[0];
          opponentNumber.speicalArray = permutationSpecial(value, firstNumber, secondNumber);
        } else if(result[1] == 3) {
          var firstDigit = getDigitFromNumber(firstNumber[0]);
          var secondDigit = getDigitFromNumber(secondNumber[0]);
          value = firstNumber[0].toString().repeat(3) + firstNumber[1] + secondNumber[1];
          opponentNumber.speicalArray = permutationSpecial(value, firstNumber, secondNumber);
          value = firstNumber[0].toString.repeat(2) + firstDigit[1].toString().repeat(2) + secondDigit[0];
          opponentNumber.speicalArray.concat(permutationSpecial(value, firstNumber, secondNumber));
        } else if(result[1] == 2) {
          var firstDigit = getDigitFromNumber(firstNumber[0]);
          var secondDigit = getDigitFromNumber(secondNumber[0]);
          value = firstNumber[0].toString().repeat(2) + firstNumber[1].toString().repeat(2) + secondNumber[1];
          opponentNumber.speicalArray = permutationSpecial(value, firstNumber, secondNumber);
        }
        opponentNumber.special = true;
    }
    if(opponentNumber.special){
      numberToGuess = getSpecialArray();
      return numberToGuess;
    }
    opponentNumber.imply = [];
    if(opponentNumber.useToGuess.length < 2) {
      mergeMaybe(opponentNumber.maybeArr, opponentNumber.result);
      numberToGuess = opponentNumber.actualResult[opponentNumber.actualResult.length - 1]
      return numberToGuess;
    }
  }
  var totalCorrectDigit = sumArray(opponentNumber.numberCorrectDigit);
  if(totalCorrectDigit == 5 || opponentNumber.numberGuess > 5){
    opponentNumber.baseGuess = false;
  }
  if(opponentNumber.baseGuess) {
    numberToGuess = generateBaseGuessNumber(opponentNumber.numberGuess);
  } else {
    opponentNumber.useToGuess = sort(opponentNumber.useToGuess);
    console.log("here");
    if(opponentNumber.useToGuess.length >= 2) {
    	console.log(opponentNumber.useToGuess);
      var firstNumber = opponentNumber.useToGuess.shift();
      var secondNumber = opponentNumber.useToGuess.shift();
      opponentNumber.imply.push(firstNumber);
      opponentNumber.imply.push(secondNumber);
      console.log(firstNumber, secondNumber);
      numberToGuess = getDigitFromNumber(firstNumber[0])[0].toString().repeat(3) + getDigitFromNumber(secondNumber[0])[0].toString().repeat(2);
    } 
  }
  return numberToGuess;
}

function mergeMaybe(maybeArr, result) {
  if(opponentNumber.result.firstHalf.length == 3 && opponentNumber.result.secondHalf.length == 2) {
    opponentNumber.actualResult.push(opponentNumber.result.firstHalf.join("") + opponentNumber.result.secondHalf.join(""));
  } else if(maybeArr.length > 0) {
    for(var m = 0;  m < maybeArr.length; m++) {
      var firstResult = maybeArr[m];
      for(var i = m+1; i < maybeArr.length; i++) {
        if(m == i)
          break;
        var secondResult = maybeArr[i];
        for(var j = 0; j < 2; j++) {
          for(var k = 0; k < 2; k++) {
            var firstHalf = firstResult[j]["firstHalf"] + secondResult[k]["firstHalf"] + result.firstHalf.join("");
            var secondHalf = firstResult[j]["secondHalf"] + secondResult[k]["secondHalf"] + result.secondHalf.join("");
            if(firstHalf.length <= 3 && secondHalf.length <= 2) {
                
                if(firstHalf.length + secondHalf.length < 5 && opponentNumber.useToGuess.length > 0) {
                  var remain = opponentNumber.useToGuess[0];
                  if(remain[2] == 0) {
                    if(firstHalf.length < 3)
                      firstHalf =  firstHalf + getDigitFromNumber(remain[0])[1].toString()
                    else 
                      secondHalf =  secondHalf + getDigitFromNumber(remain[0])[0].toString();
                  } else {
                    if(firstHalf.length < 3)
                      firstHalf =  firstHalf + getDigitFromNumber(remain[0])[0].toString()
                    else 
                     secondHalf + getDigitFromNumber(remain[0])[1].toString();                
                  }
                }
                if(firstHalf.length + secondHalf.length == 5) {
                  opponentNumber.actualResult.push(firstHalf + secondHalf);
                }
            }
          }
        }
      }  
      if(opponentNumber.actualResult.length == 0) {
        for(var l = 0; l < 2; l++) {
          var firstHalf = firstResult[l]["firstHalf"] + result.firstHalf.join("");
          var secondHalf = firstResult[l]["secondHalf"] + result.secondHalf.join("");
          if(firstHalf.length <= 3 && secondHalf.length <= 2) {
                if(firstHalf.length + secondHalf.length < 5 && opponentNumber.useToGuess.length > 0) {
                  var remain = opponentNumber.useToGuess[0];
                  if(remain[2] == 0) {
                    if(firstHalf.length < 3)
                      firstHalf =  firstHalf + getDigitFromNumber(remain[0])[1].toString()
                    else 
                      secondHalf =  secondHalf + getDigitFromNumber(remain[0])[0].toString();
                  } else {
                    if(firstHalf.length < 3)
                      firstHalf =  firstHalf + getDigitFromNumber(remain[0])[0].toString()
                    else 
                     secondHalf + getDigitFromNumber(remain[0])[1].toString();                
                  }
                }
                if(firstHalf.length + secondHalf.length == 5) {
                  opponentNumber.actualResult.push(firstHalf + secondHalf);
                }
            }
        }
      }
    }
      
  } else if(opponentNumber.result.firstHalf.length + opponentNumber.result.secondHalf.length < 5 && opponentNumber.useToGuess.length > 0) {
    var remain = opponentNumber.useToGuess[0];
    if(remain[2] == 0) {
      opponentNumber.result.firstHalf.length < 3? opponentNumber.result.firstHalf.push(getDigitFromNumber(remain[0])[1]): opponentNumber.result.secondHalf.push(getDigitFromNumber(remain[0])[0]);
    } else {
      opponentNumber.result.firstHalf.length < 3? opponentNumber.result.firstHalf.push(getDigitFromNumber(remain[0])[0]): opponentNumber.result.secondHalf.push(getDigitFromNumber(remain[0])[1]);                
    }
    if(opponentNumber.result.firstHalf.length + opponentNumber.result.secondHalf.length == 5) {
      opponentNumber.actualResult.push(opponentNumber.result.firstHalf.join("") + opponentNumber.result.secondHalf.join(""));
    }
  }
  
}

function sort(arr) {
  arr = arr.map(x => [x[1], x[0], x[2]]).sort().reverse().map(x => [x[1], x[0], x[2]]);
  return arr;
}

function sumArray(arr) {
  if(arr.length == 0) {
    return 0;
  } else {
    var result = 0;
    for(var i = 0; i < arr.length; i++) {
      result += arr[i];
    }
    return result;
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

// function guessOpponentNumber() {
//   opponentNumber.numberGuess++;
//   var guessNumber = generateGuessNumber();
//   alert("I guess: " + guessNumber);
//   var numberCorrectDigit = parseInt(prompt("Number correct digit: "));
//   var numberCorrectPosition = parseInt(prompt("Number correct position: "));
//   if(isNaN(numberCorrectDigit) || isNaN(numberCorrectPosition)) {
//     stop = true;
//   }
//   opponentNumber.guessedNumber.push(guessNumber);
//   opponentNumber.numberCorrectDigit.push(numberCorrectDigit);
//   opponentNumber.numberCorrectPosition.push(numberCorrectPosition);
//   if(numberCorrectDigit == 0 && opponentNumber.baseGuess) {
//     var arrDigit = getDigitFromNumber(guessNumber);
//     for(var i = 0; i < arrDigit.length; i++) {
//       opponentNumber.exclusiveDigit.push(arrDigit[i]);
//     }
//   } else if (numberCorrectDigit == 5) {
//     if(opponentNumber.special) {
//       opponentNumber.specialArrayResult.push([guessNumber, numberCorrectPosition]);
//     }
//     opponentNumber.correctResult.push([guessNumber,numberCorrectPosition]);
//   } else if (!opponentNumber.baseGuess ) {
//       console.log("run here");
//       opponentNumber.imply.push([guessNumber, numberCorrectDigit, numberCorrectPosition]);
//       console.log("imply----------", opponentNumber.imply);
//   } else {
//     opponentNumber.useToGuess.push([guessNumber, numberCorrectDigit, numberCorrectPosition]);
//   }
// }

function isWin(myNumber, numberOpponentGuess) {
  return (numCorrectNumber(myNumber, numberOpponentGuess) == 5) && (numCorrectPosition(myNumber, numberOpponentGuess) == 5);
}

function generateNumber() {
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
var opponentNumber = {
	numberGuess: 0,
	useToGuess: [],
	baseGuessArray: [],
	correctDigitArray: [],
	correctPositionArray: []
}

var guessOpponentNumber = function() {
	opponentNumber.numberGuess++;
	console.log(opponentNumber.correctDigitArray);
	console.log(opponentNumber.correctPositionArray);

	if (opponentNumber.baseGuessArray.length < 5 && totalCorrectDigit() < 5) {
		return generateBaseGuess();
	}

	if (totalCorrectDigit() == 5) {
		opponentNumber.useToGuess = sort(opponentNumber.useToGuess);
	}
}

var totalCorrectDigit = function() {
	return opponentNumber.correctDigitArray.reduce(function(x, y) {
		return x + y;
	}, 0);
}

var generateBaseGuess = function() {
	var index = opponentNumber.numberGuess;
	return (2 * index - 1).toString().repeat(3) + ((2 * index) % 10).toString().repeat(2); 
}

function sort(arr) {
  arr = arr.map(x => [x[1], x[0], x[2]]).sort().reverse().map(x => [x[1], x[0], x[2]]);
  return arr;
}
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var songs = ["maneater", "footloose", "grenade", "promiscuous", "reunited", "escapade", "kryptonite", "unbelievable", "fantasy", "alone", "dynamite", "honey", "jump", "lollipop", "firework", "vogue", "waterfalls", "goodies", "creep", "fallin", "radioactive", "irreplaceable", "breathe", "venus", "faith", "burn", "foolish", "down", "abracadabra", "centerfold", "apologize", "lady", "low", "yeah", "physical",];
var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace;
var rightGuess;
var wordAsArr = [];
var dashesArray = [];

function initialize() {
	gameStarted = true;
	lettersGuessed = [];
	rightGuess = 0;
	wordPlace = Math.floor(Math.random() * 36);
	currentWord = songs[wordPlace];			//string
	guessesLeft = 10
	wordAsDashes = makeIntoDashes(currentWord);	//makes the dashes
	wordAsArr = currentWord.split('');			//splits the string individually
	dashesArray = wordAsDashes.split('');		//array with dashes
	document.getElementById("currentWord").innerHTML = wordAsDashes;
	document.getElementById("lettersGuessed").innerHTML = "--";
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

// THE UNDERSCORES FINALLY WORK DON'T BREAK
function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}

// keystroke function
function playGame(letter) {
	var letter = letter.toLowerCase();

	// Checks array to see if keypress is a letter
	if (alphabet.indexOf(letter) > -1) {
		if (wordAsArr.indexOf(letter) > -1) {
			rightGuess++;
			displayLetter(letter);
		}
		else {
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesLeft--;
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
				if (guessesLeft == 0) {
					alert("Wrong! The correct answer was " + currentWord);
					initialize();
					numLosses++;
					document.getElementById("incorrect").innerHTML = numLosses;
				}
			}
		}
	}
}

// Displays letter if it's in word
function displayLetter(letter) {
	// for each char in wordAsDashes, if matches currentWord --> display
	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordAsArr[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray);
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}

// Checks for win by looking for "_"
function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("Correct!  The answer was " + currentWord);
		numWins++;
		document.getElementById("correct").innerHTML = numWins;
		initialize();
	}
}

document.onkeyup = function (event) {
	if (!gameStarted) {
		document.getElementById("letsPlay").innerHTML = "";
		initialize();
		document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
		console.log(currentWord);
		gameStarted = true;
	}
	else {
		playGame(event.key);
	}
}
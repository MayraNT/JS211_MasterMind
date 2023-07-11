'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

// generateHint() should take one argument, guess.
// In generateHint(), create variables solutionArray and guessArray that each split up passed in arguments, [.split] on '' (empty string).
// Create a variable correctLetterLocations and set it to 0.
//  In a for loop, iterate over the solutionArray, comparing each index of solutionArray against the same index of guessArray. If the item matches, increment correctLetterLocations, and set that index in solutionArray to null.

// Set a variable correctLetters equal to 0.
// in a for loop, again iterate over the solutionArray.
// Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray. Save that index in a variable called targetIndex.
// Now, if targetIndex is greater than -1(it exists in the array), increment correctLetters and set the item in solutionArray at that index equal to null.

//  return a string that prints out the hints you generated, with correctLetterLocations, correctLetters, separated by a hyphen.

const generateHint = (guess) =>  {
  let solutionArray = solution.split('');
  let guessArray = guess.split('');

  let correctLetterLocations = 0;
  let correctLetters = 0;

  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  for (let i = 0; i < solutionArray.length; i++) {
    let targetIndex = solutionArray.indexOf(guessArray[i]);
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }

  return `${correctLetterLocations}-${correctLetters}`;
}

// Define a variable called hint that collects the returned value of generateHint(guess). 
// .push the guess and the hint (as a combined string) into the board.

// In mastermind(), if the guess you passed in equals the solution, return 'You guessed it!';
// After 10 incorrect guesses, if the board length equals 10, return 'You ran out of turns! The solution was' and the solution. 
// Otherwise, return 'Guess again.'.

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution

  let hint = generateHint(guess);
  board.push(`${guess} ${hint}`);
  
  if (guess === solution) {
    console.log('You guessed it!'); // return 'You guessed it!';
  } else if (board.length === 10) {
    console.log('You ran out of turns! The solution was ' + solution); // return 'You ran out of turns! The solution was ' + solution;
  } else {
    console.log('Guess again.'); // return 'Guess again.';
  }
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
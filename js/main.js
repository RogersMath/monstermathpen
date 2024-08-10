// main.js
import { generateNarrative } from './narrativeGenerator.js';
import { generateProblem } from './problemGenerator.js';
import { getMonster, updateMonster } from './monsterManager.js';

// ... (previous code remains the same)

function handleDungeonScene(input) {
    switch (input) {
        case '1':
        case '2':
        case '3':
            encounterMonster();
            break;
        case '4':
            gameState.currentScene = 'village';
            updateGameOutput(generateNarrative('village', 'return'));
            presentVillageOptions();
            break;
        default:
            updateGameOutput("Invalid choice. Please try again.");
    }
}

function encounterMonster() {
    const monsterTypes = Object.keys(monsters);
    const randomMonster = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    gameState.currentMonster = getMonster(randomMonster);
    
    updateGameOutput(generateNarrative('dungeon', 'encounter').replace('{monster}', gameState.currentMonster.name));
    updateGameOutput(gameState.currentMonster.catchPhrase);
    
    presentMathChallenge();
}

function presentMathChallenge() {
    gameState.currentProblem = generateProblem(gameState.currentMonster.type, gameState.currentMonster.baseLevel);
    updateGameOutput(`${gameState.currentMonster.name} challenges you with a problem: ${gameState.currentProblem.question}`);
    updateGameOutput("Enter your answer:");
}

function handleMathProblem(userAnswer) {
    const correctAnswer = gameState.currentProblem.answer;
    if (Number(userAnswer) === correctAnswer) {
        updateGameOutput(generateNarrative('battle', 'victory').replace('{monster}', gameState.currentMonster.name));
        updateGameOutput(`Congratulations! You've captured the ${gameState.currentMonster.name}!`);
        gameState.playerStats.monstersCaptured++;
        gameState.monsterPen.push(gameState.currentMonster);
        updatePlayerStats();
    } else {
        updateGameOutput(`That's not quite right. The correct answer was ${correctAnswer}.`);
        updateGameOutput(generateNarrative('battle', 'defeat').replace('{monster}', gameState.currentMonster.name));
        updateGameOutput("Don't worry, you'll have another chance to catch a monster!");
    }
    
    gameState.currentProblem = null;
    gameState.currentMonster = null;
    
    // Give player the option to continue exploring or return to village
    updateGameOutput("What would you like to do next?");
    updateGameOutput("1. Continue exploring the dungeon");
    updateGameOutput("2. Return to the village");
}

function handleUserInput() {
    const userInput = userInputField.value.trim();
    userInputField.value = '';

    if (gameState.currentProblem) {
        handleMathProblem(userInput);
    } else if (gameState.currentScene === 'village') {
        handleVillageScene(userInput);
    } else if (gameState.currentScene === 'dungeon') {
        handleDungeonScene(userInput);
    }
}

// ... (rest of the code remains the same)

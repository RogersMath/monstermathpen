// main.js
import { generateNarrative } from './narrativeGenerator.js';
import { generateProblem } from './problemGenerator.js';
import { getMonster, updateMonster } from './monsterManager.js';

// DOM elements
const gameOutput = document.getElementById('game-output');
const userInputField = document.getElementById('user-input-field');
const submitBtn = document.getElementById('submit-btn');
const playerLevel = document.getElementById('player-level');
const additionSkill = document.getElementById('addition-skill');
const subtractionSkill = document.getElementById('subtraction-skill');
const monstersCaptured = document.getElementById('monsters-captured');

// Game state
let gameState = {
    currentScene: 'village',
    playerStats: {
        level: 1,
        additionSkill: 1,
        subtractionSkill: 1,
        monstersCaptured: 0
    },
    monsterPen: [],
    currentProblem: null,
    currentMonster: null
};

function updateGameOutput(message) {
    const p = document.createElement('p');
    p.textContent = message;
    gameOutput.appendChild(p);
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

function updatePlayerStats() {
    playerLevel.textContent = `Level: ${gameState.playerStats.level}`;
    additionSkill.textContent = `Addition Skill: ${gameState.playerStats.additionSkill}`;
    subtractionSkill.textContent = `Subtraction Skill: ${gameState.playerStats.subtractionSkill}`;
    monstersCaptured.textContent = `Monsters Captured: ${gameState.playerStats.monstersCaptured}`;
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

function handleVillageScene(input) {
    switch (input) {
        case '1':
            gameState.currentScene = 'dungeon';
            const dungeonEntry = generateNarrative('dungeon', 'enter');
            updateGameOutput(dungeonEntry);
            presentDungeonOptions();
            break;
        case '2':
            updateGameOutput(generateNarrative('village', 'trader'));
            break;
        case '3':
            updateGameOutput(generateNarrative('village', 'monsterPen'));
            displayMonsterPen();
            break;
        case '4':
            updateGameOutput(generateNarrative('village', 'stats'));
            updatePlayerStats();
            break;
        default:
            updateGameOutput("Invalid choice. Please try again.");
    }
}

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
    const monsterTypes = ['numberNibbler', 'subtractionSerpent'];
    const randomMonster = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    gameState.currentMonster = getMonster(randomMonster);
    
    if (!gameState.currentMonster) {
        console.error('Failed to get monster:', randomMonster);
        updateGameOutput("Oops! Something went wrong. Let's try again.");
        presentDungeonOptions();
        return;
    }
    
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
    if (!gameState.currentProblem) {
        console.error('No current problem found');
        updateGameOutput("Oops! Something went wrong. Let's continue exploring.");
        presentDungeonOptions();
        return;
    }

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
    }
    
    gameState.currentProblem = null;
    gameState.currentMonster = null;
    
    updateGameOutput("What would you like to do next?");
    updateGameOutput("1. Continue exploring the dungeon");
    updateGameOutput("2. Return to the village");
}

function presentVillageOptions() {
    updateGameOutput(generateNarrative('village', 'enter'));
    updateGameOutput("What would you like to do?");
    updateGameOutput("1. Enter the dungeon");
    updateGameOutput("2. Visit the Monster Trader");
    updateGameOutput("3. Check your Monster Pen");
    updateGameOutput("4. View your stats");
}

function presentDungeonOptions() {
    updateGameOutput("Which way do you want to go?");
    updateGameOutput("1. Take the left path");
    updateGameOutput("2. Go straight ahead");
    updateGameOutput("3. Choose the right tunnel");
    updateGameOutput("4. Return to the village");
}

function displayMonsterPen() {
    if (gameState.monsterPen.length === 0) {
        updateGameOutput("Your Monster Pen is empty. Capture some monsters in the dungeon!");
    } else {
        gameState.monsterPen.forEach(monster => {
            updateGameOutput(`${monster.name} - Level ${monster.baseLevel} ${monster.type} type`);
        });
    }
}

async function initGame() {
    console.log("Initializing game...");
    updateGameOutput("Loading Math Monster Pen...");
    
    try {
        const [narrativeResponse, monstersResponse] = await Promise.all([
            fetch('/data/narrativeElements.json'),
            fetch('/data/monsters.json')
        ]);
        
        if (!narrativeResponse.ok || !monstersResponse.ok) {
            throw new Error(`HTTP error! status: ${narrativeResponse.status}, ${monstersResponse.status}`);
        }

        const narrativeData = await narrativeResponse.json();
        const monstersData = await monstersResponse.json();

        console.log('Narrative data loaded:', narrativeData);
        console.log('Monsters data loaded:', monstersData);

        updateGameOutput("Welcome to Math Monster Pen!");
        presentVillageOptions();
    } catch (error) {
        console.error('Error loading game data:', error);
        updateGameOutput("Error loading game data. Please check the console and try again.");
    }
}

// Event listeners
submitBtn.addEventListener('click', handleUserInput);
userInputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Initialize the game
initGame();

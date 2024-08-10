// main.js
let gameState = {
    playerLevel: 1,
    monsters: [],
    currentLocation: 'village'
};

function initGame() {
    MonsterManager.loadMonsters();
    updateGameArea();
}

function updateGameArea() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    if (gameState.currentLocation === 'village') {
        displayVillage();
    } else if (gameState.currentLocation === 'dungeon') {
        displayDungeon();
    }
}

function displayVillage() {
    const gameArea = document.getElementById('game-area');
    const narrative = NarrativeGenerator.generate('village', 'enter');
    
    gameArea.innerHTML = `
        <p class="mb-4">${narrative}</p>
        <button onclick="enterDungeon()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enter Dungeon
        </button>
        <button onclick="viewMonsters()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
            View Monsters
        </button>
    `;
}

function displayDungeon() {
    const gameArea = document.getElementById('game-area');
    const narrative = NarrativeGenerator.generate('dungeon', 'enter');
    
    gameArea.innerHTML = `
        <p class="mb-4">${narrative}</p>
        <button onclick="encounter()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Find Monster
        </button>
        <button onclick="returnToVillage()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
            Return to Village
        </button>
    `;
}

function enterDungeon() {
    gameState.currentLocation = 'dungeon';
    updateGameArea();
}

function returnToVillage() {
    gameState.currentLocation = 'village';
    updateGameArea();
}

function viewMonsters() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2 class="text-2xl font-bold mb-4">Your Monsters</h2>';
    
    gameState.monsters.forEach(monster => {
        gameArea.innerHTML += `
            <div class="mb-2">
                <strong>${monster.name}</strong> (Level ${monster.level}) - ${monster.type}
            </div>
        `;
    });
    
    gameArea.innerHTML += `
        <button onclick="returnToVillage()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Back to Village
        </button>
    `;
}

function encounter() {
    const monster = MonsterManager.getRandomMonster(gameState.playerLevel);
    const problem = ProblemGenerator.generate(monster.type, gameState.playerLevel);
    
    const gameArea = document.getElementById('game-area');
    const narrative = NarrativeGenerator.generate('dungeon', 'encounter', { monster: monster.name });
    
    gameArea.innerHTML = `
        <p class="mb-4">${narrative}</p>
        <p class="mb-4">Solve this problem to catch ${monster.name}:</p>
        <p class="mb-4 font-bold">${problem.question}</p>
        <input type="text" id="answer" class="border-2 border-gray-300 p-2 rounded" placeholder="Your answer">
        <button onclick="checkAnswer('${problem.answer}', '${monster.name}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Submit
        </button>
    `;
}

function checkAnswer(correctAnswer, monsterName) {
    const userAnswer = document.getElementById('answer').value;
    const gameArea = document.getElementById('game-area');
    
    if (userAnswer === correctAnswer) {
        const monster = MonsterManager.getMonsterByName(monsterName);
        gameState.monsters.push(monster);
        const narrative = NarrativeGenerator.generate('dungeon', 'success', { monster: monsterName });
        gameArea.innerHTML = `
            <p class="mb-4">${narrative}</p>
            <button onclick="encounter()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Find Another Monster
            </button>
            <button onclick="returnToVillage()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                Return to Village
            </button>
        `;
    } else {
        const narrative = NarrativeGenerator.generate('dungeon', 'failure', { monster: monsterName });
        gameArea.innerHTML = `
            <p class="mb-4">${narrative}</p>
            <button onclick="encounter()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Try Again
            </button>
            <button onclick="returnToVillage()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                Return to Village
            </button>
        `;
    }
}

window.onload = initGame;

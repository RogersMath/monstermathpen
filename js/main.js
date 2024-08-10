// main.js
let gameState = {
    playerLevel: 1,
    monsters: [],
    currentLocation: 'village',
    gold: 0
};

// ... (keep existing functions)

function viewMonsters() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2 class="text-2xl font-bold mb-4">Your Monsters</h2>';
    
    gameState.monsters.forEach((monster, index) => {
        gameArea.innerHTML += `
            <div class="mb-2">
                <strong>${monster.name}</strong> (Level ${monster.level}) - ${monster.type}
                <button onclick="sellMonster(${index})" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2">
                    Sell
                </button>
            </div>
        `;
    });
    
    gameArea.innerHTML += `
        <button onclick="showMergeOptions()" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
            Merge Monsters
        </button>
        <button onclick="returnToVillage()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Back to Village
        </button>
        <p class="mt-4">Gold: ${gameState.gold}</p>
    `;
}

function sellMonster(index) {
    const monster = gameState.monsters[index];
    const value = MonsterManager.calculateMonsterValue(monster);
    gameState.gold += value;
    gameState.monsters.splice(index, 1);
    viewMonsters();
}

function showMergeOptions() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2 class="text-2xl font-bold mb-4">Merge Monsters</h2>';
    
    gameArea.innerHTML += '<p>Select three monsters to merge:</p>';
    
    gameState.monsters.forEach((monster, index) => {
        gameArea.innerHTML += `
            <div class="mb-2">
                <input type="checkbox" id="monster${index}" name="mergeMonster" value="${index}">
                <label for="monster${index}">${monster.name} (Level ${monster.level}) - ${monster.type}</label>
            </div>
        `;
    });
    
    gameArea.innerHTML += `
        <button onclick="mergeSelectedMonsters()" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
            Merge
        </button>
        <button onclick="viewMonsters()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Cancel
        </button>
    `;
}

function mergeSelectedMonsters() {
    const selectedMonsters = Array.from(document.querySelectorAll('input[name="mergeMonster"]:checked'))
        .map(input => parseInt(input.value))
        .map(index => gameState.monsters[index]);
    
    if (selectedMonsters.length !== 3) {
        alert('Please select exactly three monsters to merge.');
        return;
    }
    
    if (gameState.gold < 5) {
        alert('Not enough gold to merge monsters. Merging costs 5 gold.');
        return;
    }
    
    gameState.gold -= 5;
    
    const problem = ProblemGenerator.generateOrderOfOperations(selectedMonsters);
    const gameArea = document.getElementById('game-area');
    
    gameArea.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Monster Merge Challenge</h2>
        <p class="mb-4">Solve this problem to complete the merge:</p>
        <p class="mb-4 font-bold">${problem.question}</p>
        <input type="text" id="mergeAnswer" class="border-2 border-gray-300 p-2 rounded" placeholder="Your answer">
        <button onclick="checkMergeAnswer('${problem.answer}', ${JSON.stringify(selectedMonsters)})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Submit
        </button>
    `;
}

function checkMergeAnswer(correctAnswer, selectedMonsters) {
    const userAnswer = document.getElementById('mergeAnswer').value;
    const gameArea = document.getElementById('game-area');
    
    if (userAnswer === correctAnswer) {
        const newMonster = MonsterManager.mergeMonsters(selectedMonsters);
        gameState.monsters = gameState.monsters.filter(monster => !selectedMonsters.includes(monster));
        gameState.monsters.push(newMonster);
        
        gameArea.innerHTML = `
            <p class="mb-4">Congratulations! You've successfully merged the monsters into a new ${newMonster.name}!</p>
            <button onclick="viewMonsters()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Monsters
            </button>
        `;
    } else {
        gameArea.innerHTML = `
            <p class="mb-4">Oops! That's not correct. The merge was unsuccessful, but you can try again.</p>
            <button onclick="viewMonsters()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Monsters
            </button>
        `;
    }
}

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

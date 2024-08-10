// monsterManager.js
const MonsterManager = {
    monsters: [],

    loadMonsters() {
        fetch('data/monsters.json')
            .then(response => response.json())
            .then(data => {
                this.monsters = Object.values(data);
            })
            .catch(error => console.error('Error loading monsters:', error));
    },

    getRandomMonster(playerLevel) {
        const availableMonsters = this.monsters.filter(
            monster => playerLevel >= monster.minPlayerLevel && playerLevel <= monster.maxPlayerLevel
        );
        return availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
    },

    getMonsterByName(name) {
        return this.monsters.find(monster => monster.name === name);
    }
};

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
        const monster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
        return { ...monster, level: 0 };  // Set initial level to 0
    },

    getMonsterByName(name) {
        return this.monsters.find(monster => monster.name === name);
    },

    calculateMonsterValue(monster) {
        const baseValue = 1;
        const levelMultiplier = 1.5;
        const complexityMultiplier = {
            'Addition': 1,
            'Subtraction': 1.2,
            'Multiplication': 1.5,
            'Division': 1.8,
            'Fractions': 2,
            'Decimals': 2.2,
            'Percentages': 2.4,
            'Algebra': 2.6,
            'Geometry': 2.8,
            'Probability': 3,
            'Statistics': 3.2,
            'Trigonometry': 3.4,
            'Calculus': 3.6,
            'Vectors': 3.8,
            'Matrices': 4
        };

        return Math.floor(
            baseValue * 
            Math.pow(levelMultiplier, monster.level) * 
            (complexityMultiplier[monster.type] || 1)
        );
    },

    mergeMonsters(selectedMonsters) {
        const newLevel = Math.max(...selectedMonsters.map(m => m.level)) + 1;
        const types = selectedMonsters.map(m => m.type);
        const newType = this.selectMergedType(types);
        const baseMonster = this.getMonsterByName(this.monsters.find(m => m.type === newType).name);

        return {
            ...baseMonster,
            level: newLevel
        };
    },

    selectMergedType(types) {
        const typeCounts = types.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        const totalCount = types.length;
        const random = Math.random();

        let cumulativeProbability = 0;
        for (const [type, count] of Object.entries(typeCounts)) {
            cumulativeProbability += count / totalCount;
            if (random < cumulativeProbability) {
                return type;
            }
        }

        return types[0];  // Fallback to first type if something goes wrong
    }
};

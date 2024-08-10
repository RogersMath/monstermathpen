// monsterManager.js

import monsters from '../data/monsters.json';

/**
 * Retrieves a monster by its ID.
 * @param {string} id - The unique identifier of the monster
 * @returns {Object} A copy of the monster object
 */
export function getMonster(id) {
    if (!monsters[id]) {
        console.warn(`Monster with id ${id} not found.`);
        return null;
    }
    return { ...monsters[id], id }; // Return a copy with the id included
}

/**
 * Updates a monster's stats.
 * @param {string} id - The unique identifier of the monster
 * @param {Object} updates - An object containing the stats to update
 * @returns {Object} The updated monster object
 */
export function updateMonster(id, updates) {
    if (!monsters[id]) {
        console.warn(`Cannot update: Monster with id ${id} not found.`);
        return null;
    }
    
    const updatedMonster = { ...monsters[id], ...updates };
    monsters[id] = updatedMonster;
    return { ...updatedMonster, id };
}

/**
 * Levels up a monster, increasing its stats.
 * @param {string} id - The unique identifier of the monster
 * @returns {Object} The leveled-up monster object
 */
export function levelUpMonster(id) {
    const monster = monsters[id];
    if (!monster) {
        console.warn(`Cannot level up: Monster with id ${id} not found.`);
        return null;
    }

    const leveledUpMonster = {
        ...monster,
        level: monster.level + 1,
        power: Math.floor(monster.power * 1.1),  // 10% increase in power
    };

    monsters[id] = leveledUpMonster;
    return { ...leveledUpMonster, id };
}

/**
 * Generates a random monster encounter based on player's level.
 * @param {number} playerLevel - The current level of the player
 * @returns {Object} A randomly selected monster object
 */
export function generateRandomEncounter(playerLevel) {
    const availableMonsters = Object.entries(monsters).filter(([_, monster]) => 
        monster.minPlayerLevel <= playerLevel && monster.maxPlayerLevel >= playerLevel
    );

    if (availableMonsters.length === 0) {
        console.warn(`No suitable monsters found for player level ${playerLevel}`);
        return null;
    }

    const [id, monster] = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
    return { ...monster, id };
}

/**
 * Creates a new instance of a monster for the player's collection.
 * @param {string} id - The unique identifier of the monster type
 * @param {string} nickname - An optional nickname for the monster
 * @returns {Object} A new monster instance
 */
export function createMonsterInstance(id, nickname = '') {
    const baseMonster = monsters[id];
    if (!baseMonster) {
        console.warn(`Cannot create instance: Monster type with id ${id} not found.`);
        return null;
    }

    return {
        ...baseMonster,
        instanceId: generateUniqueId(),
        nickname: nickname || baseMonster.name,
        level: 1,
        experience: 0,
    };
}

/**
 * Generates a unique ID for monster instances.
 * @returns {string} A unique identifier
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

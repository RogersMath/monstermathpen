// narrativeGenerator.js

import narrativeElements from '../data/narrativeElements.json';

/**
 * Generates a narrative snippet based on the given scene and action.
 * @param {string} scene - The current game scene (e.g., 'village', 'dungeon')
 * @param {string} action - The specific action or event (e.g., 'enter', 'encounter')
 * @returns {string} A randomly selected narrative snippet
 */
export function generateNarrative(scene, action) {
    if (!narrativeElements[scene] || !narrativeElements[scene][action]) {
        console.warn(`No narrative elements found for scene: ${scene}, action: ${action}`);
        return "You continue your adventure...";
    }

    const possibleNarratives = narrativeElements[scene][action];
    return possibleNarratives[Math.floor(Math.random() * possibleNarratives.length)];
}

/**
 * Generates a mood-appropriate response based on the game event.
 * @param {string} event - The type of event (e.g., 'success', 'failure', 'neutral')
 * @returns {string} A mood-appropriate response
 */
export function generateResponse(event) {
    const responses = {
        success: [
            "Great job!",
            "Excellent work!",
            "You're doing amazing!",
            "Fantastic solving!",
            "You're a math wizard!"
        ],
        failure: [
            "Don't worry, you'll get it next time!",
            "Keep trying, you're getting closer!",
            "Math can be tricky, but you're improving!",
            "That was a tough one, but you're learning!",
            "Remember, every attempt makes you stronger!"
        ],
        neutral: [
            "Let's see what happens next...",
            "The adventure continues!",
            "What will you discover now?",
            "The math monsters await your next move.",
            "Your journey through the world of math marches on!"
        ]
    };

    if (!responses[event]) {
        console.warn(`No responses found for event: ${event}`);
        return "The adventure continues...";
    }

    return responses[event][Math.floor(Math.random() * responses[event].length)];
}

/**
 * Generates a description for a specific location or object in the game.
 * @param {string} item - The item or location to describe
 * @returns {string} A description of the item or location
 */
export function generateDescription(item) {
    const descriptions = {
        village: [
            "A quaint settlement bustling with the energy of math enthusiasts.",
            "A cozy village where numbers and equations float in the air.",
            "A lively community of math lovers and monster tamers."
        ],
        dungeon: [
            "A maze-like structure with walls covered in mysterious mathematical symbols.",
            "A dim, winding labyrinth echoing with the whispers of arithmetic challenges.",
            "An ancient stronghold where math monsters roam freely, waiting to test your skills."
        ],
        monsterPen: [
            "A comfortable enclosure where your captured math monsters rest and play.",
            "A vibrant habitat filled with the cheerful sounds of your math monster friends.",
            "A secure area where your loyal math monsters eagerly await their next adventure."
        ]
    };

    if (!descriptions[item]) {
        console.warn(`No description found for item: ${item}`);
        return "An intriguing part of your math adventure.";
    }

    return descriptions[item][Math.floor(Math.random() * descriptions[item].length)];
}

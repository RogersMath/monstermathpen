// problemGenerator.js

/**
 * Generates a math problem based on the specified type and difficulty.
 * @param {string} type - The type of math problem (e.g., 'addition', 'subtraction')
 * @param {number} difficulty - The difficulty level of the problem (1-5)
 * @returns {Object} An object containing the problem question and answer
 */
export function generateProblem(type, difficulty) {
    switch (type.toLowerCase()) {
        case 'addition':
            return generateAdditionProblem(difficulty);
        case 'subtraction':
            return generateSubtractionProblem(difficulty);
        default:
            console.warn(`Unsupported problem type: ${type}`);
            return generateAdditionProblem(1); // Fallback to easy addition
    }
}

/**
 * Generates an addition problem.
 * @param {number} difficulty - The difficulty level of the problem (1-5)
 * @returns {Object} An object containing the addition problem question and answer
 */
function generateAdditionProblem(difficulty) {
    let num1, num2;
    switch (difficulty) {
        case 1:
            num1 = getRandomInt(1, 10);
            num2 = getRandomInt(1, 10);
            break;
        case 2:
            num1 = getRandomInt(10, 50);
            num2 = getRandomInt(10, 50);
            break;
        case 3:
            num1 = getRandomInt(50, 100);
            num2 = getRandomInt(50, 100);
            break;
        case 4:
            num1 = getRandomInt(100, 500);
            num2 = getRandomInt(100, 500);
            break;
        case 5:
            num1 = getRandomInt(500, 1000);
            num2 = getRandomInt(500, 1000);
            break;
        default:
            num1 = getRandomInt(1, 10);
            num2 = getRandomInt(1, 10);
    }

    return {
        question: `${num1} + ${num2} = ?`,
        answer: num1 + num2
    };
}

/**
 * Generates a subtraction problem.
 * @param {number} difficulty - The difficulty level of the problem (1-5)
 * @returns {Object} An object containing the subtraction problem question and answer
 */
function generateSubtractionProblem(difficulty) {
    let num1, num2;
    switch (difficulty) {
        case 1:
            num1 = getRandomInt(5, 20);
            num2 = getRandomInt(1, num1);
            break;
        case 2:
            num1 = getRandomInt(20, 50);
            num2 = getRandomInt(10, num1);
            break;
        case 3:
            num1 = getRandomInt(50, 100);
            num2 = getRandomInt(25, num1);
            break;
        case 4:
            num1 = getRandomInt(100, 500);
            num2 = getRandomInt(50, num1);
            break;
        case 5:
            num1 = getRandomInt(500, 1000);
            num2 = getRandomInt(100, num1);
            break;
        default:
            num1 = getRandomInt(5, 20);
            num2 = getRandomInt(1, num1);
    }

    return {
        question: `${num1} - ${num2} = ?`,
        answer: num1 - num2
    };
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} A random integer between min and max
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a word problem based on the specified type and difficulty.
 * @param {string} type - The type of math problem (e.g., 'addition', 'subtraction')
 * @param {number} difficulty - The difficulty level of the problem (1-5)
 * @returns {Object} An object containing the word problem question and answer
 */
export function generateWordProblem(type, difficulty) {
    const problem = generateProblem(type, difficulty);
    const scenarios = {
        addition: [
            (a, b) => `If a Number Nibbler has ${a} berries and finds ${b} more, how many berries does it have in total?`,
            (a, b) => `A Subtraction Serpent collects ${a} pebbles on Monday and ${b} pebbles on Tuesday. How many pebbles did it collect in total?`
        ],
        subtraction: [
            (a, b) => `A Math Mage had ${a} spell books but lent ${b} to a friend. How many spell books does the Math Mage have left?`,
            (a, b) => `If a Fraction Fox has ${a} treats and eats ${b} of them, how many treats are left?`
        ]
    };

    const scenario = scenarios[type][Math.floor(Math.random() * scenarios[type].length)];
    const [num1, num2] = problem.question.split(/[+\-]/);

    return {
        question: scenario(num1.trim(), num2.trim()),
        answer: problem.answer
    };
}

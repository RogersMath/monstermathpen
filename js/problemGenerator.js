// problemGenerator.js
const ProblemGenerator = {
    generate(type, difficulty) {
        let a, b, answer, question;

        switch (type) {
            case 'Addition':
                a = Math.floor(Math.random() * (10 * difficulty)) + 1;
                b = Math.floor(Math.random() * (10 * difficulty)) + 1;
                answer = a + b;
                question = `What is ${a} + ${b}?`;
                break;
            case 'Subtraction':
                a = Math.floor(Math.random() * (10 * difficulty)) + 1;
                b = Math.floor(Math.random() * a) + 1;
                answer = a - b;
                question = `What is ${a} - ${b}?`;
                break;
            case 'Multiplication':
                a = Math.floor(Math.random() * (5 * difficulty)) + 1;
                b = Math.floor(Math.random() * (5 * difficulty)) + 1;
                answer = a * b;
                question = `What is ${a} × ${b}?`;
                break;
            case 'Division':
                b = Math.floor(Math.random() * (5 * difficulty)) + 1;
                answer = Math.floor(Math.random() * (5 * difficulty)) + 1;
                a = b * answer;
                question = `What is ${a} ÷ ${b}?`;
                break;
            default:
                return this.generate('Addition', difficulty);
        }

        return { question, answer: answer.toString() };
    },

    generateOrderOfOperations(monsters) {
        const operations = monsters.map(monster => ({
            type: monster.type,
            difficulty: monster.level + 1
        }));

        let expression = '';
        let answer = 0;

        operations.forEach((op, index) => {
            const { a, b, result } = this.generateSubProblem(op.type, op.difficulty);
            
            if (index === 0) {
                expression = `${a} ${this.getOperatorSymbol(op.type)} ${b}`;
                answer = result;
            } else {
                const operator = this.getOperatorSymbol(op.type);
                if (operator === '*' || operator === '/') {
                    expression = `(${expression}) ${operator} ${b}`;
                } else {
                    expression += ` ${operator} ${b}`;
                }
                answer = this.calculateResult(answer, b, op.type);
            }
        });

        return {
            question: `What is the result of ${expression}?`,
            answer: answer.toString()
        };
    },

    generateSubProblem(type, difficulty) {
        let a, b, result;

        switch (type) {
            case 'Addition':
                a = Math.floor(Math.random() * (10 * difficulty)) + 1;
                b = Math.floor(Math.random() * (10 * difficulty)) + 1;
                result = a + b;
                break;
            case 'Subtraction':
                a = Math.floor(Math.random() * (10 * difficulty)) + 1;
                b = Math.floor(Math.random() * a) + 1;
                result = a - b;
                break;
            case 'Multiplication':
                a = Math.floor(Math.random() * (5 * difficulty)) + 1;
                b = Math.floor(Math.random() * (5 * difficulty)) + 1;
                result = a * b;
                break;
            case 'Division':
                b = Math.floor(Math.random() * (5 * difficulty)) + 1;
                result = Math.floor(Math.random() * (5 * difficulty)) + 1;
                a = b * result;
                break;
            default:
                return this.generateSubProblem('Addition', difficulty);
        }

        return { a, b, result };
    },

    getOperatorSymbol(type) {
        switch (type) {
            case 'Addition': return '+';
            case 'Subtraction': return '-';
            case 'Multiplication': return '*';
            case 'Division': return '/';
            default: return '+';
        }
    },

    calculateResult(a, b, type) {
        switch (type) {
            case 'Addition': return a + b;
            case 'Subtraction': return a - b;
            case 'Multiplication': return a * b;
            case 'Division': return a / b;
            default: return a + b;
        }
    }
};

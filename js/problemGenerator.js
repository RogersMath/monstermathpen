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
    }
};

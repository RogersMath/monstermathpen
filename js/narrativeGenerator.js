// narrativeGenerator.js
const NarrativeGenerator = {
    narratives: {},

    loadNarratives() {
        fetch('data/narrativeElements.json')
            .then(response => response.json())
            .then(data => {
                this.narratives = data;
            })
            .catch(error => console.error('Error loading narratives:', error));
    },

    generate(location, action, params = {}) {
        if (!this.narratives[location] || !this.narratives[location][action]) {
            return "An adventure awaits!";
        }

        const narratives = this.narratives[location][action];
        let narrative = narratives[Math.floor(Math.random() * narratives.length)];

        // Replace placeholders with actual values
        Object.keys(params).forEach(key => {
            narrative = narrative.replace(`{${key}}`, params[key]);
        });

        return narrative;
    }
};

NarrativeGenerator.loadNarratives();

// Full JSON response
const jsonResponse = {
    response: `{
        "story_title": "The Redemption of Kael",
        "genre": "Fantasy",
        "structure": {
            "exposition": {
                "setting": "A war-torn kingdom plagued by the menace of a dark sorcerer",
                "protagonist": {
                    "name": "Kael",
                    "background": "A disgraced knight, once the pride of the royal guard, now seeking redemption",
                    "traits": ["brave", "cynical", "sharp-minded", "honorable"],
                    "motivation": "To redeem his honor and protect the kingdom from the sorcerer's clutches"
                },
                "supporting_characters": [
                    { "name": "Elysia", "role": "A young mage with a mysterious past and knowledge of the sorcerer's weaknesses" },
                    { "name": "Sir Alden", "role": "Kael's former mentor who believes in his potential for redemption" }
                ],
                "conflict_introduction": "The dark sorcerer unleashes a horde of shadow creatures to conquer the kingdom",
                "tone": "Gritty and epic"
            },
            "rising_action": {
                "challenges": [
                    "Kael faces distrust from the very people he once protected",
                    "He must infiltrate the sorcerer's fortress to retrieve a crucial artifact",
                    "Betrayal from a fellow knight complicates his mission"
                ],
                "antagonist": {
                    "name": "The Dark Sorcerer Morgath",
                    "motive": "To dominate the kingdom and shroud it in eternal darkness"
                },
                "turning_points": [
                    "Elysia is captured while aiding Kael",
                    "Kael discovers the sorcerer's vulnerability to an ancient spell"
                ],
                "character_development": "Kael learns to trust others and starts to regain his sense of honor",
                "stakes": "Failure would mean not only Kael's personal demise but also the collapse of the entire kingdom"
            },
            "climax": {
                "critical_decision": "Kael chooses to use the ancient spell at the cost of his own life force",
                "conflict_resolution": "The spell weakens Morgath, allowing Kael to defeat him in battle",
                "protagonist_transformation": "Kael evolves from a guilt-ridden knight to a selfless hero, earning his redemption",
                "dramatic_tension": "A fierce showdown against Morgath amid a storm of dark magic"
            },
            "falling_action": {
                "consequences": "The kingdom slowly begins to heal from Morgath's tyranny",
                "loose_ends": [
                    "Elysia decides to continue her journey to become a master mage",
                    "Sir Alden honors Kael with a memorial ceremony"
                ],
                "antagonist_outcome": "Morgath is vanquished but whispers of his return linger",
                "protagonist_reflection": "Kael finds peace in knowing his sacrifices protected the kingdom"
            },
            "resolution": {
                "final_scene": "Kael's legacy inspires a new generation of knights while his name becomes synonymous with heroism",
                "themes": ["Redemption", "Sacrifice", "Heroism"],
                "protagonist_new_status_quo": "Kael is remembered as a hero whose selflessness saved the land",
                "closure": "The ancient spell is safeguarded, ensuring Morgath's power remains broken"
            }
        }
    }`
};

// Parse the JSON response
const parsedData = JSON.parse(jsonResponse.response);

// Map story structure into a card-friendly format
const storyStructure = [
    {
        title: "Act 1: Exposition",
        description: `
            Setting: ${parsedData.structure.exposition.setting}<br>
            Protagonist: ${parsedData.structure.exposition.protagonist.name}<br>
            Background: ${parsedData.structure.exposition.protagonist.background}<br>
            Motivation: ${parsedData.structure.exposition.protagonist.motivation}<br>
            Supporting Characters: ${parsedData.structure.exposition.supporting_characters
                .map((char) => `${char.name} (${char.role})`)
                .join(", ")}<br>
            Conflict Introduction: ${parsedData.structure.exposition.conflict_introduction}<br>
            Tone: ${parsedData.structure.exposition.tone}
        `
    },
    {
        title: "Act 2: Rising Action",
        description: `
            Challenges: ${parsedData.structure.rising_action.challenges.join(", ")}<br>
            Antagonist: ${parsedData.structure.rising_action.antagonist.name}<br>
            Turning Points: ${parsedData.structure.rising_action.turning_points.join(", ")}<br>
            Stakes: ${parsedData.structure.rising_action.stakes}<br>
            Character Development: ${parsedData.structure.rising_action.character_development}
        `
    },
    {
        title: "Act 3: Climax",
        description: `
            Critical Decision: ${parsedData.structure.climax.critical_decision}<br>
            Conflict Resolution: ${parsedData.structure.climax.conflict_resolution}<br>
            Protagonist Transformation: ${parsedData.structure.climax.protagonist_transformation}<br>
            Dramatic Tension: ${parsedData.structure.climax.dramatic_tension}
        `
    },
    {
        title: "Act 4: Falling Action",
        description: `
            Consequences: ${parsedData.structure.falling_action.consequences}<br>
            Loose Ends: ${parsedData.structure.falling_action.loose_ends.join(", ")}<br>
            Antagonist Outcome: ${parsedData.structure.falling_action.antagonist_outcome}<br>
            Protagonist Reflection: ${parsedData.structure.falling_action.protagonist_reflection}
        `
    },
    {
        title: "Act 5: Resolution",
        description: `
            Final Scene: ${parsedData.structure.resolution.final_scene}<br>
            Themes: ${parsedData.structure.resolution.themes.join(", ")}<br>
            Protagonist New Status Quo: ${parsedData.structure.resolution.protagonist_new_status_quo}<br>
            Closure: ${parsedData.structure.resolution.closure}
        `
    }
];

// Function to populate cards dynamically
function populateCards(data) {
    const container = document.getElementById("cards-container");

    data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "option";

        card.innerHTML = `
            <div class="label">
                <div class="icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="main">${item.title}</div>
            </div>
            <div class="info">${item.description}</div>
        `;
        container.appendChild(card);
    });
}

// Populate the cards
populateCards(storyStructure);

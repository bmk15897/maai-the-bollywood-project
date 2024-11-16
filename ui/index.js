// Function to make API call
async function callAPI(input) {
    const payload = {
        thread_id: "thread_TQWNMjdbAWrYYh0Gv6XQWCEO",
        message: {
            protagonist: "Kael, a disgraced knight seeking redemption.",
            context: input,
            personality: "Brave but cynical, with a sharp mind and a hidden sense of honor.",
            character_arc: "From a bitter loner driven by guilt to a selfless hero willing to sacrifice for others.",
            genre: "Fantasy",
            previous_story: {}
        }
    };

    try {
        const response = await fetch("http://127.0.0.1:5001/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return JSON.parse(data.response); // Assuming the API response is JSON stringified
    } catch (error) {
        console.error("Error calling API:", error);
        return null;
    }
}

// Function to populate cards dynamically
function populateCards(data) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear any existing cards

    const storyStructure = [
        {
            title: "Act 1: Exposition",
            description: `
                Setting: ${data.structure.exposition.setting}<br>
                Protagonist: ${data.structure.exposition.protagonist.name}<br>
                Background: ${data.structure.exposition.protagonist.background}<br>
                Motivation: ${data.structure.exposition.protagonist.motivation}<br>
                Supporting Characters: ${data.structure.exposition.supporting_characters
                    .map((char) => `${char.name} (${char.role})`)
                    .join(", ")}<br>
                Conflict Introduction: ${data.structure.exposition.conflict_introduction}<br>
                Tone: ${data.structure.exposition.tone}
            `
        },
        {
            title: "Act 2: Rising Action",
            description: `
                Challenges: ${data.structure.rising_action.challenges.join(", ")}<br>
                Antagonist: ${data.structure.rising_action.antagonist.name}<br>
                Turning Points: ${data.structure.rising_action.turning_points.join(", ")}<br>
                Stakes: ${data.structure.rising_action.stakes}<br>
                Character Development: ${data.structure.rising_action.character_development}
            `
        },
        {
            title: "Act 3: Climax",
            description: `
                Critical Decision: ${data.structure.climax.critical_decision}<br>
                Conflict Resolution: ${data.structure.climax.conflict_resolution}<br>
                Protagonist Transformation: ${data.structure.climax.protagonist_transformation}<br>
                Dramatic Tension: ${data.structure.climax.dramatic_tension}
            `
        },
        {
            title: "Act 4: Falling Action",
            description: `
                Consequences: ${data.structure.falling_action.consequences}<br>
                Loose Ends: ${data.structure.falling_action.loose_ends.join(", ")}<br>
                Antagonist Outcome: ${data.structure.falling_action.antagonist_outcome}<br>
                Protagonist Reflection: ${data.structure.falling_action.protagonist_reflection}
            `
        },
        {
            title: "Act 5: Resolution",
            description: `
                Final Scene: ${data.structure.resolution.final_scene}<br>
                Themes: ${data.structure.resolution.themes.join(", ")}<br>
                Protagonist New Status Quo: ${data.structure.resolution.protagonist_new_status_quo}<br>
                Closure: ${data.structure.resolution.closure}
            `
        }
    ];

    storyStructure.forEach((item) => {
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

// Add event listener to the button
document.getElementById("submit-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
        const apiResponse = await callAPI(userInput);
        if (apiResponse) {
            populateCards(apiResponse);
        }
    } else {
        alert("Please enter a message.");
    }
});

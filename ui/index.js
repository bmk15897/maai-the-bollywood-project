// Function to make API call
async function callAPI(input) {
    const payload = {
        thread_id: "thread_FA5pE7qNKIhfSIpfdjURnyBI", // Static thread ID
        message: input // Use only the input from the text box
    };

    try {
        // API request
        const response = await fetch("http://127.0.0.1:5001/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        return JSON.parse(data.response); // Assuming API returns a stringified JSON object
    } catch (error) {
        console.error("Error calling API:", error);
        return null;
    }
}

// Function to populate cards dynamically
function populateCards(data) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear any existing cards

    // Map the story structure into a card-friendly format
    const storyStructure = [
        {
            title: "Act 1: Exposition",
            description: `
                <strong>Setting:</strong> ${data.structure.exposition.setting}<br>
                <strong>Protagonist:</strong> ${data.structure.exposition.protagonist.name}<br>
                <strong>Background:</strong> ${data.structure.exposition.protagonist.background}<br>
                <strong>Motivation:</strong> ${data.structure.exposition.protagonist.motivation}<br>
                <strong>Supporting Characters:</strong> ${data.structure.exposition.supporting_characters
                    .map((char) => `<strong>${char.name}</strong> (${char.role})`)
                    .join(", ")}<br>
                <strong>Conflict Introduction:</strong> ${data.structure.exposition.conflict_introduction}<br>
                <strong>Tone:</strong> ${data.structure.exposition.tone}
            `
        },
        {
            title: "Act 2: Rising Action",
            description: `
                <strong>Challenges:</strong> ${data.structure.rising_action.challenges.join(", ")}<br>
                <strong>Antagonist:</strong> ${data.structure.rising_action.antagonist.name}<br>
                <strong>Turning Points:</strong> ${data.structure.rising_action.turning_points.join(", ")}<br>
                <strong>Stakes:</strong> ${data.structure.rising_action.stakes}<br>
                <strong>Character Development:</strong> ${data.structure.rising_action.character_development}
            `
        },
        {
            title: "Act 3: Climax",
            description: `
                <strong>Critical Decision:</strong> ${data.structure.climax.critical_decision}<br>
                <strong>Conflict Resolution:</strong> ${data.structure.climax.conflict_resolution}<br>
                <strong>Protagonist Transformation:</strong> ${data.structure.climax.protagonist_transformation}<br>
                <strong>Dramatic Tension:</strong> ${data.structure.climax.dramatic_tension}
            `
        },
        {
            title: "Act 4: Falling Action",
            description: `
                <strong>Consequences:</strong> ${data.structure.falling_action.consequences}<br>
                <strong>Loose Ends:</strong> ${data.structure.falling_action.loose_ends.join(", ")}<br>
                <strong>Antagonist Outcome:</strong> ${data.structure.falling_action.antagonist_outcome}<br>
                <strong>Protagonist Reflection:</strong> ${data.structure.falling_action.protagonist_reflection}
            `
        },
        {
            title: "Act 5: Resolution",
            description: `
                <strong>Final Scene:</strong> ${data.structure.resolution.final_scene}<br>
                <strong>Themes:</strong> ${data.structure.resolution.themes.join(", ")}<br>
                <strong>Protagonist New Status Quo:</strong> ${data.structure.resolution.protagonist_new_status_quo}<br>
                <strong>Closure:</strong> ${data.structure.resolution.closure}
            `
        }
    ];

    // Create cards for each act
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

// Event listener for button click
document.getElementById("submit-button").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value; // Get input from text box
    if (userInput.trim()) {
        const apiResponse = await callAPI(userInput); // Call the API with user input
        if (apiResponse) {
            populateCards(apiResponse); // Populate cards with API response
        }
    } else {
        alert("Please enter a message."); // Alert if input is empty
    }
});

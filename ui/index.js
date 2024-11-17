// Function to make API call
async function callAPI(input) {
    const payload = {
        thread_id: "thread_R1Mo6UbYsDejWHi6daJTJsp6", // Static thread ID
        message: input // Use the text box input
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
        console.log("API Response:", data); // Log the raw API response
        return JSON.parse(data.response); // Assuming the API response contains stringified JSON
    } catch (error) {
        console.error("Error calling API:", error);
        return null;
    }
}

// Function to populate score metrics
function populateScoreMetrics(metrics) {
    const metricsContainer = document.getElementById("score-metrics");
    metricsContainer.innerHTML = ""; // Clear existing metrics

    Object.entries(metrics).forEach(([key, value]) => {
        const metric = document.createElement("div");
        metric.className = "metric";
        metric.innerHTML = `
            <h3>${key.replace(/_/g, " ").toUpperCase()}</h3>
            <span>${value}/10</span>
        `;
        metricsContainer.appendChild(metric);
    });
}

// Function to populate cards dynamically
function populateCards(data) {
    const container = document.getElementById("cards-container");

    // Clear existing cards
    container.innerHTML = "";

    // Ensure the "structure" key exists in the response
    if (!data.structure) {
        console.error("Invalid API response: 'structure' key is missing.");
        return;
    }

    const storyStructure = [
        {
            title: "Act 1: Exposition",
            description: `
                <strong>Setting:</strong> ${data.structure.exposition.setting || "N/A"}<br>
                <strong>Protagonist:</strong> ${data.structure.exposition.protagonist?.name || "N/A"}<br>
                <strong>Background:</strong> ${data.structure.exposition.protagonist?.background || "N/A"}<br>
                <strong>Motivation:</strong> ${data.structure.exposition.protagonist?.motivation || "N/A"}<br>
                <strong>Supporting Characters:</strong> ${
                    data.structure.exposition.supporting_characters?.map((char) => 
                        `<strong>${char.name}</strong> (${char.role})`
                    ).join(", ") || "None"
                }<br>
                <strong>Conflict Introduction:</strong> ${data.structure.exposition.conflict_introduction || "N/A"}<br>
                <strong>Tone:</strong> ${data.structure.exposition.tone || "N/A"}
            `
        },
        {
            title: "Act 2: Rising Action",
            description: `
                <strong>Challenges:</strong> ${data.structure.rising_action?.challenges?.join(", ") || "N/A"}<br>
                <strong>Antagonist:</strong> ${data.structure.rising_action?.antagonist?.name || "N/A"}<br>
                <strong>Turning Points:</strong> ${data.structure.rising_action?.turning_points?.join(", ") || "N/A"}<br>
                <strong>Stakes:</strong> ${data.structure.rising_action?.stakes || "N/A"}<br>
                <strong>Character Development:</strong> ${data.structure.rising_action?.character_development || "N/A"}
            `
        },
        {
            title: "Act 3: Climax",
            description: `
                <strong>Critical Decision:</strong> ${data.structure.climax.critical_decision || "N/A"}<br>
                <strong>Conflict Resolution:</strong> ${data.structure.climax.conflict_resolution || "N/A"}<br>
                <strong>Protagonist Transformation:</strong> ${data.structure.climax.protagonist_transformation || "N/A"}<br>
                <strong>Dramatic Tension:</strong> ${data.structure.climax.dramatic_tension || "N/A"}
            `
        },
        {
            title: "Act 4: Falling Action",
            description: `
                <strong>Consequences:</strong> ${data.structure.falling_action?.consequences || "N/A"}<br>
                <strong>Loose Ends:</strong> ${data.structure.falling_action?.loose_ends?.join(", ") || "N/A"}<br>
                <strong>Antagonist Outcome:</strong> ${data.structure.falling_action?.antagonist_outcome || "N/A"}<br>
                <strong>Protagonist Reflection:</strong> ${data.structure.falling_action?.protagonist_reflection || "N/A"}
            `
        },
        {
            title: "Act 5: Resolution",
            description: `
                <strong>Final Scene:</strong> ${data.structure.resolution.final_scene || "N/A"}<br>
                <strong>Themes:</strong> ${data.structure.resolution.themes?.join(", ") || "N/A"}<br>
                <strong>Protagonist New Status Quo:</strong> ${data.structure.resolution.protagonist_new_status_quo || "N/A"}<br>
                <strong>Closure:</strong> ${data.structure.resolution.closure || "N/A"}
            `
        }
    ];

    storyStructure.forEach((item) => {
        if (!item.description) {
            console.warn(`Skipping empty card for title: ${item.title}`);
            return;
        }

        // Create and append the card
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
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
        const apiResponse = await callAPI(userInput); // Call the API with user input
        if (apiResponse) {
            populateScoreMetrics(apiResponse.score_metrics); // Populate score metrics
            populateCards(apiResponse); // Populate story structure cards
        }
    } else {
        alert("Please enter a message."); // Alert if input is empty
    }
});

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

function handleScrollNext() {
    const cards = document.querySelector('.con-cards');
    cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
}

function handleScrollPrev() {
    const cards = document.querySelector('.con-cards');
    cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
}

next.addEventListener('click', handleScrollNext);
prev.addEventListener('click', handleScrollPrev);

// Chart.js for the Graph
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        datasets: [{
            label: 'Sample Data',
            data: [10, 20, 15, 30, 25],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Chat Bot Logic
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const userText = userInput.value.trim();
    if (userText === '') return;

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${userText}`;
    chatMessages.appendChild(userMessage);

    // Simulate bot response
    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: I received your command: "${userText}".`;
    chatMessages.appendChild(botMessage);

    // Clear input and scroll to bottom
    userInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

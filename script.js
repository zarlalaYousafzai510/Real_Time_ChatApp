
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

// Display messages
function displayMessages() {
    chatBox.replaceChildren();

    messages.forEach(function(message) {
        const messageElement = document.createElement("div");

        messageElement.classList.add("message", message.type);

        const textElement = document.createElement("p");
        textElement.textContent = message.text;

        const timeElement = document.createElement("small");
        timeElement.textContent = message.time;

        messageElement.appendChild(textElement);
        messageElement.appendChild(timeElement);

        chatBox.appendChild(messageElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Get current time
function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Save messages
function saveMessages() {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Chatbot replies
function getBotReply(text) {
    const message = text.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
        return "Hello! How can I help you?";
    }

    if (message.includes("how are you")) {
        return "I am fine! Thank you for asking.";
    }

    if (message.includes("your name")) {
        return "I am a simple chatbot.";
    }

    if (message.includes("help")) {
        return "Sure! Tell me what you need help with.";
    }

    if (message.includes("bye")) {
        return "Goodbye! Have a nice day.";
    }

    return "Sorry, I do not understand that message.";
}

// Send message
chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    // Add user's message
    messages.push({
        text: text,
        type: "sent",
        time: getTime()
    });

    // Add chatbot reply
    messages.push({
        text: getBotReply(text),
        type: "received",
        time: getTime()
    });

    saveMessages();
    displayMessages();

    messageInput.value = "";
    messageInput.focus();
});

// Load saved messages
displayMessages();

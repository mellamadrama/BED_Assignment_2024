document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const saveChatButton = document.getElementById("saveChat");
    const clearChatButton = document.getElementById("clearChat");
    const loadChatButton = document.getElementById("loadChat");
    const userId = localStorage.getItem('userId');

    // Function to append a message to the chatbox
    const appendMessage = (sender, message) => {
        const messageWrapper = document.createElement("div");
        messageWrapper.className = sender === "user" ? "flex justify-end mb-2" : "flex justify-start mb-2";

        const messageDiv = document.createElement("div");
        messageDiv.className = sender === "user" ? "flex items-start space-x-2" : "flex items-start space-x-2";

        const img = document.createElement("img");
        img.src = sender === "user" ? "photos/abstract-user-flat-4.svg" : "photos/abstract-user-flat-4.svg";
        img.alt = `${sender} Profile Photo`;
        img.className = "w-8 h-8 rounded-full";

        const messageContent = document.createElement("div");
        messageContent.className = sender === "user" ? "bg-blue-200 p-2 rounded-lg" : "bg-gray-300 p-2 rounded-lg";
        messageContent.innerHTML = `<strong>${sender === "user" ? "You" : "Chat Bot"}:</strong> ${message}`;

        if (sender === "user") {
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(img);
        } else {
            messageDiv.appendChild(img);
            messageDiv.appendChild(messageContent);
        }

        messageWrapper.appendChild(messageDiv);
        chatbox.appendChild(messageWrapper);
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    };

    // Function to get response from Gemini API
    const getGeminiResponse = async (message, history) => {
        try {
            const response = await fetch('/generate-text', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ prompt: message, history })
            });

            if (response.ok) {
                const data = await response.json();
                return data.text;
            } else {
                throw new Error("Error communicating with Gemini API");
            }
        } catch (error) {
            console.error("Error:", error);
            return "Sorry, I am unable to respond right now.";
        }
    };

    // Event listener for sending messages
    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const message = userInput.value.trim();

        if (message) {
            const history = Array.from(chatbox.children).map(chatMessage => {
                const sender = chatMessage.querySelector("strong").innerText.replace(":", "").toLowerCase();
                const messageText = chatMessage.querySelector("div").innerText;
                return { role: sender === "you" ? "user" : "user", parts: [{ text: messageText }] };
            });

            appendMessage("user", message);
            userInput.value = "";

            // Get model response from Gemini API
            const modelResponse = await getGeminiResponse(message, history);
            appendMessage("model", modelResponse);
        }
    });

    // save chat
    saveChatButton.addEventListener("click", async () => {
        const userId = localStorage.getItem('userId');
        const messages = Array.from(chatbox.children).map(chatMessage => {
            const senderText = chatMessage.querySelector("strong").innerText.replace(":", "").toLowerCase();
            const sender = senderText === "you" ? "user" : "model"; // Ensure sender is either 'user' or 'model'
            const message = chatMessage.querySelector("div").innerText.replace(/^(You|Chat Bot): /, ''); // Remove prefix from message
            const timestamp = new Date().toISOString();
            return { sender, message, timestamp };
        });
    
        try {
            const response = await fetch("/chathistory", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ userId, chatMessages: messages })
            });
    
            if (response.ok) {
                alert("Chat saved successfully!");
            } else {
                alert("Error saving chat.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
    

    // Event listener for clearing chat
    clearChatButton.addEventListener("click", () => {
        chatbox.innerHTML = ""; // Clear the chatbox

        // Append the starting message
        const startingMessageHTML = `
            <div class="flex items-start space-x-2">
                <img src="photos/abstract-user-flat-4.svg" alt="Bot Profile Photo" class="w-8 h-8 rounded-full">
                <div class="bg-gray-300 p-2 rounded-lg mb-2">
                    <strong>Chat Bot:</strong> Hi, how can I help you?
                </div>
            </div>
        `;
        chatbox.innerHTML = startingMessageHTML;
    });

    // load chat
    loadChatButton.addEventListener("click", async () => {
        try {
            const response = await fetch(`/chathistory/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data);
                const { chatMessages } = data;
                if (!Array.isArray(chatMessages)) {
                    throw new Error("chatMessages is not an array");
                }
                chatbox.innerHTML = ""; // Clear current chat
                chatMessages.forEach(({ sender, message, timestamp }) => {
                    appendMessage(sender, message, new Date(timestamp));
                });
            } else {
                alert("Error loading chat.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});

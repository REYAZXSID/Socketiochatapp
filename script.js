const socket = io("https://your-chat-backend.vercel.app"); // Replace with your backend URL

const loginContainer = document.getElementById("login-container");
const chatContainer = document.getElementById("chat-container");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");

let user = null;

// Login with Google
loginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        user = result.user;
        setupChat();
    }).catch(error => console.error(error));
});

// Logout
logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        user = null;
        loginContainer.style.display = "block";
        chatContainer.style.display = "none";
    });
});

// Load Chat UI
function setupChat() {
    loginContainer.style.display = "none";
    chatContainer.style.display = "block";

    socket.emit("userJoined", user.displayName);

    // Listen for messages
    socket.on("receiveMessage", (data) => {
        displayMessage(data.user, data.message);
    });

    sendBtn.addEventListener("click", () => {
        const message = messageInput.value;
        if (message.trim() !== "") {
            socket.emit("sendMessage", { user: user.displayName, message });
            messageInput.value = "";
        }
    });
}

// Display messages
function displayMessage(user, message) {
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${user}:</strong> ${message}`;
    chatMessages.appendChild(msgDiv);
}

// Auto login check
auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser) {
        user = loggedUser;
        setupChat();
    }
});
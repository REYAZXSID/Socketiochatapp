require("dotenv").config(); const express = require("express"); const http = require("http"); const socketIo = require("socket.io"); const cors = require("cors"); const admin = require("firebase-admin");

const serviceAccount = require("./firebase-admin-sdk.json"); admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }); const db = admin.firestore();

const app = express(); const server = http.createServer(app); const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => { console.log("New user connected:", socket.id);

socket.on("sendMessage", async (data) => {
    await db.collection("messages").add({
        user: data.user,
        message: data.message,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    io.emit("receiveMessage", data);
});

socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
});

});

const PORT = process.env.PORT || 5000; server.listen(PORT, () => console.log(Server running on port ${PORT}));


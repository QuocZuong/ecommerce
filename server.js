import app from "./src/app.js";

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

process.on("SIGINT", () => {
    console.log("Received SIGINT. Closing server...");
    server.close(() => {
        console.log("Server closed. Exiting...");
        process.exit(0);
    });
});

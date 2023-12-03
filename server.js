import app from "./src/app.js";

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Exit Server");
    });
});

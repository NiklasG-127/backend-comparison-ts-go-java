import express from "express";
import healthRouter from "./router/healthRouter";
import "dotenv/config"
import computeRouter from "./router/computeRouter";
import orderRouter from "./router/orderRouter";

// Erstellt Server
const app = express();

// Sagt, dass JSON genutzt werden soll und Limit von 50mb bei den Dateien (Wichtig für Testing mit größeren Datenmengen)
app.use(express.json({ limit: "50mb" }));
app.disable("x-powered-by");

// Bindet die Router ein
app.use("/health", healthRouter)
app.use("/compute", computeRouter)
app.use("/orders", orderRouter)

// Sagt dem Server auf welchem Port er auf Anfragen hören soll
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server running on port " + process.env.SERVER_PORT);
})
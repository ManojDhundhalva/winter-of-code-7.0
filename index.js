const express = require("express");
const cors = require("cors");
const config = require("./config");

// Import Routes
const codeRoutes = require("./routes/code");

const app = express();

const PORT = config.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/code", codeRoutes);

// Routes
app.get("/", (_, res) => res.send("Hello, World!"));

// Start Server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
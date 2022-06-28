const express = require("express");
const mongoose = require("mongoose");
const env = require("./utils/env");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/static", express.static("./static"));

async function main() {
    console.log("Connecting to database...");
    await mongoose.connect(env.MONGODB_URI, {
        
    });

    app.listen(env.PORT, () => {
        console.log(`HTTP server started on port ${env.PORT}`);
    });
}

main();
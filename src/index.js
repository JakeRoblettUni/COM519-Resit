const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const env = require("./utils/env");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/static", express.static("./static"));

app.use("/api", require("./controllers/api"));
app.use("/", require("./controllers/frontend"));

async function main() {
    console.log("Connecting to database...");
    await mongoose.connect(env.MONGODB_URI, {
        
    });

    app.listen(env.PORT, () => {
        console.log(`HTTP server started on port ${env.PORT}`);
    });
}

main();
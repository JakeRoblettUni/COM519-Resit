const mongoose = require("mongoose");
const env = require("./utils/env");

async function main() {
    console.log("Connecting to database...");
    await mongoose.connect(env.MONGODB_URI);

    // =============================================== //
    // IMPORTS
    let User = require("./models/user");
    let File = require("./models/file");
    let Directory = require("./models/directory");

    // =============================================== //
    // CODE

    let dir = await Directory.create({
        name: "Nested Further",
        slug: "nested-further",
        owner: "62bd9eee2a734c1849841bca",
        parent: "62bda090234f34297492e11b",
    });
    console.log(dir);
    
    // =============================================== //

    await mongoose.connection.destroy();
}

main();
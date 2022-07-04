const mongoose = require("mongoose");
const env = require("./utils/env");

async function main() {
    console.log("Connecting to database...");
    await mongoose.connect(env.MONGODB_URI);

    // =============================================== //
    // IMPORTS
    let User = require("./models/user");
    let File = require("./models/file");

    // =============================================== //
    // CODE

    let file = await File.create({
        name: "file6.txt",
        slug: "file6.txt",
        path: "/dir-1/subdir-1",
        owner: "62c1e518431071dadfe041eb",
    });

    console.log(file);
    
    // =============================================== //

    await mongoose.connection.destroy();
}

main();
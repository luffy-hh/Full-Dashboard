const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const gameCategoires = require("../gameCategories/models/gameCategoryModels");
dotenv.config({ path: "./../config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Success");

    const app = require("./../app");

    const gameCatAll = JSON.parse(
      fs.readFileSync("./gameCategories.json", "utf-8")
    );

    console.log(gameCatAll);

    const importData = async () => {
      try {
        for (const gameCat of gameCatAll) {
          const gameCatName = await gameCategoires.create(gameCat);
        }
        return "Successful Import Data"; // Return a success message
      } catch (err) {
        return err.message; // Return the error message
      }
    };

    // Delete All Data
    const deleteData = async () => {
      try {
        await gameCategoires.deleteMany();
        console.log("Data All Deleted");
      } catch (err) {
        return err.message; // Return the error message
      }
    };

    (async () => {
      if (process.argv[2] === "--import") {
        console.log("Importing data...");
        const result = await importData();
        console.log(result);
      } else if (process.argv[2] === "--delete") {
        console.log("Deleting data...");
        const result = await deleteData();
        console.log(result);
      } else {
        console.log("Invalid command-line argument. Use --import or --delete.");
      }

      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log("Listening Now"));
    })();
  });

//Insert Data Command node import_gameCategoires.js --import
//Delete Data Command node import_gameCategoires.js --delete

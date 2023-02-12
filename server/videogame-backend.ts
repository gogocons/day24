import express from "express";
import fs from "fs";
import type { Videogame } from "./domain/videogame";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// at /users, I need to open that file, users.json, and then return that to the client.
app.get("/videogames", function (req, res) {
  console.log("CALLED GET VIDEOGAMES ROUTE");
  const videogames = fs.readFileSync("./videogames.json");
  res.send(videogames);
});

app.post("/videogame", function (req, res) {
  console.log("CALLED POST VIDEOGAME ROUTE");
  // req.body has the incoming JSON data.
  const name = req.body.name;
  const platform = req.body.platform;
  const releaseYear = req.body.releaseYear;
  const genre = req.body.genre;
  const ratingAgency = req.body.ratingAgency;
  const goodGame = req.body.goodGame;

  const videogame: Videogame = {
    name: name,
    platform: platform,
    releaseYear: releaseYear,
    genre: genre,
    ratingAgency: ratingAgency,
    goodGame: goodGame
  };

  // read the file, add our user to the array, save the file.
  const videogames = JSON.parse(fs.readFileSync("./videogames.json") as any as string);
  videogames.push(videogame);
  fs.writeFileSync("./videogames.json", JSON.stringify(videogames));

  res.send(videogame);
});

app.listen(3000);

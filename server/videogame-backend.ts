import express from "express";
import fs from "fs";
import type { Videogame } from "./domain/videogame";
import cors from "cors";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use(express.json());

// app.use(express.static('public'));
app.use(express.static('uploads'));

app.post("/cover", upload.single("cover-art"), function (req, res, next) {
  console.log(req.file);
  
  // TODO: append the file suffix

  // req.file is the `cover-art` file
  // req.body will hold the text fields, if there were any
});

// at /videogames, I need to open that file, videogames.json, and then return that to the client.
app.get("/videogames", function (req, res) {
  console.log("CALLED GET VIDEOGAMES ROUTE");
  const videogames = fs.readFileSync("./videogames.json");
  res.send(videogames);
});

app.post("/videogame", function (req, res) {
  console.log("CALLED POST VIDEOGAME ROUTE");

  // TODO: get the latest image upload to add to the JSON for the game data

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
    goodGame: goodGame,
  };

  // read the file, add our videogame to the array, save the file.
  const videogames = JSON.parse(
    fs.readFileSync("./videogames.json") as any as string
  );
  videogames.push(videogame);
  fs.writeFileSync("./videogames.json", JSON.stringify(videogames));

  res.send(videogame);
});

app.listen(3000);

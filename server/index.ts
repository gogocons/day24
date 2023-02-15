import express from "express";
import fs from "fs";
import cors from "cors";
import validateUserInput from "./utils/validateUserInput";
import upload from "./utils/imageUpload";
import { createAndSaveGame } from "./domain/videogame";

// this is the default image to use if user does not select an image
let coverArt: string = "http://localhost:3000/xbox-one-blank-case.png";

const app = express();

app.use(cors());
app.use(express.json());

// set to allow uploaded images to be reachable from front-end
app.use(express.static("uploads"));

app.post("/cover", upload.single("cover-art"), function (req, res, next) {
  // req.file is the `cover-art` file
  coverArt = "http://localhost:3000/" + req.file?.filename;
  res.send(coverArt);
});

// at /videogames, I need to open that file, videogames.json, and then return that to the client.
app.get("/videogames", function (req, res) {
  const videogames = fs.readFileSync("./videogames.json");
  res.send(videogames);
});

app.post("/videogame", function (req, res) {
  // req.body has the incoming JSON data.
  const image = coverArt;
  const name = req.body.name;
  const platform = req.body.platform;
  const releaseYear = req.body.releaseYear;
  const genre = req.body.genre;
  const ratingAgency = req.body.ratingAgency;
  const goodGame = req.body.goodGame;

  try {
    validateUserInput(name, platform, releaseYear, genre, ratingAgency);
  } catch (e) {
    res.status(400).send({ error: e.message });
    return;
  }

  const videogame = createAndSaveGame(
    image,
    name,
    platform,
    releaseYear,
    genre,
    ratingAgency,
    goodGame
  );

  res.send(videogame);

  // reset the default coverArt variable for next upload
  coverArt = "http://localhost:3000/xbox-one-blank-case.png";
});

app.listen(3000);

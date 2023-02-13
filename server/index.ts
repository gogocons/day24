import express from "express";
import fs from "fs";
import type { Videogame } from "./domain/videogame";
import cors from "cors";
import multer from "multer";

// below sets up the file name and storage location for the image that is uploaded by the user
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // clean the filename and keep original extension of file
    const lastDot = file.originalname.lastIndexOf(".");
    const cleanName = file.originalname
      .substring(0, lastDot)
      .replace(/([^a-z0-9]+)/gi, "-");
    const ext = file.originalname.substring(lastDot, file.originalname.length);

    cb(null, cleanName + ext);
  },
});
const upload = multer({ storage: storage });

// this is the default image to use if user does not select an image
let coverArt: string = "http://localhost:3000/xbox-one-blank-case.png";

const app = express();

app.use(cors());
app.use(express.json());

// set to allow uploaded images to be reachable from front-end
app.use(express.static("uploads"));

app.post("/cover", upload.single("cover-art"), function (req, res, next) {
  // req.file is the `cover-art` file
  console.log(req.file);
  coverArt = "http://localhost:3000/" + req.file?.filename;
  console.log(coverArt);
});

// at /videogames, I need to open that file, videogames.json, and then return that to the client.
app.get("/videogames", function (req, res) {
  console.log("CALLED GET VIDEOGAMES ROUTE");
  const videogames = fs.readFileSync("./videogames.json");
  res.send(videogames);
});

app.post("/videogame", function (req, res) {
  console.log("CALLED POST VIDEOGAME ROUTE");

  // req.body has the incoming JSON data.
  const image = coverArt;
  const name = req.body.name;
  const platform = req.body.platform;
  const releaseYear = req.body.releaseYear;
  const genre = req.body.genre;
  const ratingAgency = req.body.ratingAgency;
  const goodGame = req.body.goodGame;

  const videogame: Videogame = {
    image: image,
    name: name,
    platform: platform,
    releaseYear: releaseYear,
    genre: genre,
    ratingAgency: ratingAgency,
    goodGame: goodGame,
  };

  // reset the default coverArt variable for next upload
  coverArt = "http://localhost:3000/xbox-one-blank-case.png";

  // read the file, add our videogame to the array, save the file.
  const videogames = JSON.parse(
    fs.readFileSync("./videogames.json") as any as string
  );
  videogames.push(videogame);
  fs.writeFileSync("./videogames.json", JSON.stringify(videogames));

  res.send(videogame);
});

app.listen(3000);

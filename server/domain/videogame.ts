import fs from "fs";

type Videogame = {
  image: string;
  name: string;
  platform: string;
  releaseYear: number;
  genre: string;
  ratingAgency: string;
  goodGame: boolean;
};

function createAndSaveGame(
  image: string,
  name: string,
  platform: string,
  releaseYear: number,
  genre: string,
  ratingAgency: string,
  goodGame: boolean
): Videogame {
  const videogame: Videogame = {
    image: image,
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

  return videogame;
}

export { type Videogame, createAndSaveGame };

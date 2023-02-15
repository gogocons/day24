function validateUserInput(
  name: string,
  platform: string,
  releaseYear: number,
  genre: string,
  ratingAgency: string
) {
  if (!name) {
    throw Error("you did not enter a name");
  }

  if (name.length > 128) {
    throw Error(
      `name is too long, maximum length: 128, you entered: ${name.length}`
    );
  }

  if (!platform) {
    throw Error("you did not enter a platform");
  }

  if (platform.length > 40) {
    throw Error(
      `please use one platform per entry, maximum length: 40, you entered: ${platform.length}`
    );
  }

  if (!releaseYear) {
    throw Error("you did not enter a release year");
  }

  if (releaseYear.toString().length > 4) {
    throw Error(
      `please enter a maximum of 4 digits for year, you entered: ${
        releaseYear.toString().length
      }`
    );
  }

  if (releaseYear < 1958) {
    throw Error(
      `Tennis for Two (the first game) was created in 1958, you entered: ${releaseYear}`
    );
  }

  if (!genre) {
    throw Error("you did not enter a genre");
  }

  if (genre.length > 50) {
    throw Error(
      `your genres may be too specific, maximum length: 50, you entered: ${genre.length}`
    );
  }

  if (!ratingAgency) {
    throw Error("you did not enter a content rating");
  }

  if (ratingAgency.length > 6) {
    throw Error(
      `please limit ratings to code only, maximum length: 6, you entered: ${ratingAgency.length}`
    );
  }
}

export default validateUserInput;

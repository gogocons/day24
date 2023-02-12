import express from "express";
import fs from "fs";
import type { User } from "./domain/user";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// at /users, I need to open that file, users.json, and then return that to the client.
app.get("/user", function (req, res) {
  console.log("CALLED GET USER ROUTE");
  const users = fs.readFileSync("./users.json");
  res.send(users);
});

app.post("/user", function (req, res) {
  console.log("CALLED POST USER ROUTE");
  // req.body has the incoming JSON data.
  const name = req.body.name;
  const age = req.body.age;
  const ethereumAddress = req.body.ethereumAddress;
  
  const user: User = {
    name: name,
    age: age,
    ethereumAddress: ethereumAddress,
  };

  // read the file, add our user to the array, save the file.
  const users = JSON.parse(fs.readFileSync("./users.json") as any as string);
  users.push(user);
  fs.writeFileSync("./users.json", JSON.stringify(users));

  res.send(user);
});

app.listen(3000);

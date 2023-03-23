import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();
import { updateUser, leaderboard } from "./userController.js";
// import mongoose from 'mongoose';
// mongoose.connect('mongodb+srv://dukintosh:8Swr2EZGfpZ0lhGZ@cluster0.stx4zgo.mongodb.net/test')
// import User from './User.js'



app.use(cors());
app.use(express.json());
const api_key = "k7tf6frujdg4";
const api_secret =
  "epa5rp9hfppmyh7zrnfpefc93xuvmkyt7rkz4ub4xfjzv8mxh7ymvfncw358hx4g";
const serverClient = new StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

// Return leaderboard table from mongoose
app.get("/leaderboard", async (req, res) => {
  try {
    const message = await leaderboard()
    console.log(message)
    res.json(message)
  } catch (error) {
    res.json(error)
  }
})

// Post when user wins game
app.get("/wongame/:name", async (req, res) => {
  try {
    const message = await updateUser(req.params.name)
    console.log(message)
    res.json(message)    
  } catch (error) {
    console.log(`Error with param: ${req.params.name} :  ${error}`)
    res.json(error)
  }

})

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

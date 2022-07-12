const express = require("express");
const connect = require("./config/connectDB");
const app = express();
const router = express.Router();

const User = require("./models/User");

app.use(express.json());

connect();

//GET :  RETURN ALL USERS
app.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ msg: "all users :", allUsers });
  } catch (error) {
    res.status(400).send("failed to get");
  }
});

//POST :  ADD A NEW USER TO THE DATABASE
app.post("/adduser", async (req, res) => {
  try {
    const existUser = await User.findOne({ name: req.body.name });
    if (existUser) {
      return res.status(400).send({ msg: "name must be unique" });
    }
    const newUser = new User({ ...req.body });
    await newUser.save();
    //const allUsers = await User.find({});
    res.send({ msg: "user added !", newUser });
  } catch (error) {
    res.status(400).send("failed to add");
  }
});

//PUT : EDIT A USER BY ID
app.put("/edituser/:id", async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    const userUpdated = await User.findOne({ _id: req.params.id });

    if (result.modifiedCount) {
      return res.send({ msg: "user updated ", userUpdated });
    }
    res.status(400).send({ msg: "already updated" });
  } catch (error) {
    res.status(400).send("failed to edit");
  }
});

//DELETE : REMOVE A USER BY ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    if (deletedUser.deletedCount) {
      return res.send({ msg: "user deleted " });
    }
    res.status(400).send({ msg: "already deleted" });
  } catch (error) {
    res.status(400).send("failed to delete");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`you're listenning ${port}`);
});

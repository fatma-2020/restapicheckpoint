const express = require("express");
const connect = require("./config/connectDB");
const User = require("./models/User");
const app = express();
const port = process.env.PORT || 5000;
connect();
app.use(express.json);

const addUsers = async () => {
  try {
    const users = await User.create([
      {
        name: "ahlem",
        age: 26,
        email: "ahlem@gmail.com",
      },
      {
        name: "habiba",
        age: 25,
        email: "habiba@gmail.com",
      },
      {
        name: "fatma",
        age: 25,
        email: "fatma@gmail.com",
      },
      {
        name: "youssef",
        age: 27,
        email: "youssef@gmail.com",
      },
    ]);
    console.log(users);
  } catch (error) {
    console.error(error);
  }
};
//addUsers();

app.get("/", async (req, res) => {
  try {
    const allUsers = await Person.find({});
    console.log(allUsers);
  } catch (error) {}
});

app.post("/adduser", async (req, res) => {
  try {
    const existUser = await User.find({ name: req.body.name });
    if (existUser) {
      return res.status(400).send({ msg: "name must be unique" });
    }
    const newUser = new User({ ...req.body });
    console.log(newUser);
    newUser.save();
    const allUsers = await User.find({});
    res.send({ msg: "user added !", allUsers });
  } catch (error) {
    console.log(error);
  }
});

app.put("/edituser/:id", async (req, res) => {
  try {
    User.findByIdAndUpdate(req.params.id, { ...req.body });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    User.findByIdAndRemove(req.params.id);
  } catch (error) {}
});
app.listen(port, () => {
  console.log(`you're listenning ${port}`);
});

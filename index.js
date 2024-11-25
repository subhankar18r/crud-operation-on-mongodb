import express from "express";
import mongoose from "mongoose";

const PORT = 8000;
const app = express();

// connect with Mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/crud_app")
  .then(console.log("mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    gender: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

app.use(express.urlencoded({ extended: true }));

app
  .route("/users")
  .get(async (req, res) => {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
  })
  .post(async (req, res) => {
    try {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
      });
      return res.status(201).json({ msg: "success" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "failed" });
    }
  });

app
  .route("/users/:id")
  .all((req, res, next) => {
    const id = req.params.id;
    if (id.length !== 24) return res.status(400).json({ error: "wrong id" });
    else req.userId = id;
    next();
  })
  .get(async (req, res) => {
    const id = req.userId;
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ err: "user not exists" });
    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    const id = req.userId;
    const result = await User.findByIdAndUpdate(id, { ...req.body });
    console.log(result);
    return res.json({ msg: "success" });
  })
  .delete(async (req, res) => {
    const id = req.userId;
    const result = await User.findByIdAndDelete(id);
    if (result) {
      return res.send("user deleted" + result);
    } else {
      return res.send("user not exists");
    }
  });

app.listen(PORT, () => console.log("server running on port: " + PORT));

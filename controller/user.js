import User from "../models/userSchema.js";

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
}
async function handleCreateNewUser(req, res) {
  if (
    !req.body ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.gender
  ) {
    return res.status(400).send("give all the information");
  }

  try {
    const result = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
    });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send("something wrong");
  }
}

const handleViewOneUser = async (req, res) => {
  const id = req.userId;
  const user = await User.findById(id);
  if (!user) return res.status(400).json({ err: "user not exists" });
  return res.status(200).json(user);
};

const handleEditUser = async (req, res) => {
  const id = req.userId;
  const result = await User.findByIdAndUpdate(id, { ...req.body });
  return res.json({ msg: "success" });
};

const handleDeleteuser = async (req, res) => {
  const id = req.userId;
  const result = await User.findByIdAndDelete(id);
  if (result) {
    return res.send("user deleted" + result);
  } else {
    return res.send("user not exists");
  }
};

export {
  handleGetAllUsers,
  handleCreateNewUser,
  handleViewOneUser,
  handleEditUser,
  handleDeleteuser,
};

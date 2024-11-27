import express from "express";
import {
  handleCreateNewUser,
  handleDeleteuser,
  handleEditUser,
  handleGetAllUsers,
  handleViewOneUser,
} from "../controller/user.js";

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .all((req, res, next) => {
    const id = req.params.id;
    if (id.length !== 24) return res.status(400).json({ error: "wrong id" });
    else req.userId = id;
    next();
  })
  .get(handleViewOneUser)
  .patch(handleEditUser)
  .delete(handleDeleteuser);

export default router;

import express from "express";
import { getUsers } from "../controllers/users.controller";
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the about route
router.get("/about", getUsers)

export default router;

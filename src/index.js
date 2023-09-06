import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
// import userRouter from "./routes/users.router"

const prisma = new PrismaClient();

const app = express();

const userRouter = require("./routes/users.router")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// app.use("/api", userRouter)

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return res
        .status(400)
        .json({ ok: false, message: "list users are empty" });
    }
    return res.json({ ok: true, data: users });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Something went wrong!",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: Number(req.params.id) },
    });
    if (user) {
      return res.json({ ok: true, data: user });
    }
    return res.status(400).json({ ok: false, message: "User not exist" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Something went wrong!",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
});

app.post("/users", async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ ok: false, message: "Please enter data" });
    }
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (user) {
      return res.status(400).json({ ok: false, message: "Email was exist" });
    } else {
      const userNew = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
        },
      });
      return res.json({ ok: true, data: userNew });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Something went wrong!",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ ok: false, message: "Please enter data" });
    }
    const user = await prisma.user.update({
      where: { user_id: Number(req.params.id) },
      data: {
        name: req.body.name,
      },
    });
    return res.json({ ok: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: "Something went wrong!",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: Number(req.params.id) },
    });
    if (!user) {
      return res.status(400).json({ ok: false, message: "User not exist" });
    }
    const userDelete = await prisma.user.delete({
      where: { user_id: Number(req.params.id) },
    });
    return res.json({ ok: true, message: "Delete success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: "Something went wrong!",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

import { NextApiHandler } from "next";
import prisma from "@/prisma";

// import prisma client
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await loginUserHandler(req, res);
    } catch (error) {
      console.error(`An error occured during login`, error);
      return res.status(400).json(error);
    }
  } else {
    return res.status(405);
  }
};
const loginUserHandler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("A user with that email does not exist");

  // TODO: support encrypted passwords
  if (user.password != password)
    throw new Error("A user with that email and password does not exist");

  res.status(200).json({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};

export default handler;

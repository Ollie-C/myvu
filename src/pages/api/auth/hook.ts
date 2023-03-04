import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, secret } = req.body;

  //Check if correct request
  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed " });
  }

  //Validate if secret is correct
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: "You must provide a secret 🤫" });
  }

  //Create new user if email in body
  if (email) {
    await prisma.user.create({
      data: { email },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;

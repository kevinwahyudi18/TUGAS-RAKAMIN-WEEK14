// pages/api/auth/register.js

import bcrypt from "bcrypt";
import User from "../../../models/User"; 
import db from "../../../db";

export default async function handler(req, res) {
  await db.sync(); 

  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });

      const { password: passwordDB, ...userWithoutPassword } = user.get({ plain: true });
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: "User already exists" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

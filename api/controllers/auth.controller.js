import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import generateJwt from "../utils/generateJwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create A New User and save to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({
      sucess: true,
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user)
      return res.status(401).json({
        message: "Invalid Credentials",
      });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    const age = 1000 * 60 * 60 * 24 * 7;
    const authToken = generateJwt(user.id);
    res.cookie("token", authToken, {
      maxAge: age,
      httpOnly: true,
      // secure:true, //hhtps only so not in development
    });
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Loggedout Successfully",
  });
};

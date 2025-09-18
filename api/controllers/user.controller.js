import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
};
export const updateUser = async (req, res) => {
  const id = req.userId;
  const { username, email, password, avatar } = req.body;
  //  hash password if exists
  let hashedPassword = undefined;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        password,
        email,
        avatar,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      success: true,
      updatedUser: {
        ...updatedUser,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user data" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.userId;
  try {
    await prisma.user.delete({ where: { id } });
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const getProfilePosts = async (req,res) => {
  const userId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        postDetail: true,
      },
    });

    const saved = await prisma.savedPost.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item)=>item.post);
    
    res.status(200).json({
      success:true,
      userPosts,
      savedPosts,
    })
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: "Failed to get profile posts" });
  }
};

export const getNotificationsNumber = async (req,res) => {
  const userId = req.userId;
  try {
    const number = await prisma.chat.count({
      where:{
        userIDs: {
          hasSome:[userId] ,
        },
        NOT: {
          seenBy: {
            hasSome: [userId],
          },
        }
      }
    })
    res.status(200).json(number)
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: "Failed to get notifications" });
  }
};

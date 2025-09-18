import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const userId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== userId);
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching chats",
    });
  }
};

export const getChat = async (req, res) => {
  const chatId = req.params.id;
  const userId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });
    res.status(200).json({
      success: true,
      chat: chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat",
    });
  }
};

export const addChat = async (req, res) => {
  const userId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [userId, req.body.receiverId],
      },
    });
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating chat",
    });
  }
};

export const readChat = async (req, res) => {
  const userId = req.userId;
  const chatId = req.params.id;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error reading chat",
    });
  }
};

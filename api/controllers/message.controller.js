import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const userId = req.userId;
  const chatId = req.params.chatId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const newMessage = await prisma.message.create({
      data: {
        text: req.body.text,
        userId,
        chatId,
      },
    });

    await prisma.chat.update({
      where: { id: chatId },
      data:{
        seenBy: [userId],
        lastMessage:req.body.text,
      }
    })
    res.status(200).json({
      success: true,
      newMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to add message",
    });
  }
};

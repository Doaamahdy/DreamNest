import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const createPost = async (req, res) => {
  const userId = req.userId;
  const body = req.body;

  console.log({
    ...body.postData,
    userId,
    postDetail: {
      ...body.postDetail,
    },
  });
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    return res.status(201).json({
      success: true,
      newPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message1: err.message,
      message: "Error creating post",
    });
  }
};

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: +query.bedroom || undefined,
        bathroom: +query.bathroom || undefined,
        price: {
          gte: +query.minPrice || 0,
          lte: +query.maxPrice || 100000000,
        },
      },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err.message,
      message: "Error fetching posts",
    });
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        postDetail: true,

        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    let userId = null;
    let isPostSaved = null;
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        userId = decoded.id;
        console.log(userId);
        isPostSaved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: postId,
              userId: userId,
            },
          },
        });
      }
    }

    return res.status(200).json({
      success: true,
      post: {
        ...post,
        isSaved: isPostSaved ? true : false,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching post",
      message1: err.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not found",
      });
    }
    if (post.userId != userId) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this post",
      });
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: req.body,
    });
    return res.status(200).json({
      success: true,
      updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update message",
    });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not found",
      });
    }
    if (post.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {}
};

export const savePost = async (req, res) => {
  const postId  = req.body.postId;
  const  userId  = req.userId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          postId: postId,
          userId: userId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Post removed from saved posts",
      });
    } else {
      await prisma.savedPost.create({
        data: {
          postId,
          userId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Post saved successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving post",
      message1: err.message,
    });
  }
};

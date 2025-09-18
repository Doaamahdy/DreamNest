import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";


import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import messageRouter from "./routes/message.route.js";
import chatRouter from "./routes/chat.route.js";


dotenv.config();
const app = express();


app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  return res.json({ success: "success" });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

// REMOVED: app.listen() is not used in Vercel Serverless Functions.
// Vercel handles the server and port internally.
app.listen(3000, () => {
  console.log(`listening to the port 3000`);
});
export default app;
import mongoSanitize from "express-mongo-sanitize";
import connect from "./db";
// import fs from "fs";
import { Request, Response } from "express";
import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.routes";
import videoRouter from "./routes/video.routes";
import viewRouter from "./routes/view.routes";
import subscribeRouter from "./routes/subscribe.routes";
import commentRouter from "./routes/comment.routes";
import likeRouter from "./routes/like.routes";
const config = require("./config/key");
const app: Express = express();

// try {
//   fs.readdirSync("uploads");
// } catch (err) {
//   console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
//   fs.mkdirSync("uploads");
// }

// try {
//   fs.readdirSync("uploads/thumbnails");
// } catch (err) {
//   console.error("uploads/thumbnails 폴더가 없습니다. 폴더를 생성합니다.");
//   fs.mkdirSync("uploads/thumbnails");
// }

// try {
//   fs.readdirSync("uploads/profileImage");
// } catch (err) {
//   console.error("uploads/profileImage 폴더가 없습니다. 폴더를 생성합니다.");
//   fs.mkdirSync("uploads/profileImage");
// }

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(flash());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));

const store = new MongoStore({
  mongoUrl: config.mongoURI as string,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

app.use(
  session({
    secret: (process.env.COOKIE_SECRET as string) || "secret",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
    },
  })
);

// app.use((req: Request, res: Response, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.errors = req.flash("error");
//   next();
// });

app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/view", viewRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT || 5000}!`);
  await connect();
});

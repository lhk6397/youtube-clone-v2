import connect from "./db";
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

const app: Express = express();

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL as string }),
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT || 5000}!`);
  await connect();
});

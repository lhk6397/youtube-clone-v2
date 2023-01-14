import { Request, Response } from "express";
import moment from "moment";
import bcrypt from "bcrypt";
import User, { UserDocument } from "../models/User";
import "express-session";

declare module "express-session" {
  export interface SessionData {
    loggedInUser: UserDocument;
    isLoggedIn: boolean;
  }
}

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const existingUser = await User.exists({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      // req.flash("fail", "이미 존재하는 이름 또는 이메일입니다.");
      return res.status(400).json({
        registerSuccess: false,
        errorMessage: "이미 존재하는 이름 또는 이메일입니다.",
      });
    }
    const user: UserDocument = await User.create({
      username,
      email,
      password,
      avatarUrl: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
    });
    req.session.loggedInUser = user;
    req.session.isLoggedIn = true;
    // req.flash("success", `반갑습니다, ${req.session.loggedInUser.username}님`);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    // req.flash("fail", "회원가입에 실패하였습니다.");
    return res.status(400).json({
      registerSuccess: false,
      message: "회원가입에 실패하였습니다.",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(400).json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });

    const isMatch: boolean = await bcrypt.compare(
      password,
      foundUser.password as string
    );

    if (!isMatch) {
      // req.flash("error", "비밀번호가 일치하지 않습니다.");
      return res.status(400).json({
        loginSuccess: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    req.session.loggedInUser = foundUser;
    req.session.isLoggedIn = true;
    // req.flash("success", `반갑습니다, ${req.session.loggedInUser.username}님`);
    return res.status(200).json({
      loginSuccess: true,
      userId: foundUser._id,
    });
  } catch (error) {
    // req.flash("fail", "로그인에 실패하였습니다.");
    return res.status(400).json({
      loginSuccess: true,
      message: "로그인에 실패하였습니다.",
    });
  }
};

export const auth = (req: Request, res: Response): Response | undefined => {
  const user = req.session?.loggedInUser;
  if (user) {
    return res.status(200).json({
      _id: user._id,
      isAdmin: user.role === 0 ? false : true,
      isAuth: true,
      email: user.email,
      username: user.username,
      role: user.role,
      image: user.avatarUrl,
    });
  }
};

export const logout = (req: Request, res: Response): Response | void => {
  req.session.destroy(() => {
    return res.status(200).json({ success: true });
  });
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

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
      return res.status(200).json({
        registerSuccess: false,
        errorMessage: "이미 존재하는 이름 또는 이메일입니다.",
      });
    }
    const user: UserDocument = await User.create({
      username,
      email,
      password,
      avatarUrl: "assets/images/defaultProfileImage.png",
    });
    req.session.loggedInUser = user;
    req.session.isLoggedIn = true;
    // req.flash("success", `반갑습니다, ${req.session.loggedInUser.username}님`);
    return res.status(200).json({
      success: true,
      userId: user._id,
    });
  } catch (error) {
    // req.flash("fail", "회원가입에 실패하였습니다.");
    return res.status(200).json({
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
      return res.status(200).json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });

    const isMatch: boolean = await bcrypt.compare(
      password,
      foundUser.password as string
    );

    if (!isMatch) {
      console.log("비밀번호 오류");
      // req.flash("error", "비밀번호가 일치하지 않습니다.");
      return res.status(200).json({
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
    return res.status(200).json({
      loginSuccess: false,
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
    return res.status(200).send(err);
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, password, curPassword } = req.body;

    const foundUser = await User.findOne({ _id: userId });

    if (foundUser) {
      const isMatch: boolean = await bcrypt.compare(
        curPassword,
        foundUser.password
      );
      if (isMatch) {
        const hashedPwd = await bcrypt.hash(password, 12);
        await User.findOneAndUpdate({ _id: userId }, { password: hashedPwd });
        return res.status(200).json({
          success: true,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "현재 비밀번호가 일치하지 않습니다.",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "유저 정보가 없습니다.",
      });
    }
  } catch (error) {
    // req.flash("fail", "회원가입에 실패하였습니다.");
    return res.status(200).json({
      success: false,
      message: "비밀번호 변경에 실패하였습니다.",
    });
  }
};

/*
1. client 파일 제출
2. 백엔드 서버에 저장 + db의 user data 갱신, session.loggedInUser.image 변경-> 파일 경로 반환
3. 파일 경로에서 이미지 읽어서 previewImage로 활용
4. 

*/

export const uploadProfileImage = (req: Request, res: Response): Response => {
  if (req.file) {
    return res.json({
      success: true,
      filePath: req?.file.path,
      fileName: req?.file.filename,
    });
  }
  return res.json({
    success: false,
  });
};

export const updateProfileImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, filePath } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { avatarUrl: filePath },
      { new: true }
    );
    if (user) {
      req.session.loggedInUser = user;
      return res.status(200).json({
        success: true,
      });
    }
    return res.status(200).json({
      success: false,
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

import { Request, Response } from "express";
import Dislike from "../models/Dislike";
import Like from "../models/Like";

export const getLikes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { commentId: req.body.commentId };
    }

    const likes = await Like.find(variable);
    return res.status(200).json({ success: true, likes });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getDislikes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { commentId: req.body.commentId };
    }
    const dislikes = await Dislike.find(variable);
    return res.status(200).json({ success: true, dislikes });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const upLike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    const like = new Like(variable);

    // save the like info data in MongoDB
    await like.save();
    // In case dislike button is already cliked, we need to decrease the dislike by 1
    await Dislike.findOneAndDelete(variable);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const unLike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    await Like.findOneAndDelete(variable);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const upDislike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const disLike = new Dislike(variable);

    // save the like info data in MongoDB
    await disLike.save();
    // In case dislike button is already cliked, we need to decrease the like by 1
    await Like.findOneAndDelete(variable);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const unDislike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let variable = {};
    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    await Dislike.findOneAndDelete(variable);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

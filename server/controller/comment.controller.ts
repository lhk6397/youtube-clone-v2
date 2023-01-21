import { Request, Response } from "express";
import { Types } from "mongoose";
import Comment from "../models/Comment";

export const saveComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    const foundComment = await Comment.find({ _id: comment._id }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, foundComment });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const comments = await Comment.find({ videoId: req.body.videoId }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, comments });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Comment.findOneAndDelete({ _id: req.body._id });
    await Comment.deleteMany({ responseTo: req.body._id });
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.body.commentId },
      { content: req.body.content },
      { new: true }
    );
    return res.json({ success: true, updatedComment });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

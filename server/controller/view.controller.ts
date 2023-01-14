import { Request, Response } from "express";
import View from "../models/View";

export const getViews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const views = await View.find({ videoId: req.body.videoId });
    return res.status(200).json({ success: true, views });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const updateView = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const view = new View(req.body);
    await view.save();

    const views = await View.find(req.body);
    return res.status(200).json({ success: true, views });
  } catch (err) {
    return res.status(400).send(err);
  }
};

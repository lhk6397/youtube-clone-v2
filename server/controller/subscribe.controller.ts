import { Request, Response } from "express";
import { Types } from "mongoose";
import Subscriber from "../models/Subscriber";
import User from "../models/User";

export const getSubscribeNumber = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const subscribe = await Subscriber.find({ userTo: req.body.userTo });
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getSubscribedInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let result = false;
    const subscribe = await Subscriber.find({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });
    if (subscribe.length !== 0) result = true;
    return res.status(200).json({ success: true, subscribed: result });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const subscribe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const subscribe = new Subscriber(req.body);
    await subscribe.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

export const unsubscribe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const getSubscribedUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const subscribers = await Subscriber.find({ userFrom: req.body.userFrom });
    let subscribedUserId: Types.ObjectId[] = [];
    subscribers.map((subscriber, i) => {
      subscribedUserId.push(subscriber.userTo);
    });

    const subscribedUser = await User.find({ _id: { $in: subscribedUserId } });

    return res.status(200).json({ success: true, subscribedUser });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

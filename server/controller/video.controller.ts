import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import ffmpeg from "fluent-ffmpeg";
import Video from "../models/Video";
import e from "connect-flash";

export const uploadFiles = (req: Request, res: Response): Response | void => {
  console.log(req.file);
  if (req.file) {
    return res.json({
      success: true,
      filePath: req?.file.path,
      fileName: req?.file.filename,
    });
  }
};

export const getThumbnail = (req: Request, res: Response): Response | void => {
  let thumbsFilePath = "";
  let fileDuration: number;

  ffmpeg.ffprobe(req.body.filePath, (err, metaData) => {
    fileDuration = metaData.format.duration ?? 0;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({ success: true, thumbsFilePath, fileDuration });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
};

export const uploadVideo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const video = new Video(req.body);

    await video.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

export const getVideos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const videos = await Video.find().populate("writer");
    return res.status(200).json({ success: true, videos });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getVideo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const video = await Video.findOne({ _id: req.body.videoId }).populate(
      "writer"
    );
    return res.status(200).json({ success: true, video });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// router.post("/getSubscriptionVideos", (req, res) => {
//   //Need to find all of the Users that I am subscribing to From Subscriber Collection
//   Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscribers) => {
//     if (err) return res.status(400).send(err);

//     let subscribedUser = [];

//     subscribers.map((subscriber, i) => {
//       subscribedUser.push(subscriber.userTo);
//     });

//     //Need to Fetch all of the Videos that belong to the Users that I found in previous step.
//     Video.find({ writer: { $in: subscribedUser } })
//       .populate("writer")
//       .exec((err, videos) => {
//         if (err) return res.status(400).send(err);
//         res.status(200).json({ success: true, videos });
//       });
//   });
// });

// module.exports = router;

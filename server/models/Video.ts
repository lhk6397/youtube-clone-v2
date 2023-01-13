import { Schema, Types, model, Document } from "mongoose";

export interface VideoDocument extends Document {
  _id: Types.ObjectId;
  writer: Types.ObjectId;
  title: string;
  description: string;
  privacy: string;
  filePath: string;
  category: string;
  views: number;
  duration: string;
  thumbnail: string;
  __v?: number;
}

const videoSchema = new Schema<VideoDocument>(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: String,
    },
    filePath: {
      type: String,
    },
    category: String,
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = model<VideoDocument>("Video", videoSchema);
export default Video;

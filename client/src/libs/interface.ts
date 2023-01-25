export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: number;
  avatarUrl: string;
  __v: number;
}

export interface IVideo {
  _id: string;
  writer: IUser;
  title: string;
  description: string;
  privacy: string;
  filePath: string;
  category: string;
  duration: number;
  thumbnail: string;
  createdAt: number;
  updatedAt?: any;
  fileName: string;
  __v?: number;
}

export interface IComment {
  _id: string;
  writer: IUser;
  videoId: string;
  content: string;
  responseTo?: any;
  createdAt: number;
  updatedAt: any;
}

export const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

export const Category = [
  { value: 0, label: "게임" },
  { value: 1, label: "음악" },
  { value: 2, label: "뷰티 / 팁" },
  { value: 3, label: "요리" },
  { value: 4, label: "스포츠" },
  { value: 5, label: "만화 영화" },
];

export interface VideoUploadForm {
  video: any;
  title: string;
  description?: string;
  private: string;
  category: string;
}

export interface ProfileImageUploadForm {
  profileImage: any;
}

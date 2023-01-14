import { IVideo } from "../views/pages/Home";

export const cls = (...classNames: string[]) => {
  return classNames.join(" ");
};

export const getTimegap = (createdAt: number) => {
  const msGap = Date.now() - createdAt;
  const minutegap = Math.floor(msGap / 60000);
  const hourgap = Math.floor(msGap / 3600000);
  if (msGap < 0) {
    return "0분 전";
  }
  if (hourgap > 24) {
    return `${createdAt}`;
  }
  if (minutegap > 60) {
    return `${hourgap}시간 전`;
  } else {
    return `${minutegap}분 전`;
  }
};

export const cls = (...classNames: string[]) => {
  return classNames.join(" ");
};

export const getTimegap = (createdAt: number) => {
  const msGap = Date.now() - createdAt;
  const secondgap = Math.floor(msGap / 1000);
  const minutegap = Math.floor(msGap / 60000);
  const hourgap = Math.floor(msGap / 3600000);
  const daygap = Math.floor(msGap / 86400000);
  if (secondgap < 60) {
    return `${secondgap}초 전`;
  }
  if (hourgap >= 24) {
    return `${daygap}일 전`;
  }
  if (minutegap > 60) {
    return `${hourgap}시간 전`;
  } else {
    return `${minutegap}분 전`;
  }
};

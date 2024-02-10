import { DataBoars } from "../body/Body";

export const getDate = (dataBoards: DataBoars[]) => {
  const date: string[] = [];
  dataBoards.forEach((board) => {
    const newDate = board.createdat.toString().split("T")[0].toString();
    if (date.length > 0) {
      date.forEach((dat) => {
        if (dat !== newDate) {
          date.push(newDate);
        } else {
          return;
        }
      });
    } else {
      date.push(newDate);
    }
  });
  return date;
};

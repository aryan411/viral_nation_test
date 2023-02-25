// Formate Date if Parameter type is number or timestamp
export const formatTimeStamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return formatDate(date);
};

// Formate Date if Parameter type is Date
export const formatDate: Function = (data: Date): string => {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

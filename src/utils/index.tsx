import moment from "moment";

export function getLocalStorage(key: string): any {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(
      `Error getting value from localStorage for key ${key}:`,
      error
    );
    return null;
  }
}

export function setLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting value in localStorage for key ${key}:`, error);
  }
}

export function checkIsDay(localtime: string) {
  const dateToCheck = moment(localtime, "YYYY-MM-DD HH:mm");

  const isToday = dateToCheck.isSame(new Date(), "day");

  return isToday;
}

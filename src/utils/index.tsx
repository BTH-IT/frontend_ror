import moment from "moment";
import { IForecast } from "../types/forecast";

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

export function parseLocaltime(localtime: string) {
  const dateToCheck = moment(localtime, "YYYY-MM-DD HH:mm");

  return dateToCheck.format("YYYY-MM-DD");
}

export function updateHistory(data: IForecast) {
  const forecastWeathers = getLocalStorage("forecastWeathers");

  if (forecastWeathers && typeof forecastWeathers === "object") {
    forecastWeathers.histories.push({
      current: data.current,
      location: data.location,
    });

    setLocalStorage("forecastWeathers", {
      ...forecastWeathers,
      histories: forecastWeathers.histories,
    });
  } else {
    setLocalStorage("forecastWeathers", {
      histories: [
        {
          current: data.current,
          location: data.location,
        },
      ],
      time: parseLocaltime(data.location.localtime),
    });
  }
}

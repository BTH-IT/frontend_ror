import { IWeather } from "./weather";

export interface IHistory {
  histories: IWeather[];
  time: string;
}

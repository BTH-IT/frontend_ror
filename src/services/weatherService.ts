import { IForecast } from "./../types/forecast.d";
import axiosClient from "./axiosService";

const weatherService = {
  getForecastWeather(q: string): Promise<IForecast> {
    const params = q
      ? {
          q,
        }
      : {};
    return axiosClient.get("/weathers/forecast", { params });
  },
  subcriber(email: string, location: string): Promise<any> {
    return axiosClient.post("/subscribe", {
      email,
      location,
    });
  },
  unsubcriber(email: string): Promise<any> {
    return axiosClient.delete(`/unsubscribe`, {
      params: {
        email,
      },
    });
  },
  confirm(email: string, token: string): Promise<any> {
    return axiosClient.get("/confirm", {
      params: {
        email,
        token,
      },
    });
  },
};

export default weatherService;

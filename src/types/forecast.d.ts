import { IWeather } from "./weather.d";

export interface IForecast extends IWeather {
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayDetails;
  astro: AstroDetails;
}

interface DayDetails {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface AstroDetails {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

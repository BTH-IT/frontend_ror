import { FadeLeftToRight, FadeRightToLeft } from "../../styles";
import { IWeather } from "../../types/weather";
import { parseLocaltime } from "../../utils";

const WeatherBanner = ({ location, current }: IWeather) => {
  return (
    <div className="rounded-md bg-Blue flex items-center justify-between text-white p-4">
      <FadeLeftToRight className="flex flex-col gap-2">
        <span className="font-medium text-xl">
          {location.name} ({parseLocaltime(location.localtime)})
        </span>
        <span className="font-light text-md">
          Temperature: {current.temp_c}°C
        </span>
        <span className="font-light text-md">Wind: {current.wind_mph}M/S</span>
        <span className="font-light text-md">
          Humidity: {current.humidity}%
        </span>
      </FadeLeftToRight>
      <FadeRightToLeft className="flex flex-col gap-2 items-center">
        <img
          src={current.condition.icon}
          alt="image"
          className="w-[100px] h-[75px] object-cover"
        />
        <span className="font-light text-md">{current.condition.text}</span>
      </FadeRightToLeft>
    </div>
  );
};

export default WeatherBanner;

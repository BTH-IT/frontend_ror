import { IWeatherCardProps } from "../../types/common";

const WeatherCard = ({
  temp,
  wind,
  humidity,
  day,
  image,
}: IWeatherCardProps) => {
  return (
    <div className="bg-[#6C757D] flex flex-col gap-2 rounded-md col-span-12 md:col-span-3 p-2 text-white">
      <span className="font-medium text-md">({day})</span>
      <img src={image} alt="image" className="w-[75px] h-[50px] object-cover" />
      <span className="font-light text-sm">Temp: {temp}°C</span>
      <span className="font-light text-sm">Wind: {wind} M/S</span>
      <span className="font-light text-sm">Humidity: {humidity}%</span>
    </div>
  );
};

export default WeatherCard;

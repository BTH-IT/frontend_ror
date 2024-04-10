import { FadeLeftToRight, FadeRightToLeft, ZoomIn } from "../../styles";
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
      <FadeRightToLeft className="font-medium text-md">({day})</FadeRightToLeft>
      <ZoomIn
        src={image}
        alt="image"
        className="w-[75px] h-[50px] object-cover"
      />
      <FadeRightToLeft className="font-light text-sm">
        Temp: {temp}°C
      </FadeRightToLeft>
      <FadeLeftToRight className="font-light text-sm">
        Wind: {wind} M/S
      </FadeLeftToRight>
      <FadeRightToLeft className="font-light text-sm">
        Humidity: {humidity}%
      </FadeRightToLeft>
    </div>
  );
};

export default WeatherCard;

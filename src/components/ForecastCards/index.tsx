import { IForecast } from "../../types/forecast";
import WeatherCard from "../WeatherCard";

const ForecastCards = ({
  isLoadMore,
  forecastWeather,
}: {
  isLoadMore: boolean;
  forecastWeather: IForecast | null;
}) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {isLoadMore
        ? forecastWeather?.forecast.forecastday.map((item, idx) => (
            <WeatherCard
              temp={item.day.maxtemp_c}
              wind={item.day.maxwind_mph}
              humidity={item.day.avghumidity}
              day={item.date}
              image={item.day.condition.icon}
              key={idx}
            />
          ))
        : forecastWeather?.forecast?.forecastday
            .slice(0, 4)
            .map((item, idx) => (
              <WeatherCard
                temp={item.day.maxtemp_c}
                wind={item.day.maxwind_mph}
                humidity={item.day.avghumidity}
                day={item.date}
                image={item.day.condition.icon}
                key={idx}
              />
            ))}
    </div>
  );
};

export default ForecastCards;

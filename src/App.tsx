import { useEffect, useRef, useState } from "react";
import weatherService from "./services/weatherService";
import { IForecast } from "./types/forecast";
import { Link } from "react-router-dom";
import Separate from "./components/Separate";
import Button from "./components/Button";
import ForecastCards from "./components/ForecastCards";
import Input from "./components/Input";
import { checkIsDay, getLocalStorage, setLocalStorage } from "./utils";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [forecastWeather, setForecastWeather] = useState<IForecast | null>(
    null
  );

  useEffect(() => {
    async function getForecastWeather(currentWeather: string = "") {
      try {
        const data = await weatherService.getForecastWeather(currentWeather);

        setForecastWeather(data);
        setLocalStorage("forecastWeather", data);
      } catch (error) {
        console.log(error);
      }
    }

    const storedForecastWeather: IForecast = getLocalStorage("forecastWeather");
    if (
      storedForecastWeather &&
      checkIsDay(storedForecastWeather.location.localtime)
    ) {
      getForecastWeather(storedForecastWeather.location.name);
      return;
    }

    setLocalStorage("forecastWeather", null);
    getForecastWeather();
  }, []);

  const handleSearch = async () => {
    if (inputRef && inputRef.current) {
      try {
        const data = await weatherService.getForecastWeather(
          inputRef.current.value.trim()
        );

        setForecastWeather(data);
        setLocalStorage("forecastWeather", data);
        inputRef.current.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const data = await weatherService.getForecastWeather(
              `${latitude},${longitude}`
            );

            setForecastWeather(data);
            setLocalStorage("forecastWeather", data);
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="h-full">
      <div className="grid gap-2 grid-cols-12 mt-6 p-4">
        <div className="col-span-12 md:col-span-4 p-2 flex flex-col gap-3">
          <label htmlFor="search" className="font-medium text-xl">
            Enter a City Name
          </label>
          <Input
            type="text"
            id="search"
            placeholder="E.g. New York, London, Tokyo"
            ref={inputRef}
          />
          <Button className="!bg-Blue mt-2 text-white" onClick={handleSearch}>
            Search
          </Button>
          <Separate />
          <Button onClick={handleUseCurrentLocation}>
            Use Current Location
          </Button>
          <div className="flex gap-2 justify-center items-center">
            <Link
              to="/subcribe"
              className="border border-Blue transition-all p-3 text-center w-full rounded-md font-thin text-md text-Blue mt-2"
              onClick={() => setIsLoadMore(!isLoadMore)}
            >
              Subcribe Email
            </Link>
            <Link
              to="/unsubcribe"
              className="border border-[#6C757D] transition-all p-3 text-center w-full rounded-md font-thin text-md text-[#6C757D] mt-2"
              onClick={() => setIsLoadMore(!isLoadMore)}
            >
              Unsubcribe Email
            </Link>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 p-2">
          <div className="rounded-md bg-Blue flex items-center justify-between text-white p-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-xl">
                {forecastWeather?.location.name} (
                {forecastWeather?.location.localtime.split(" ")[0]})
              </span>
              <span className="font-light text-md">
                Temperature: {forecastWeather?.current.temp_c}°C
              </span>
              <span className="font-light text-md">
                Wind: {forecastWeather?.current.wind_mph}M/S
              </span>
              <span className="font-light text-md">
                Humidity: {forecastWeather?.current.humidity}%
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <img
                src={forecastWeather?.current.condition.icon}
                alt="image"
                className="w-[75px] h-[50px] object-cover"
              />
              <span className="font-light text-md">
                {forecastWeather?.current.condition.text}
              </span>
            </div>
          </div>
          <div className="next">
            <h2 className="font-medium my-5 text-2xl">
              4-Day Forecast Or More
            </h2>
            <ForecastCards
              isLoadMore={isLoadMore}
              forecastWeather={forecastWeather}
            />
            <Button
              onClick={() => setIsLoadMore(!isLoadMore)}
              className="!text-[#6C757D] !border-[#6C757D] bg-transparent transition-all max-w-[30%] mt-10 mx-auto block hover:bg-[#6C757D] hover:!text-white"
            >
              {isLoadMore ? "Hide" : "Load More"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

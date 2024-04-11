import { useEffect, useRef, useState } from "react";
import weatherService from "./services/weatherService";
import { IForecast } from "./types/forecast";
import { Link, useNavigate } from "react-router-dom";
import Separate from "./components/Separate";
import Button from "./components/Button";
import ForecastCards from "./components/ForecastCards";
import Input from "./components/Input";
import {
  checkIsDay,
  getLocalStorage,
  setLocalStorage,
  updateHistory,
} from "./utils";
import WeatherBanner from "./components/WeatherBanner";

function App() {
  const navigate = useNavigate();
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

    // Nếu chưa qua ngày mới thì lấy lại những cái cũ
    if (
      storedForecastWeather &&
      checkIsDay(storedForecastWeather.location.localtime)
    ) {
      getForecastWeather(storedForecastWeather.location.name);
      return;
    }

    // qua ngày mới sẽ refresh lại toàn bộ
    setLocalStorage("forecastWeather", null);
    setLocalStorage("forecastWeathers", null);
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

        updateHistory(data);

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

            updateHistory(data);
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
          <label htmlFor="search" className="flex justify-between items-center">
            <span className="font-medium text-xl ">Enter a City Name</span>
            <Link
              to="/history"
              className="border border-Blue transition-all px-3 py-1 text-center rounded-md font-thin text-md text-Blue mt-2 hover:bg-Blue hover:text-white"
              onClick={() => navigate("/history", { replace: true })}
            >
              History search
            </Link>
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
              to="/subscribe"
              className="border border-Blue transition-all p-3 text-center w-full rounded-md font-thin text-md text-Blue mt-2"
              onClick={() => setIsLoadMore(!isLoadMore)}
            >
              Subcribe Email
            </Link>
            <Link
              to="/unsubscribe"
              className="border border-[#6C757D] transition-all p-3 text-center w-full rounded-md font-thin text-md text-[#6C757D] mt-2"
              onClick={() => setIsLoadMore(!isLoadMore)}
            >
              Unsubcribe Email
            </Link>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 p-2">
          {forecastWeather ? (
            <>
              <WeatherBanner
                location={forecastWeather.location}
                current={forecastWeather.current}
              />
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
            </>
          ) : (
            <p className="text-center font-medium text-3xl">Loading....</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { getLocalStorage } from "../utils";
import { IHistory } from "../types/history";
import WeatherBanner from "../components/WeatherBanner";

const History = () => {
  const [data, _] = useState<IHistory | null>(
    getLocalStorage("forecastWeathers")
  );

  return (
    <div className="max-w-[1000px] mx-auto mt-6 p-4">
      <h1 className="uppercase font-semibold text-3xl text-center mb-10">
        History Searching In Day
      </h1>
      <div className="flex flex-col gap-3">
        {data &&
          data.histories.length > 0 &&
          data.histories.map((item, idx) => (
            <WeatherBanner key={idx} {...item} />
          ))}
      </div>
    </div>
  );
};

export default History;

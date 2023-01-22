import HabitDay from "./HabitDay";
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-neginning";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";
const SummaryDates = generateDatesFromYearBeginning();
const minimunSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDatesSize - SummaryDates.length;
const SummaryTable = () => {
  const [summary, setSummary] = useState<Summary>([]);

  type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
  }[];

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => (
          <div
            key={`${weekDay} - ${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {SummaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              key={date.toString()}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
};

export default SummaryTable;

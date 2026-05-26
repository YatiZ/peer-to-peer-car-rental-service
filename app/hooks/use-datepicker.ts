import { useEffect, useState } from "react";

import dayjs from "dayjs";
import useSearchQuery from "./use-searchquery";

/**
 * Represents a date range with a start and end date.
 */

export type IDate = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

/**
 * A custom hook for managing date range state and syncing it with URL query parameters.
 *
 * - Automatically initializes the date range to today's date if no query params exist.
 * - Provides a formatted `dateFilter` string for API requests.
 *
 * @returns {{
 *  date: IDate;
 *  setDate: (newDate: IDate) => void;
 *  dateFilter: string;
 * }}
 */

const useDatePicker = () => {
  const [queryParams, setQueryParam] = useSearchQuery();
  const [date, setDate] = useState<IDate>(() => getInitialDate(queryParams));

  // Initialize query params and date if they are missing
  useEffect(() => {
    if (!queryParams.startDate && !queryParams.endDate) {
      const today = dayjs().format("YYYY-MM-DD");
      setQueryParam({ startDate: today, endDate: today });
      setDate({ startDate: new Date(today), endDate: new Date(today) });
    }
  }, [queryParams.startDate, queryParams.endDate, setQueryParam]);

  // Sync date state with query params whenever they change
  useEffect(() => {
    if (queryParams.startDate && queryParams.endDate) {
      setDate({
        startDate: dayjs(queryParams.startDate, "YYYY-MM-DD").toDate(),
        endDate: dayjs(queryParams.endDate, "YYYY-MM-DD").toDate(),
      });
    }
  }, [queryParams.startDate, queryParams.endDate]);

  /**
   * Updates both the internal date state and the URL query parameters.
   *
   * @param {IDate} newDate - The new date range to set.
   */
  const setDates = (newDate: IDate) => {
    setQueryParam({
      startDate: dayjs(newDate.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(newDate.endDate).format("YYYY-MM-DD"),
    });
    setDate(newDate);
  };

  /**
   * A formatted date filter string used for API queries.
   */
  const dateFilter = `&startDate=${dayjs(date.startDate || new Date()).format("YYYY-MM-DD")}T00:00:00Z&endDate=${dayjs(date.endDate || new Date()).format("YYYY-MM-DD")}T00:00:00Z`;

  return { date, setDate: setDates, dateFilter };
};

export default useDatePicker;

/**
 * Computes the initial date range based on existing query parameters.
 * Defaults to today's date if parameters are missing or invalid.
 *
 * @param {{ [key: string]: string }} currentParams - The current query parameters.
 * @returns {IDate}
 */
const getInitialDate = (currentParams: { [k: string]: string }) => {
  const { startDate, endDate } = currentParams ?? {};

  if (startDate && endDate) {
    const from = dayjs(startDate, "YYYY-MM-DD").toDate();
    const to = dayjs(endDate, "YYYY-MM-DD").toDate();
    return { startDate: from, endDate: to };
  }

  const today = new Date();
  return { startDate: today, endDate: today };
};

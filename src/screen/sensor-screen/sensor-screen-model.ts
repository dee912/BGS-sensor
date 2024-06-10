import { useState } from "react";
import {
  FoiData,
  ItemClickDetails,
  ObservationsData,
} from "../../types/screen-types";

const SensorScreenViewModel = () => {
  const [foiData, setFoiData] = useState<FoiData | null>(null);
  const [selectedObservationItem, setSelectedObservationItem] =
    useState<string>("Select a sensor");
  const [observationData, setObservationData] =
    useState<ObservationsData | null>(null);
  const [dropdownName, setDropdownName] = useState<string>("Select a feature");
  const [minResult, setMinResult] = useState<number | null>(null);
  const [maxResult, setMaxResult] = useState<number | null>(null);
  const [meanResult, setMeanResult] = useState<number | null>(null);
  const [filter, setFilter] = useState<any | null>(null);
  const [sortDate, setSortDate] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFoiItemClick = async (event: CustomEvent<ItemClickDetails>) => {
    const itemId = event.detail.id;
    const item = foiData?.value.find((i) => i["@iot.id"] === itemId);
    setSelectedObservationItem("Select a sensor");
    setMinResult(null);
    setMaxResult(null);
    setMeanResult(null);
    if (item) {
      setDropdownName(item.name);
      try {
        setLoading(true);
        const url = item["Observations@iot.navigationLink"];
        console.log("Fetching data from:", url);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ObservationsData = await response.json();
        setObservationData(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleObservationItemClick = async (
    event: CustomEvent<ItemClickDetails>
  ) => {
    const itemId = event.detail.id;
    const item = observationData?.value.find((i) => i["@iot.id"] === itemId);
    const filteredResults =
      observationData?.value
        .filter((item) => item["@iot.id"] === itemId)
        .map((item) => item.result) || [];
    const resultsDate =
      observationData?.value
        .filter((item) => item["@iot.id"] === itemId)
        .map((item) => item.resultTime) || [];

    if (item) {
      setSelectedObservationItem(item["@iot.id"]);
    }

    if (filteredResults) {
      setFilter(filteredResults);
      setMinResult(Math.min(...filteredResults));
      setMaxResult(Math.max(...filteredResults));
      setMeanResult(
        filteredResults.reduce((acc, curr) => acc + curr, 0) /
          filteredResults.length
      );
    }

    if (resultsDate) {
      const sortByDate = (data: any[]) =>
        data.sort((a: number, b: number) => (a < b ? -1 : a > b ? 1 : 0));

      setSortDate(sortByDate(resultsDate));
    }
  };

  return {
    foiData,
    setFoiData,
    observationData,
    selectedObservationItem,
    dropdownName,
    minResult,
    maxResult,
    meanResult,
    filter,
    sortDate,
    loading,
    setLoading,
    error,
    setError,
    handleFoiItemClick,
    handleObservationItemClick,
  };
};

export { SensorScreenViewModel };

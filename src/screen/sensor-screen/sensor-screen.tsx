import "./sensor-screen.css";
import { useEffect } from "react";
import { FeatureOfInterestDropdown } from "../../components/feature-of-interest-dropdown";
import { Chart } from "../../components/line-chart";
import { ObservationDropdown } from "../../components/observation-dropdown";
import { SensorScreenViewModel } from "./sensor-screen-model";
import { FoiData } from "../../types/screen-types";

const SensorScreen = () => {
  const {
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
  } = SensorScreenViewModel();

  useEffect(() => {
    const fetchFoiData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://sensors.bgs.ac.uk/FROST-Server/v1.1/FeaturesOfInterest"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: FoiData = await response.json();
        setFoiData(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFoiData();
  }, [setError, setFoiData, setLoading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {foiData && (
        <>
          <div className="dropdown-container">
            <FeatureOfInterestDropdown
              onClick={handleFoiItemClick}
              name={dropdownName}
              value={foiData.value}
            />
            {observationData && (
              <ObservationDropdown
                onClick={handleObservationItemClick}
                name={selectedObservationItem}
                value={observationData.value}
              />
            )}
          </div>
          <div className="chart-container">
            {minResult && (
              <ul>
                <li className="result">Min: {minResult}</li>
                <li className="result">Max: {maxResult}</li>
                <li className="result">Avg: {meanResult}</li>
              </ul>
            )}
            {sortDate && (
              <div className="chart">
                <Chart
                  name={selectedObservationItem}
                  sortDate={sortDate}
                  filter={filter}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SensorScreen;

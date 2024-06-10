import LineChart from "@cloudscape-design/components/line-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";

type ChartProps = {
  name: string;
  sortDate: any;
  filter: any;
};

export const Chart = ({ name, sortDate, filter }: ChartProps) => {
  return (
    <LineChart
      series={[
        {
          title: `Site: ${name}`,
          type: "line",
          data: sortDate.map((item: any, index: string | number) => ({
            x: new Date(item),
            y: filter[index],
          })),
          valueFormatter: function numberFormatter(e: number) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : e.toFixed(2);
          },
        },
      ]}
      height={300}
      hideFilter
      hideLegend
      xScaleType="time"
      xTitle="Time (GMT)"
      yTitle="Result"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  );
};

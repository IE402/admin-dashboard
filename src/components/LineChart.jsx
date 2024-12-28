import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

// Dữ liệu mẫu cho số lượt thuê trung bình mỗi tháng của từng loại hình
const mockRentalData = [
  {
    id: "Trọ",
    data: [
      { x: "Tháng 1", y: 12 },
      { x: "Tháng 2", y: 15 },
      { x: "Tháng 3", y: 10 },
      { x: "Tháng 4", y: 20 },
      { x: "Tháng 5", y: 25 },
      { x: "Tháng 6", y: 30 },
      { x: "Tháng 7", y: 35 },
      { x: "Tháng 8", y: 40 },
      { x: "Tháng 9", y: 38 },
      { x: "Tháng 10", y: 28 },
      { x: "Tháng 11", y: 22 },
      { x: "Tháng 12", y: 18 },
    ],
  },
  {
    id: "Căn hộ",
    data: [
      { x: "Tháng 1", y: 8 },
      { x: "Tháng 2", y: 7 },
      { x: "Tháng 3", y: 12 },
      { x: "Tháng 4", y: 15 },
      { x: "Tháng 5", y: 18 },
      { x: "Tháng 6", y: 22 },
      { x: "Tháng 7", y: 24 },
      { x: "Tháng 8", y: 30 },
      { x: "Tháng 9", y: 26 },
      { x: "Tháng 10", y: 20 },
      { x: "Tháng 11", y: 16 },
      { x: "Tháng 12", y: 10 },
    ],
  },
  {
    id: "Chung cư",
    data: [
      { x: "Tháng 1", y: 5 },
      { x: "Tháng 2", y: 6 },
      { x: "Tháng 3", y: 8 },
      { x: "Tháng 4", y: 12 },
      { x: "Tháng 5", y: 14 },
      { x: "Tháng 6", y: 18 },
      { x: "Tháng 7", y: 22 },
      { x: "Tháng 8", y: 20 },
      { x: "Tháng 9", y: 17 },
      { x: "Tháng 10", y: 15 },
      { x: "Tháng 11", y: 10 },
      { x: "Tháng 12", y: 8 },
    ],
  },
];

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rentalData, setRentalData] = useState(mockRentalData);

  useEffect(() => {
    // Nếu muốn lấy dữ liệu động từ API, có thể sửa lại ở đây
    // const fetchRentalData = async () => {
    //   const res = await rentalService.getRentalData();
    //   setRentalData(res);
    // };
    // fetchRentalData();
  }, []);

  return (
    <ResponsiveLine
      data={rentalData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Tháng",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Số lượt thuê trung bình",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;

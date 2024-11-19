export const Desktop = {
  legend: {
    anchor: "bottom-right",
    direction: "column",
    justify: false,
    translateX: 120,
    translateY: -44,
    itemsSpacing: 9,
    itemDirection: "left-to-right",
    itemWidth: 100,
    itemHeight: 20,
    itemOpacity: 0.75,
    symbolSize: 12,
    symbolShape: "circle",
    symbolBorderColor: "rgba(0, 0, 0, .5)",
    toggleSerie: true,
    onClick: (data) => console.log("data", data),
    effects: [
      {
        on: "hover",
        style: {
          itemBackground: "rgba(0, 0, 0, .03)",
          itemOpacity: 1,
          itemTextColor: "#ffff",
        },
      },
     
    ],
  },
  margin: {
    top: 40,
    right: 130,
    bottom: 60,
    left: 50,
  },
  axisBottom: {
    legend: "transportation",
  },
  axisLeft: {
    legend: "count",
  },
};

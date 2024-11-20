export const Desktop = {
  legend: {
    anchor: "top",
    direction: "row",
    justify: false,
    translateX: 20,
    translateY: -34,
    itemsSpacing: 0,
    itemDirection: "left-to-right",
    itemWidth: 165,
    itemHeight: 20,
    itemOpacity: 0.75,
    symbolSize: 14,
    symbolShape: "square",
    symbolBorderColor: "rgba(0, 0, 0, .5)",
    toggleSerie: true,
    onClick: (data) => console.log("data", data),
    
    effects: [
      {
        on: "hover",
        style: {
          itemOpacity: 0.6,
        },
      },
     
    ],
  },
  margin: {
    top: 50,
    right:50,
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

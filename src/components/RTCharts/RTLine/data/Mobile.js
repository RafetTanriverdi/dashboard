export const Mobile = {
  legend: {
    anchor: "top",
    direction: "row",
    justify: false,
    translateX: 20,
    translateY: -36,
    itemsSpacing: 0,
    itemDirection: "left-to-right",
    itemWidth: 150,
    itemHeight: 10,
    itemOpacity: 0.75,
    symbolSize: 10,
    symbolShape: "circle",
    symbolBorderColor: "rgba(0, 0, 0, .5)",
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
    right: 15,
    bottom: 55,
    left: 45,
  },
  axisBottom:{
    legend:''
  },
  axisLeft:{
    legend:''
  }
};

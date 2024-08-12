import { ResponsiveBar } from "@nivo/bar";
const data = [
  {
    product: "Product A",
    stock: 10,
    order: 3,
  },
  {
    product: "Product B",
    stock: 20,
    order: 10,
  },
  {
    product: "Product C",
    stock: 20,
    order: 5,
  },
];

const RTBar = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["stock", "order"]}
      indexBy="product"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="vertical" // dikey çubuklar için
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 10,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    />
  );
};

export default RTBar;

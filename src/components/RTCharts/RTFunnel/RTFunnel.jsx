import { ResponsiveFunnel } from "@nivo/funnel";

const RTFunnel = () => {
  return (
    <ResponsiveFunnel
      data={data}
      margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
      direction="vertical"
      valueFormat=">-.4s"
      colors={{ scheme: "spectral" }}
      borderWidth={20}
      labelColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      beforeSeparatorLength={100}
      beforeSeparatorOffset={20}
      afterSeparatorLength={100}
      afterSeparatorOffset={20}
      currentPartSizeExtension={10}
      currentBorderWidth={40}
      motionConfig="wobbly"
    />
  );
};

export default RTFunnel;

const data = [

  {
    id: "step_sent",
    value: 3116,
    label: "Sent",
  },
  {
    id: "step_viewed",
    value: 1495,
    label: "Viewed",
  },
  {
    id: "step_clicked",
    value: 1100,
    label: "Clicked",
  },
  {
    id: "step_add_to_card",
    value: 1000,
    label: "Add To Card",
  },
  {
    id: "step_purchased",
    value: 300,
    label: "Purchased",
  },
];

import { ResponsiveBump } from "@nivo/bump";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import dayjs from "dayjs";

const prepareBumpData = (categoryTimeLine) => {
  const allCategories = [
    ...new Set(categoryTimeLine.map((item) => item.categoryName)),
  ];

  const groupedByDate = categoryTimeLine.reduce(
    (acc, { categoryName, date }) => {
      if (!acc[date]) acc[date] = {};
      if (!acc[date][categoryName]) acc[date][categoryName] = 0;
      acc[date][categoryName] += 1;
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedByDate).sort((a, b) =>
    dayjs(a).isBefore(dayjs(b)) ? -1 : 1
  );

  const rankings = [];
  let previousRanking = allCategories.map((category, index) => ({
    category,
    rank: index + 1,
  }));

  for (const date of sortedDates) {
    const currentDay = groupedByDate[date];
    const currentRanking = allCategories.map((category) => {
      const count = currentDay[category] || 0;
      return { category, count };
    });

    currentRanking.sort(
      (a, b) => b.count - a.count || a.category.localeCompare(b.category)
    );

    const ranked = currentRanking.map((item, index) => ({
      category: item.category,
      rank: index + 1,
    }));

    rankings.push({
      date:dayjs(date).format('MMM, DD'),
      rankings: ranked,
    });

    previousRanking = ranked;
  }

  const bumpData = allCategories.map((category) => ({
    id: category,
    data: rankings.map(({ date, rankings }) => {
      const categoryRanking = rankings.find((r) => r.category === category);
      return {
        x: date,
        y: categoryRanking
          ? categoryRanking.rank
          : previousRanking.find((r) => r.category === category)?.rank,
      };
    }),
  }));

  return bumpData;
};

const RTBump = ({ categoryTimeLine }) => {
  const { theme } = useThemeChangeStore();
  const bumpData = prepareBumpData(categoryTimeLine);

  return (
    <ResponsiveBump
      theme={theme ? ChartsLight : ChartsDark}
      data={bumpData}
      colors={{ scheme: "spectral" }}
      lineWidth={3}
      activeLineWidth={6}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={9}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: "serie.color" }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
        truncateTickAt: 0,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Ranking",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      margin={{ top: 40, right: 130, bottom: 40, left: 60 }}
      axisRight={null}
    />
  );
};

export default RTBump;

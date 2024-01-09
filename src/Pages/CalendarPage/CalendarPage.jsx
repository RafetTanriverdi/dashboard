import MainLayout from "../../Layout/MainLayout/MainLayout";
import RTSider from "../../Components/RTSider/RTSider";

const CalendarPageContainer = () => {
  return <div>CalendarPage</div>;
};
const CalendarPage = () => {
  return <MainLayout content={<CalendarPageContainer />} sider={<RTSider />} />;
};

export default CalendarPage;

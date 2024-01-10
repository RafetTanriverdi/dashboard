import RTSider from '../../components/RTSider/RTSider'
import MainLayout from '../../layout/MainLayout/MainLayout'

const CalendarPageContainer = () => {
  return <div>CalendarPage</div>;
};
const CalendarPage = () => {
  return <MainLayout content={<CalendarPageContainer />} sider={<RTSider />} />;
};

export default CalendarPage;

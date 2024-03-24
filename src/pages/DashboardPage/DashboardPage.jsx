import { useEffect } from "react";
import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";
import { useState } from "react";
import { ENDPOINTS } from "../../network/endpoints";
import { axiosInstance } from "../../network/httpRequester";

const DashboardPageContainer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.PRODUCT.LIST);
        setList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(list);
  return <div>Dashboard Page</div>;
};

const DashboardPage = (props) => {
const {title}=props.routeData;


  return (
    <MainLayout title={title} content={<DashboardPageContainer />} sider={<RTSider />} />
  );
};

export default DashboardPage;

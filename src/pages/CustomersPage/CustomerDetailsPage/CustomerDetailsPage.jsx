import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import ReactJson from "react-json-view";
import { useParams } from "react-router-dom";

const CustomerDetailsPageContainer = () => {
  const params = useParams();
  console.log(params);
  const { customerId } = params;

  const { data } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINTS.CUSTOMERS.GET.replace(":customerId", customerId)
      ),
  });
  return <ReactJson src={data} />;
};

const CustomerDetailsPage = () => {
  return (
    <MainLayout
      sider={<RTSider/>}
      content={<CustomerDetailsPageContainer />}
    />
  );
};

export default CustomerDetailsPage;

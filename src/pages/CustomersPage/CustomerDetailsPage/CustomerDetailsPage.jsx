import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import CustomerLayout from "@rt/layout/MainLayout/CustomerLayout/CustomerLayout";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import ReactJson from "react-json-view";
import { useParams } from "react-router-dom";

const CustomerDetailsPageContainer = ({data,error,isLoading}) => {

  if(isLoading)return<RTSkeleton/>
  if(error)return <div>{error.message}</div>
  return <ReactJson src={data} />;
};

const CustomerDetailsPage = () => {
  const params = useParams();
  const { customerId } = params;

  const { data,error,isLoading } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINTS.CUSTOMERS.GET.replace(":customerId", customerId)
      ),
  });
  return (
    <CustomerLayout
      title={data?.data?.name}
      content={<CustomerDetailsPageContainer data={data?.data} error={error} isLoading={isLoading} />}
    />
  );
};

export default CustomerDetailsPage;

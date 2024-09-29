import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import ReactJson from "react-json-view";

const EditCustomerStatusPanel = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["customers", id],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CUSTOMERS.GET.replace(":customerId", id)),
  });

  return <ReactJson src={data?.data} />;
};

export default EditCustomerStatusPanel;

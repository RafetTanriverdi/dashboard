import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { longDateFormat } from "@rt/utils/long-dateFotmat";
import { useQuery } from "@tanstack/react-query";
import { Descriptions } from "antd";

const ViewCategoryPanel = ({ categoryId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Category", categoryId],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.GET.replace(":categoryId", categoryId)).then((res) => res.data),
  });
  const item = [
    {
      key: 1,
      label: "Category Name",
      children: data?.categoryName,
      span: 3,
    },
    {
      key: 2,
      label: "Owner",
      children: <a href="/users">{data?.ownerName}</a>,
      span: 3,
    },
    {
      key: 3,
      label: "Created At",
      children: longDateFormat(data?.createdAt),
      span: 3,
    },
    {
      key: 4,
      label: "Updated At",
      children: longDateFormat(data?.updatedAt),
      span: 3,
    },
    {
      key: 5,
      label: "Product Amount",
      children: data?.productCount,
      span: 3,
    },
  ];

  if (isLoading) {
    return <RTSkeleton />;
  } else if (error) {
    return <RTAlert message={error} type={"error"} />;
  }
  return (
    <>
      <Descriptions bordered items={item} />
    </>
  );
};

export default ViewCategoryPanel;

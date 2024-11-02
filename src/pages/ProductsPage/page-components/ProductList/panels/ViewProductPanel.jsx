import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "antd";
import { Image } from "antd";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import ReactJson from "react-json-view";

const ViewProductPanel = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      axiosInstance
        .get(ENDPOINTS.PRODUCT.GET.replace(":productId", id))
        .then((res) => res.data),
  });

  if (isLoading) {
    return <RTSkeleton />;
  } else if (error) {
    return <RTAlert message={error} type={"error"} />;
  }
  const item = [
    {
      key: 1,
      label: "Product Name",
      children: data.productName,
    },
    {
      key: 2,
      label: "Product Description",
      children: data.description,
      span:2,
    },
    {
      key: 3,
      label: "Product Price",
      children: "$ " + data.price.toFixed(2),
    },
    {
      key: 4,
      label: "Product Stock",
      children: data.stock,
    },
    {
      key: 5,
      label: "Product Category",
      children: data.categoryName,
    },
    {
      key: 6,
      label: "Created",
      children: dayjs(data.createdAt).format("MMM,DD YYYY - hh:mm A"),
    },
    {
      key: 7,
      label: "Updated",
      children: dayjs(data.updatedAt).format("MMM,DD YYYY - hh:mm A"),
    },
    {
      key:8,
      label:"Owner",
      children:data.ownerName
    },
    {
      key:9,
      label:'Status',
      children:(
        <Tag color={data.active  ? "green" : "red"}>
          {data.active ? "Active" : "Inactive"}
        </Tag>
      )
    },{
      key:10,
      label:"Product Images",
      children:data.imageUrls.map(e=>(
        <Image key={e} src={e} width={120}  style={{padding:'0 2px'}} />
      ))
    }
  ];
  return (
    <>
      <Descriptions layout="vertical" items={item} bordered />
      <ReactJson src={data} />
    </>
  );
};

export default ViewProductPanel;

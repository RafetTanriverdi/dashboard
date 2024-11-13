import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { longDateFormat } from "@rt/utils/long-dateFotmat";
import { useQuery } from "@tanstack/react-query";
import { Tree } from "antd";
import { Descriptions } from "antd";
import '../../../UsersPage.scss'


const ViewUserPanel = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["User", id],
    queryFn: () =>
      axiosInstance
        .get(ENDPOINTS.USER.GET.replace(":userId", id))
        .then((res) => res.data),
  });

  const listProduct = (title) => {
    if (!data?.permissions) return [];
    return data?.permissions?.filter((item) => item?.includes(title));
  };

  const item = [
    {
      key: 1,
      label: "User Name",
      children: data?.name,
      span: 3,
    },
    {
      key: 2,
      label: "User Email",
      children: data?.email,
      span: 3,
    },
    {
      key: 3,
      label: "User Phone",
      children: data?.phoneNumber,
      span: 3,
    },
    {
      key: 4,
      label: "User Role",
      children: data?.role,
      span: 3,
    },
    {
      key: 5,
      label: "User Status",
      children: data?.status,
      span: 3,
    },
    {
      key: 6,
      label: "User Created At",
      children: longDateFormat(data?.createdAt),
      span: 3,
    },
    {
      key: 7,
      label: "User Updated At",
      children: longDateFormat(data?.updatedAt),
      span: 3,
    },
    {
      key: 8,
      label: "User Permissions",
      children: (
        <Tree
        className="user_view_tree"
          showLine
          selectable={false}
          defaultExpandedKeys={["Product"]}
          treeData={[
            {
              title: "Product",
              key: "Product",
              children: listProduct("Product").map((item) => {
                return {
                  title: item,
                  key: item,
                };
              }),
            },
            {
              title: "Category",
              key: "Category",
              children: listProduct("Category").map((item) => {
                return {
                  title: item,
                  key: item,
                };
              }),
            },
            {
              title: "User",
              key: "User",
              children: listProduct("User").map((item) => {
                return {
                  title: item,
                  key: item,
                };
              }),
            },
          ]}
        />
      ),
      span: 3,
    },
    {
      key: 9,
      label: "Family Id",
      children: data?.familyId,
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

export default ViewUserPanel;

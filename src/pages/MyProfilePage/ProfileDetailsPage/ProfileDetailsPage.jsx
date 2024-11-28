import { getToken } from "@rt/authentication/auth-utils";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import Notification from "@rt/components/RTFeedback/Notification/Notification";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { useDeviceStore } from "@rt/data/Device/mobile";
import ProfileLayout from "@rt/layout/MainLayout/ProfileLayout/ProfileLayout";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { longDateFormat } from "@rt/utils/long-dateFotmat";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Tree,
  Input,
  Radio,
  Descriptions,
  DatePicker,
  Button,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const ProfileDetailsPageContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userAttributes"],
    queryFn: () =>
      axiosInstance
        .get(ENDPOINTS.USER.GET.replace(":userId", decodeId?.sub))
        .then((res) => res.data),
  });

  const { isMobile } = useDeviceStore();
  const [postBody, setPostBody] = useState({
    name: data?.name,
    phoneNumber: data?.phoneNumber,
    birthday: data?.birthday,
    gender: data?.gender,
  });

  const { context, openNotification } = Notification();

  const decodeId = jwtDecode(getToken().IdToken);
  const format = "YYYY-MM-DD";

  const permissionsSlice = data?.permissions?.split(",");
  const permissionCategory = permissionsSlice?.map((item) => {
    return item.split(":")[0];
  });

  const uniquePermissionCategory = [...new Set(permissionCategory)];

  const permissionTree = uniquePermissionCategory.map((item) => {
    return {
      title: item,
      key: item,
      children: permissionsSlice
        .filter((permission) => permission.includes(item))
        .map((permission) => {
          return {
            title: permission,
            key: permission,
          };
        }),
    };
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.patch(
        ENDPOINTS.USER.UPDATE.replace(":userId", decodeId?.sub),
        data
      ),
    onSuccess: () => {
      openNotification({
        message: "User Updated",
        type: "success",
        duration: 2,
      });
    },
    onError: (error) => {
      console.log(error);
      openNotification({
        message: error.response.data.message,
        type: "error",
        duration: 2,
      });
    },
  });

  if (isLoading) return <RTSkeleton />;
  if (error) return <RTAlert message={error.message} type="error" />;
  return (
    <>
      {context}
      <Typography.Title level={3}>My Profile</Typography.Title>
      <Descriptions
        column={isMobile ? 1 : 2}
        bordered
        items={[
          {
            key: 1,
            label: "Name",
            children: (
              <Input
                defaultValue={data?.name}
                value={postBody.name}
                onChange={(e) =>
                  setPostBody({
                    ...postBody,
                    name: e.target.value,
                  })
                }
              />
            ),
          },
          {
            key: 2,
            label: "Email",
            children: data?.email,
          },
          {
            key: 3,
            label: "Phone",
            children: (
              <Input
                defaultValue={data?.phoneNumber}
                value={postBody.phoneNumber}
                onChange={(e) =>
                  setPostBody({
                    ...postBody,
                    phoneNumber: e.target.value,
                  })
                }
              />
            ),
          },
          {
            key: 5,
            label: "Birthday",
            children: (
              <DatePicker
                defaultValue={
                  data?.birthday ? dayjs(data?.birthday) : undefined
                }
                onChange={(e) =>
                  setPostBody({
                    ...postBody,
                    birthday: e ? dayjs(e).format(format) : null,
                  })
                }
                format={format}
                inputReadOnly
              />
            ),
          },
          {
            key: 9,
            label: "Gender",
            children: (
              <div className="gender-container">
                <Radio.Group
                  defaultValue={data?.gender}
                  value={postBody.gender}
                  buttonStyle="solid"
                  onChange={(e) =>
                    setPostBody({
                      ...postBody,
                      gender: e.target.value,
                    })
                  }
                >
                  <Radio value={"Female"}>Female</Radio>
                  <Radio value={"Male"}>Male</Radio>
                </Radio.Group>
                <Input
                  defaultValue={
                    data?.gender !== ("Female" || "Male")
                      ? data?.gender
                      :null
                
                  }
                  placeholder="Other"
                  onChange={(e) =>
                    setPostBody({
                      ...postBody,
                      gender: e.target.value,
                    })
                  }
                  className="input"
                />
              </div>
            ),
          },
          {
            key: 4,
            label: "Role",
            children: data?.role,
          },

          {
            key: 6,
            label: "Created At",
            children: longDateFormat(data?.createdAt),
          },
          {
            key: 7,
            label: "Updated At",
            children: longDateFormat(data?.updatedAt),
          },

          {
            key: 8,
            label: "Permissions",
            children: (
              <Tree
                className="user_view_tree"
                showLine
                selectable={false}
                defaultExpandedKeys={["Product"]}
                treeData={permissionTree}
              />
            ),
          },
        ]}
      />
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        onClick={() => mutation.mutate(postBody)}
        loading={mutation.isPending}
      >
        Update
      </Button>
    </>
  );
};

const ProfileDetailsPage = () => {
  return (
    <ProfileLayout
      content={<ProfileDetailsPageContainer />}
      title="Profile Details"
    />
  );
};
export default ProfileDetailsPage;

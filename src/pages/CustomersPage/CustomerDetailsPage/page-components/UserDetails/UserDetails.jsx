import { capitalizeFirstLetter } from "@rt/utils/capitalizeFirstLetter";
import { longDateFormat } from "@rt/utils/long-dateFotmat";
import { Tag } from "antd";
import { Descriptions } from "antd";
import { Avatar } from "antd";
import { Col } from "antd";

const UserDetails = ({ data }) => {
  const items = [
    { label: "Name", children: data?.name },
    { label: "Email", children: data?.email },
    { label: "Phone", children: data?.phone },
    {
      label: "Status",
      children: (
        <Tag color={data?.status === "active" ? "green" : "red"}
        
        >
          {capitalizeFirstLetter(data?.status)}
        </Tag>
      ),
    },
    {
      label: "Created",
      children: longDateFormat(data?.createdAt),
    },
    {
      label: "Updated",
      children: longDateFormat(data?.updatedAt),
    },
  ];
  return (
    <>
      <Col
        xs={24}
        sm={6}
        md={4}
        lg={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Avatar src={data?.profilePictureUrl} shape="square" size={110} />
      </Col>
      <Col xs={24} sm={18} md={20} lg={22}>
        <Descriptions bordered layout="horizontal" items={items} />
      </Col>
    </>
  );
};

export default UserDetails;

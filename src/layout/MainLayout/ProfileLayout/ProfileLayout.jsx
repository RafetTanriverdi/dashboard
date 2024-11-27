import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "../MainLayout";
import { Layout } from "antd";

const ProfileLayout = ({ title, content }) => {
  return (
   <Layout>
    {content}
   </Layout>
  );
};

export default ProfileLayout;

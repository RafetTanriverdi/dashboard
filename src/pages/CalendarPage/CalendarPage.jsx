import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Calendar, Modal, Badge } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import dayjs from "dayjs";
import { Spin } from "antd";

const getListData = (value, data) => {
  // API'den aldığınız verileri tarihlere göre filtreleyin
  const date = value.format("YYYY-MM-DD");
  return data.filter(
    (item) => dayjs(item.createdAt).format("YYYY-MM-DD") === date
  );
};

const CalendarPageContainer = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // API'den verileri al
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"], // API'den aldığınız veriler için bir query key
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.LIST).then((res) => res.data),
  });
  const { data: productsData } = useQuery({
    queryKey: ["products"], // API'den aldığınız veriler için bir query key
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });

  const dateCellRender = (value) => {
    const listCategoryData = getListData(value, categoryData || []);
    const listProductData = getListData(value, productsData || []);

    return (
      <ul className="events" style={{ overflowX: "hidden" }}>
        {listCategoryData.map((item) => (
          <li
            key={item.categoryId}
            onClick={() => {
              setModalContent(item.categoryName);
              setOpen(true);
            }}
          >
            <Badge
              status={"success"}
              text={`${listCategoryData.length} Added Category`}
            />
          </li>
        ))}
        {listProductData.map((item) => (
          <li
            key={item.productId}
            onClick={() => {
              setModalContent(item.name);
              setOpen(true);
            }}
          >
            <Badge
              status={"warning"}
              text={`${listProductData.length} Added Product`}
            />
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) return <Spin />;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <Modal open={open} onCancel={() => setOpen(false)} title="Event Details">
        <p>{modalContent}</p>
      </Modal>
      <Calendar locale={"tr"} cellRender={dateCellRender} fullscreen={true} />
    </>
  );
};

const CalendarPage = () => {
  return (
    <MainLayout
      content={<CalendarPageContainer />}
      sider={<RTSider />}
      header={<RTHeader />}
      title={"Calendar Page"}
    />
  );
};

export default CalendarPage;

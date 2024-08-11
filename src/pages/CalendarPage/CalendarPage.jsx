import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Calendar, Modal, Badge } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import dayjs from "dayjs";
import { Spin } from "antd";

const getListData = (value, data, view) => {
  if (view === 'year') {
    const month = value.month();
    return data.filter(
      (item) => dayjs(item.createdAt).month() === month
    );
  } else {
    const date = value.format("YYYY-MM-DD");
    return data.filter(
      (item) => dayjs(item.createdAt).format("YYYY-MM-DD") === date
    );
  }
};

const CalendarPageContainer = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.LIST).then((res) => res.data),
  });
  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.PRODUCT.LIST).then((res) => res.data),
  });

  const monthCellRender = (value) => {
    const listCategoryData = getListData(value, categoryData || [], 'year');
    const listProductData = getListData(value, productsData || [], 'year');

    return (
      <ul className="events" style={{ overflowX: "hidden" }}>
        {listCategoryData.length > 0 && (
          <li
            onClick={() => {
              setModalContent(`Categories: ${listCategoryData.map(item => item.categoryName).join(", ")}`);
              setOpen(true);
            }}
          >
            <Badge
              status={"success"}
              text={`${listCategoryData.length} Added Category`}
            />
          </li>
        )}
        {listProductData.length > 0 && (
          <li
            onClick={() => {
              setModalContent(`Products: ${listProductData.map(item => item.name).join(", ")}`);
              setOpen(true);
            }}
          >
            <Badge
              status={"warning"}
              text={`${listProductData.length} Added Product`}
            />
          </li>
        )}
      </ul>
    );
  };

  const dateCellRender = (value) => {
    const listCategoryData = getListData(value, categoryData || [], 'date');
    const listProductData = getListData(value, productsData || [], 'date');

    return (
      <ul className="events" style={{ overflowX: "hidden" }}>
        {listCategoryData.length > 0 && (
          <li
            onClick={() => {
              setModalContent(`Categories: ${listCategoryData.map(item => item.categoryName).join(", ")}`);
              setOpen(true);
            }}
          >
            <Badge
              status={"success"}
              text={`${listCategoryData.length} Added Category`}
            />
          </li>
        )}
        {listProductData.length > 0 && (
          <li
            onClick={() => {
              setModalContent(`Products: ${listProductData.map(item => item.name).join(", ")}`);
              setOpen(true);
            }}
          >
            <Badge
              status={"warning"}
              text={`${listProductData.length} Added Product`}
            />
          </li>
        )}
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
      <Calendar 
        locale={"tr"} 
        dateCellRender={dateCellRender} 
        monthCellRender={monthCellRender} 
        
        fullscreen={true} 
      />
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

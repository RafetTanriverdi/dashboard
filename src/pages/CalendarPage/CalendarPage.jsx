import "./CalendarPage.scss";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Calendar, Modal } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";
import dayjs from "dayjs";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { getRoutePath } from "@rt/routing/routes";

const getListData = (value, data, view) => {
  if (view === "year") {
    const month = value.month();
    return data.filter((item) => dayjs(item.createdAt).month() === month);
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
  const [route, setRoute] = useState("");
  const navigate = useNavigate();

  const {
    data: categoryData,
    isLoading,
    error: categoryError,
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

  const { data: ordersData, error: ordersError } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.ORDERS.LIST).then((res) => res.data),
  });

  const { data: usersData, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.USER.LIST).then((res) => res.data),
  });

  const { data: customerData, error: customerError } = useQuery({
    queryKey: ["customers"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CUSTOMERS.LIST).then((res) => res.data),
  });

  const monthCellRender = (value) => {
    const listCategoryData = getListData(value, categoryData || [], "year");
    const listProductData = getListData(value, productsData || [], "year");
    const listOrderData = getListData(value, ordersData || [], "year");
    const listUserData = getListData(value, usersData || [], "year");
    const listCustomerData = getListData(value, customerData || [], "year");

    return (
      <div
        style={{
          gap: "4px",
          rowGap: "4px",
        }}
      >
        {listCategoryData.length > 0 && (
          <Tag
            style={{ width: "max-content" }}
            color="success"
            onClick={() => {
              setModalContent(
                `Categories: ${listCategoryData
                  .map((item) => item.categoryName)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.categories);
            }}
          >
            {`${listCategoryData.length} Added Category`}
          </Tag>
        )}
        {listProductData.length > 0 && (
          <Tag
            style={{ width: "max-content" }}
            color="purple"
            onClick={() => {
              setModalContent(
                `Products: ${listProductData
                  .map((item) => item.productName)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.products);
            }}
          >
            {`${listProductData.length} Added Product`}
          </Tag>
        )}
        {listOrderData.length > 0 && (
          <Tag
            color="processing"
            onClick={() => {
              setModalContent(
                `Orders: ${listOrderData.map((item) => item.id).join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.orders);
            }}
          >
            {`${listOrderData.length} Added Order`}
          </Tag>
        )}
        {listUserData.length > 0 && (
          <Tag
            color="cyan"
            onClick={() => {
              setModalContent(
                `Users: ${listUserData.map((item) => item.name).join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.users);
            }}
          >
            {`${listUserData.length} Added User`}
          </Tag>
        )}
        {listCustomerData.length > 0 && (
          <Tag
            color="orange"
            onClick={() => {
              setModalContent(
                `Customers: ${listCustomerData
                  .map((item) => item.name)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.customers);
            }}
          >
            {`${listCustomerData.length} Added Customer`}
          </Tag>
        )}
      </div>
    );
  };

  const dateCellRender = (value) => {
    const listCategoryData = getListData(value, categoryData || [], "date");
    const listProductData = getListData(value, productsData || [], "date");
    const listOrderData = getListData(value, ordersData || [], "date");
    const listUserData = getListData(value, usersData || [], "date");
    const listCustomerData = getListData(value, customerData || [], "date");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "4px",
        }}
      >
        {listCategoryData.length > 0 && (
          <Tag
            color="success"
            onClick={() => {
              setModalContent(
                `Categories: ${listCategoryData
                  .map((item) => item.categoryName)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.categories);
            }}
          >
            {`${listCategoryData.length} Added Category`}
          </Tag>
        )}
        {listProductData.length > 0 && (
          <Tag
            color="purple"
            onClick={() => {
              setModalContent(
                `Products: ${listProductData
                  .map((item) => item.productName)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.products);
            }}
          >
            {`${listProductData.length} Added Product`}
          </Tag>
        )}
        {listOrderData.length > 0 && (
          <Tag
            color="processing"
            onClick={() => {
              setModalContent(
                `Orders: ${listOrderData
                  .map((item) => item.currentStatus)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.orders);
            }}
          >
            {`${listOrderData.length} Added Order`}
          </Tag>
        )}
        {listUserData.length > 0 && (
          <Tag
            color="cyan"
            onClick={() => {
              setModalContent(
                `Users: ${listUserData.map((item) => item.name).join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.users);
            }}
          >
            {`${listUserData.length} Added User`}
          </Tag>
        )}
        {listCustomerData.length > 0 && (
          <Tag
            color="orange"
            onClick={() => {
              setModalContent(
                `Customers: ${listCustomerData
                  .map((item) => item.name)
                  .join(", ")}`
              );
              setOpen(true);
              setRoute(ROUTES_ID.customers);
            }}
          >
            {`${listCustomerData.length} Added Customer`}
          </Tag>
        )}
      </div>
    );
  };

  if (isLoading) return <RTSkeleton />;
  if (categoryError && customerError && usersError && ordersError)
    return (
      <RTAlert
        type="error"
        message={
          categoryError.response.data.message ||
          customerError.response.data.message ||
          usersError.response.data.message ||
          ordersError.response.data.message
        }
      />
    );

  return (
    <div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Event Details"
        okText="Go to Details"
        onOk={() => navigate(getRoutePath(route))}
      >
        <p>{modalContent}</p>
      </Modal>
      <Calendar
        style={{
          height: "80vh",
        }}
        locale={"tr"}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        fullscreen={true}
      />
    </div>
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

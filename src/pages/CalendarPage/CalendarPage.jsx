import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Calendar, Modal, Badge, Button } from "antd";
import { useState } from "react";

const getListData = (value) => {
  let listData = [];
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const CalendarPageContainer = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events" style={{ overflowX: "hidden" }}>
        {listData.map((item) => (
          <li
            key={item.content}
            onClick={() => {
              setModalContent(item.content);
              setOpen(true);
            }}
          >
            <Badge status={item.type} text={item.content} />
            <Button>{item.content}</Button>
          </li>
        ))}
      </ul>
    );
  };



  return (
    <>
      <Modal open={open} onCancel={() => setOpen(false)} title="Event Details">
        <p>{modalContent}</p>
      </Modal>
      <Calendar locale={"tr"} cellRender={dateCellRender} fullscreen={true}  />
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

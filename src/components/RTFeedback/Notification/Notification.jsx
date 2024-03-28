import { notification } from "antd";

const Notification = () => {
  const [messageApi, context] = notification.useNotification();

  const openNotification = ({ message, duration, type }) => {
    messageApi.open({
      type: `${type}`,
      message: `${message}`,
      duration: duration,
      placement: "bottomRight",
      style: { color: "red" },
    });
  };

  return { context, openNotification };
};

export default Notification;

import { notification } from "antd";

const Notification = () => {
  const [messageApi, context] = notification.useNotification();

  const openNotification = ({ message, duration, type, key,onClose }) => {
    messageApi.open({
      key: `${key}`,
      type: `${type}`,
      message: `${message}`,
      duration: duration,
      placement: "bottomRight",
      onClose:onClose,
    });
  };

  return { context, openNotification };
};

export default Notification;

import { message } from "antd";

const Message = () => {
  const [messageApi, context] = message.useMessage();
  const openMessage = ({ message, duration, type, key, onClose }) => {
    messageApi.open({
      key: `${key}`,
      type: `${type}`,
      content: `${message}`,

      duration: duration,
      onClose: onClose,
    });
  };
  return { context, openMessage };
};

export default Message;

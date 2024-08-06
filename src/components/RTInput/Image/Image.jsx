import { Form, Upload } from "antd";
import PropTypes from "prop-types";

const ImageUpload = ({
  label,
  name,
  maxCount,
  handleImageChange,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: ` Please upload an ${label}` }]}
    >
      <Upload
    
        listType="picture-card"
        maxCount={maxCount}
        onChange={handleImageChange}
        beforeUpload={() => false}
      >
       Click to Upload
      </Upload>
    </Form.Item>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  fileList: PropTypes.array,
  maxCount: PropTypes.number,
  handleImageChange: PropTypes.func,
};

export default ImageUpload;

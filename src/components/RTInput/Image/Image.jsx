import { Form, Upload } from "antd";
import PropTypes from "prop-types";

const ImageUpload = ({
  label,
  name,
  maxCount,
  onChange,
  fileList,
  onPreview,
  showPreviewIcon,
  required,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required && !fileList.length,
          message: `Please upload an ${label}`,
        },
      ]}
    >
      <Upload
        fileList={fileList}
        onPreview={onPreview}
        showUploadList={{ showPreviewIcon: showPreviewIcon || false }}
        listType="picture-card"
        maxCount={maxCount}
        onChange={onChange}
        beforeUpload={() => false} 
        
        
      >
        {fileList.length < maxCount && 'Click to Upload'}
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
  onPreview: PropTypes.func,
  showPreviewIcon: PropTypes.bool,
  required: PropTypes.bool,
};

export default ImageUpload;

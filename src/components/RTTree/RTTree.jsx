import { Tree } from "antd";
import { Form } from "antd";

const RTTree = ({
  name,
  label,
  required,
  checkable,
  defaultExpandedKeys,
  checkedKeys,
  onCheck,
  treeData,
  selectable,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: { required }, message: `Please select ${label}!` }]}
    >
      <Tree
        checkable={checkable}
        defaultExpandedKeys={defaultExpandedKeys}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={treeData}
        selectable={selectable}
      />
    </Form.Item>
  );
};

export default RTTree;

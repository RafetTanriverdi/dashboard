import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";

const NewCategoryPanel = ({ name, setName, form }) => {
  return (
    <>
      <Form layout="vertical" form={form}>
        <RTInput.text
          label="Name"
          name="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </Form>
    </>
  );
};

export default NewCategoryPanel;

import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";
import {
  permissionsList,
  roleOptions,
  generateTreeDataFromPermissions,
} from "./PermissionsAndRoleList";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import RTTree from "@rt/components/RTTree/RTTree";

const NewUserPanel = ({
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  form,
  setRole,
  setPermissions,
  role,
  permissions,
}) => {
  const treeData = generateTreeDataFromPermissions(permissionsList);

  const onCheck = (checkedKeysValue) => {
    const newCheckedKeys = [...checkedKeysValue];

    permissionsList.forEach((group) => {
      const readKey = group.permissions.find((perm) => perm.includes("Read"));
      const updateKey = group.permissions.find((perm) =>
        perm.includes("Update")
      );
      const createKey = group.permissions.find((perm) =>
        perm.includes("Create")
      );
      const deleteKey = group.permissions.find((perm) =>
        perm.includes("Delete")
      );

      // If Update, Create, or Delete is checked, add Read permission automatically
      if (
        newCheckedKeys.includes(updateKey) ||
        newCheckedKeys.includes(createKey) ||
        newCheckedKeys.includes(deleteKey)
      ) {
        if (!newCheckedKeys.includes(readKey)) {
          newCheckedKeys.push(readKey);
        }
      }
    });

    setPermissions(newCheckedKeys);
    form.setFieldsValue({ Permissions: newCheckedKeys }); // Update the form field value
  };

  const handleRoleChange = (value) => {
    const selectedRole = roleOptions.find((role) => role.name === value);
    if (selectedRole) {
      setRole(selectedRole.name);
      setPermissions(selectedRole.permissions);
      form.setFieldsValue({ Permissions: selectedRole.permissions }); // Update the form field value
    } else {
      setRole("Other");
      setPermissions([]);
      form.setFieldsValue({ Permissions: [] }); // Clear the form field value
    }
  };

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
        <RTInput.text
          label="Email"
          name="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <RTInput.phone
          label="Phone Number"
          name="PhoneNumber"
          pattern={/^[0-9]{10,15}$/}
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          required
        />
        <RTSelect
          label="Role"
          name="Role"
          required
          value={role}
          placeholder="Select a role"
          onChange={handleRoleChange}
          options={[
            ...roleOptions.map((role) => ({
              value: role.name,
              label: role.name,
            })),
          ]}
        />

        <RTTree
          label={"Permissions"}
          name={"Permissions"}
          required
          checkable
          defaultExpandedKeys={["Products", "Categories"]}
          checkedKeys={permissions}
          onCheck={onCheck}
          treeData={treeData}
          selectable={false}
        />
      </Form>
    </>
  );
};

export default NewUserPanel;

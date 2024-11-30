import { RTInput } from "@rt/components/RTInput";
import { Form } from "antd";
import RTSelect from "@rt/components/RTSelect/RTSelect";
import RTTree from "@rt/components/RTTree/RTTree";
import {
  permissionsList,
  roleOptions,
  generateTreeDataFromPermissions,
} from "@rt/pages/UsersPage/page-components/NewUser/PermissionsAndRoleList";

const EditUserPanel = ({
  form,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  newRole,
  setNewRole,
  newPermissions,
  setNewPermissions,
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
      const refundKey = group.permissions.find((perm) =>
        perm.includes("Refund")
      );
      const detailsKey = group.permissions.find((perm) =>
        perm.includes("Details")
      );

      if (
        newCheckedKeys.includes(updateKey) ||
        newCheckedKeys.includes(createKey) ||
        newCheckedKeys.includes(deleteKey) ||
        newCheckedKeys.includes(refundKey) ||
        newCheckedKeys.includes(detailsKey)
      ) {
        if (!newCheckedKeys.includes(readKey)) {
          newCheckedKeys.push(readKey);
        }
      }
    });

    setNewPermissions(newCheckedKeys);
    form.setFieldsValue({ Permissions: newCheckedKeys });
    console.log(newPermissions, "newPermissions");
  };

  const handleRoleChange = (value) => {
    const selectedRole = roleOptions.find((role) => role.name === value);

    if (selectedRole) {
      setNewRole(selectedRole.name);
      setNewPermissions(selectedRole.permissions);
      form.setFieldsValue({ Permissions: selectedRole.permissions });
    } else {
      setNewRole("Other");
      setNewPermissions([]);
      form.setFieldsValue({ Permissions: [] });
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        Name: newName,
        "Phone Number": newNumber,
        Role: newRole,
        Permissions: newPermissions,
      }}
    >
      <RTInput.text
        label="Name"
        name="Name"
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        required
      />
      <RTInput.phone
        label="Phone Number"
        name="Phone Number"
        pattern={/^[0-9]{10,15}$/}
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
        required
      />
      <RTSelect
        label="Role"
        name="Role"
        required
        value={newRole}
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
        checkedKeys={newPermissions}
        onCheck={onCheck}
        treeData={treeData}
        selectable={false}
      />
    </Form>
  );
};

export default EditUserPanel;

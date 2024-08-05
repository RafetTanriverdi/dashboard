/* eslint-disable no-unused-vars */
import { RTInput } from "@rt/components/RTInput";
import { Input, Select, Tree, Form } from "antd";
import { useState } from "react";

const { Option } = Select;

const roleOptions = [
  { name: 'Admin', permissions: ['Product:Create', 'Product:Read', 'Product:Update', 'Product:Delete', 'Category:Create', 'Category:Read', 'Category:Update', 'Category:Delete', 'User:Create', 'User:Read', 'User:Update', 'User:Delete'] },
  { name: 'Manager', permissions: ['Product:Read', 'Category:Read', 'User:Read'] },
  { name: 'User', permissions: ['Product:Read'] },
];

const permissionsList = [
  {
    name: "Products",
    permissions: [
      "Product:Create",
      "Product:Read",
      "Product:Update",
      "Product:Delete",
    ],
  },
  {
    name: "Categories",
    permissions: [
      "Category:Create",
      "Category:Read",
      "Category:Update",
      "Category:Delete",
    ],
  },
  {
    name: "Users",
    permissions: [
      "User:Create",
      "User:Read",
      "User:Update",
      "User:Delete",
    ],
  },
];

const generateTreeDataFromPermissions = (permissionsList) => {
  return permissionsList.map((item, index) => ({
    title: item.name,
    key: `0-${index}`,
    children: item.permissions.map((permission, subIndex) => ({
      title: permission,
      key: `0-${index}-${subIndex}`,
    })),
  }));
};

const treeData = generateTreeDataFromPermissions(permissionsList);

const NewUserPanel = ({
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  form,
}) => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [customRole, setCustomRole] = useState('');
  const [role, setRole] = useState(null);

  const onCheck = (checkedKeysValue) => {
    const newCheckedKeys = [...checkedKeysValue];

    permissionsList.forEach((group, groupIndex) => {
      const readKey = `0-${groupIndex}-1`; // Read izinlerinin key'leri
      const updateKey = `0-${groupIndex}-2`;
      const createKey = `0-${groupIndex}-0`;
      const deleteKey = `0-${groupIndex}-3`;

      // Update, Create veya Delete izni seçildiyse, Read iznini ekle
      if (newCheckedKeys.includes(updateKey) || newCheckedKeys.includes(createKey) || newCheckedKeys.includes(deleteKey)) {
        if (!newCheckedKeys.includes(readKey)) {
          newCheckedKeys.push(readKey);
        }
      }
    });

    setCheckedKeys(newCheckedKeys);
    console.log('onCheck', newCheckedKeys);
  };

  const handleRoleChange = (value) => {
    if (roleOptions.map(role => role.name).includes(value)) {
      const selectedRole = roleOptions.find((role) => role.name === value);
      setRole(selectedRole.name);
      setCheckedKeys(generateKeysFromPermissions(selectedRole.permissions));
      setCustomRole('');
    } else {
      setRole(null);
      setCustomRole(value);
      setCheckedKeys([]); // Özel rol seçildiğinde izinler manuel olarak seçilir
    }
  };

  const handleCustomRoleChange = (e) => {
    setCustomRole(e.target.value);
    if (e.target.value) {
      setRole(null);
      setCheckedKeys([]); // Kullanıcı bir şey yazdığında mevcut rol ve izinleri sıfırla
    }
  };

  const generateKeysFromPermissions = (permissions) => {
    const keys = [];
    permissionsList.forEach((group, groupIndex) => {
      group.permissions.forEach((permission, subIndex) => {
        if (permissions.includes(permission)) {
          keys.push(`0-${groupIndex}-${subIndex}`);
        }
      });
    });
    return keys;
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
      >
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
        <RTInput.text
          label="Phone Number"
          name="PhoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          required
        />
        <Form.Item label="Role">
          <Select
            showSearch
            value={role || customRole}
            placeholder="Select a role or create new"
            style={{ width: 300 }}
            onChange={handleRoleChange}
            dropdownRender={(menu) => (
              <>
                {menu}
                <div style={{ display: 'flex', padding: '8px' }}>
                  <Input
                    style={{ flex: 'auto' }}
                    placeholder="Enter custom role"
                    value={customRole}
                    onChange={handleCustomRoleChange}
                  />
                </div>
              </>
            )}
          >
            {roleOptions.map((role) => (
              <Option key={role.name} value={role.name}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Permissions"
          name="Permissions"
          rules={[{ required: true, message: 'Please select permissions!' }]}
        >
          <Tree
            checkable
            defaultExpandedKeys={['0-0', '0-1']}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            treeData={treeData}
            selectable={false}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default NewUserPanel;

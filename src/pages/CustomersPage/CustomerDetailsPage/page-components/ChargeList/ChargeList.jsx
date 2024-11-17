import { Col, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { ExpandedRowRender } from "./ExpandedList";
import { Card } from "antd";
import { capitalizeFirstLetter } from "@rt/utils/capitalizeFirstLetter";
import dayjs from "dayjs";
import { Descriptions } from "antd";

export const ChargeList = ({ data }) => {
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  useEffect(() => {
    if (data?.charges?.length > 0) {
      const firstCharge = {
        key: data.charges[0].id,
        shipping: data.charges[0].shipping,
        index: 0,
      };
      setSelectedCharge(firstCharge);
    }
  }, [data]);

  console.log("selectedCharge", selectedCharge);

  const handleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKey(record.key);
    } else {
      setExpandedRowKey(null);
    }
  };

  const handleRowSelection = (record) => {
    const selectedCharge = data.charges.find(
      (charge) => charge.id === record.key
    );

    setSelectedCharge({
      key: selectedCharge.id,
      shipping: selectedCharge.shipping,
      index: record.index,
    });
  };

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$ ${amount}`,
    },
    {
      title: "Ordered Products",
      dataIndex: "orderedProducts",
      key: "orderedProducts",
      width: 180,
      ellipsis: true,
      sorter: (a, b) => a.orderedProducts - b.orderedProducts,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  let tableData = [];
  tableData = data?.charges
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .map((item, index) => ({
      key: item.id,
      index,
      id: item.id,
      amount: (item.amount / 100).toFixed(2),
      status: item.amount_refunded
        ? "Refunded"
        : capitalizeFirstLetter(item.status),
      createdAt: dayjs.unix(item.created).format("MMMM,DD YYYY"),
      orderedProducts: JSON.parse(item.metadata.orderItems).length,
    }));
  return (
    <>
      <Col xs={24} md={16}>
        <Table
          pagination={{ pageSize: 4 }}
          expandable={{
            expandedRowRender: (record) => (
              <ExpandedRowRender
                charges={data.charges}
                index={tableData.findIndex((row) => row.key === record.key)}
              />
            ),
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
          columns={columns}
          dataSource={tableData}
          onRow={(record) => ({
            onClick: () => handleRowSelection(record),
          })}
          rowSelection={{
            type: "radio",
            onSelect: handleRowSelection,
            selectedRowKeys: [selectedCharge?.key],
          }}
          scroll={{
            x: 768,
          }}
        />
      </Col>
      <Col xs={24} md={8}>
        {selectedCharge && (
          <Card title="Selected Order Shipping Details">
            <Descriptions column={2}>
              <Descriptions.Item label="Name">
                {selectedCharge.shipping?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedCharge.shipping?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Address 1">
                {selectedCharge.shipping?.address.line1}
              </Descriptions.Item>
              <Descriptions.Item label="Address 2">
                {selectedCharge.shipping?.address.line2}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {selectedCharge.shipping?.address.state}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {selectedCharge.shipping?.address.postal_code}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {selectedCharge.shipping?.address.city}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {selectedCharge.shipping?.address.country}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Col>
    </>
  );
};

export default ChargeList;

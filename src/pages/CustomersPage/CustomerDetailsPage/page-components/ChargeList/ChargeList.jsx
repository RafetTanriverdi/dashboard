import { Col, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { ExpandedRowRender } from "./ExpandedList";
import { Card } from "antd";
import { capitalizeFirstLetter } from "@rt/utils/capitalizeFirstLetter";
import dayjs from "dayjs";

export const ChargeList = ({data}) => {
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  useEffect(() => {
    if (data?.charges?.length > 0) {
      const firstCharge = {
        key: data.charges[0].id,
        index: 0,
        amount: data.charges[0].amount,
        status: data.charges[0].status,
        createdAt: dayjs.unix(data.charges[0].created).format("MMMM,DD YYYY"),
        orderedProducts: JSON.parse(data.charges[0].metadata.orderItems).length,
      };
      setSelectedCharge(firstCharge);
      setExpandedRowKey(data.charges[0].id);
    }
  }, [data]);

  const handleExpand = (expanded, record) => {
    if (expanded) {
      setSelectedCharge(record);
      setExpandedRowKey(record.key);
    } else {
      setExpandedRowKey(null);
    }
  };

  const handleRowSelection = (record) => {
    setSelectedCharge(record);
    setExpandedRowKey(record.key);
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
      status: capitalizeFirstLetter(item.status),
      createdAt: dayjs.unix(item.created).format("MMMM,DD YYYY"),
      orderedProducts: JSON.parse(item.metadata.orderItems).length,
    }));
  return (
    <>
      <Col xs={24} md={15}>
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
      <Col xs={24} md={9}>
        {selectedCharge && (
          <Card title="Selected Charge Details">
            <p>
              <strong>Amount:</strong> {selectedCharge.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedCharge.status}
            </p>
            <p>
              <strong>Ordered Products:</strong>{" "}
              {selectedCharge.orderedProducts}
            </p>
            <p>
              <strong>Created At:</strong> {selectedCharge.createdAt}
            </p>
          </Card>
        )}
      </Col>
    </>
  );
};

export default ChargeList;

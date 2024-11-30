import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { capitalizeFirstLetter } from "@rt/utils/capitalizeFirstLetter";
import { Permissions } from "@rt/utils/permission-util";
import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";
import { Collapse, Descriptions } from "antd";
import dayjs from "dayjs";

const ViewOrderPanel = ({ order }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Order", order.id],
    queryFn: () =>
      axiosInstance
        .get(ENDPOINTS.ORDERS.GET.replace(":orderId", order.id))
        .then((res) => res.data),
  });

  if (isLoading) return <RTSkeleton />;
  if (error) return <div>{error.message}</div>;

  const items = [
    {
      key: 1,
      label: "Customer Name ",
      children: data?.customerName,
    },
    {
      key: 0,
      label: "Customer Email",
      children: data?.customerEmail,
    },
    {
      key: 2,
      label: "Order Status",
      children: data?.currentStatus,
    },
    {
      key: 3,
      label: "Total",
      children: `$ ${(data?.amountTotal / 100).toFixed(2)}`,
    },
    {
      key: 4,
      label: "Created At",
      children: dayjs(data?.createdAt).format("MMM DD, YYYY - hh:mm A"),
    },
    {
      key: 5,
      label: "Payment Status",
      children: capitalizeFirstLetter(data?.paymentStatus),
    },
    {
      key: 6,
      label: "Shipping Address",
      children: (
        <>
          Name: {data?.shipping?.name} <br />
          Phone: {data?.shipping?.phone} <br />
          <br />
          <Collapse
            expandIconPosition="end"
            items={[
              {
                key: 1,
                label: "Address",
                children: (
                  <>
                    Address Line1: {data?.shipping?.address?.line1} <br />
                    Address Line2: {data?.shipping?.address?.line2} <br />
                    City: {data?.shipping?.address?.city} <br />
                    State: {data?.shipping?.address?.state} <br />
                    Country: {data?.shipping?.address?.country} <br />
                    Postal Code: {data?.shipping?.address?.postal_code} <br />
                  </>
                ),
              },
            ]}
          />
        </>
      ),
      span: 4,
    },
    {
      key: 7,
      label: "Ordered Products",
      children: (
        <Collapse
          expandIconPosition="end"
          items={data?.products.map((e) => {
            return {
              key: e.productId,
              label: e.productName,
              children: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Image width={100} src={e.productImage[0]} />
                    <div>
                      <p>Name: {e.productName}</p>
                      <p>Price: $ {e.productPrice.toFixed(2)}</p>
                      <p>Quantity: {e.quantity}</p>
                      <p>
                        Subtotal: $ {(e.productPrice * e.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </>
              ),
            };
          })}
        />
      ),
    },
  ];

  return (
    <>
      <RTAuthContainer
        action={Permissions.orders.actions.read}
        subject={Permissions.orders.subject}
      >
        <Descriptions items={items} bordered layout="vertical" />
      </RTAuthContainer>
    </>
  );
};

export default ViewOrderPanel;

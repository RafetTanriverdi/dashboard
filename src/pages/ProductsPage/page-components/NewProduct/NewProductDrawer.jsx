import { Drawer } from "antd";
import NewProductPanel from "./NewProductPanel";
import { RTButton } from "@rt/components/RTButton";
import { useState } from "react";
import { axiosInstance } from "@rt/network/httpRequester";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";

export const NewProductDrawer = ({ onClose, open }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const queryClient = useQueryClient();

  const postBody = {
    title: title,
    price: price,
    description: description,
    image: "https://via.placeholder.com/150",
    category: category,
  };

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axiosInstance.post(ENDPOINTS.PRODUCT.ADD, newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Drawer
      title="Add New Product"
      placement="right"
      size="large"
      onClose={onClose}
      open={open}
      extra={
        <RTButton.add
          text="Add New Product"
          onClick={() => mutation.mutate(postBody)}
          loading={mutation.isPending}
        />
      }
    >
      <NewProductPanel
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
      />
    </Drawer>
  );
};

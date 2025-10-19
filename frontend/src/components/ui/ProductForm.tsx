import React from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
  Product,
} from "../../store/productSlice";
import type { AppDispatch } from "../../store";

interface Props {
  product?: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<Props> = ({ product, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const onFinish = async (values: Omit<Product, "id">) => {
    try {
      if (product) {
        await dispatch(updateProduct({ id: product.id, data: values }));
        message.success("Produit modifié avec succès !");
      } else {
        await dispatch(createProduct(values));
        message.success("Produit ajouté avec succès !");
      }
      onClose();
    } catch {
      message.error("Une erreur est survenue");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={product || {}}
      onFinish={onFinish}
    >
      <Form.Item
        label="Nom"
        name="name"
        rules={[{ required: true, message: "Veuillez entrer un nom" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Veuillez entrer une description" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Prix"
        name="price"
        rules={[{ required: true, message: "Veuillez entrer un prix" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Veuillez entrer un stock" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Catégorie" name="category">
        <Input />
      </Form.Item>

      <Form.Item label="Image (URL)" name="image">
        <Input />
      </Form.Item>

      <div className="flex justify-end">
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Annuler
        </Button>
        <Button type="primary" htmlType="submit">
          {product ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;

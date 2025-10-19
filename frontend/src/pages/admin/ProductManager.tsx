import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Modal,
  message,
  Popconfirm,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchProducts,
  deleteProduct,
  Product,
} from "../../store/productSlice";
import ProductForm from "../../components/ui/ProductForm";
import AdminSidebar from "../../components/ui/AdminSidebar";

const ProductManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector(
    (state: RootState) => state.products
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteProduct(id));
    message.success("Produit supprimé avec succès");
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nom", dataIndex: "name", key: "name" },
    { title: "Prix", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Catégorie", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Modifier
          </Button>
          <Popconfirm
            title="Supprimer le produit ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger>
              Supprimer
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-full bg-white shadow-lg z-20">
        <AdminSidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 ml-64 overflow-y-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestion des Produits
            </h1>
            <Button type="primary" onClick={handleAdd}>
              + Ajouter un produit
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              dataSource={products}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 8 }}
              bordered
            />
          )}
        </div>

        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          destroyOnClose
        >
          <ProductForm
            product={editingProduct}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProductManager;

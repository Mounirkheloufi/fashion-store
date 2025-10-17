import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers, banUser } from "../../store/usersSlice";
import AdminSidebar from "../../components/ui/AdminSidebar";
import { Table, Tag, Button, Spin, Input, Select, Badge } from "antd";
import { SearchOutlined, UserOutlined, FilterOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const UserManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: users, loading } = useSelector((state: RootState) => state.users);
  
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState(10);

  // Charger la liste au montage
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBanToggle = (id: string, isActive: number) => {
    dispatch(banUser(id)); // banUser changera is_active (0 ou 1)
  };

  // Filtrer les données
  const filteredUsers = users.filter((user: any) => {
    const matchSearch = 
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    const matchStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && user.is_active === 1) ||
      (statusFilter === "banned" && user.is_active === 0);
    
    return matchSearch && matchRole && matchStatus;
  });

  // Statistiques
  const stats = {
    total: users.length,
    active: users.filter((u: any) => u.is_active === 1).length,
    banned: users.filter((u: any) => u.is_active === 0).length,
    admins: users.filter((u: any) => u.role === "admin").length,
  };

  const columns = [
    {
      title: "Utilisateur",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Rôle",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag 
          color={role === "admin" ? "volcano" : "blue"}
          className="!px-3 !py-1 !rounded-full !font-semibold"
        >
          {role === "admin" ? "👑 Admin" : "👤 User"}
        </Tag>
      ),
    },
    {
      title: "Statut",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: number) =>
        is_active === 1 ? (
          <Tag 
            icon={<CheckCircleOutlined />} 
            color="success"
            className="!px-3 !py-1 !rounded-full !font-semibold"
          >
            Actif
          </Tag>
        ) : (
          <Tag 
            icon={<CloseCircleOutlined />} 
            color="error"
            className="!px-3 !py-1 !rounded-full !font-semibold"
          >
            Banni
          </Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) =>
        record.is_active === 1 ? (
          <Button 
            danger 
            onClick={() => handleBanToggle(record.id, 1)}
            className="!rounded-lg !font-semibold hover:!scale-105 !transition-transform !duration-200"
            icon={<CloseCircleOutlined />}
          >
            Désactiver
          </Button>
        ) : (
          <Button 
            type="primary" 
            onClick={() => handleBanToggle(record.id, 0)}
            className="!rounded-lg !font-semibold !bg-green-600 hover:!bg-green-700 hover:!scale-105 !transition-transform !duration-200"
            icon={<CheckCircleOutlined />}
          >
            Activer
          </Button>
        ),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
    {/* Sidebar fixe */}
    <div className="w-64 fixed left-0 top-0 h-full bg-white shadow-lg z-20">
      <AdminSidebar />
    </div>

    {/* Contenu principal scrollable */}
    <div className="flex-1 ml-64 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <UserOutlined className="text-white text-xl" />
                </div>
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez les utilisateurs et leurs permissions
              </p>
            </div>
            <Badge count={filteredUsers.length} showZero className="!bg-blue-600">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-600">
                  Total: {filteredUsers.length}
                </span>
              </div>
            </Badge>
          </div>
        </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Total</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserOutlined className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Actifs</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircleOutlined className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Bannis</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600">{stats.banned}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <CloseCircleOutlined className="text-red-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Admins</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.admins}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👑</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  <SearchOutlined className="mr-2" />
                  Rechercher
                </label>
                <Search
                  placeholder="Nom ou email..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="large"
                  className="!rounded-lg"
                  allowClear
                />
              </div>

              {/* Filtre par rôle */}
              <div className="w-full lg:w-48">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  <FilterOutlined className="mr-2" />
                  Rôle
                </label>
                <Select
                  value={roleFilter}
                  onChange={setRoleFilter}
                  size="large"
                  className="w-full"
                >
                  <Option value="all">Tous les rôles</Option>
                  <Option value="admin">👑 Admin</Option>
                  <Option value="user">👤 User</Option>
                </Select>
              </div>

              {/* Filtre par statut */}
              <div className="w-full lg:w-48">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  <FilterOutlined className="mr-2" />
                  Statut
                </label>
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  size="large"
                  className="w-full"
                >
                  <Option value="all">Tous les statuts</Option>
                  <Option value="active">✅ Actif</Option>
                  <Option value="banned">❌ Banni</Option>
                </Select>
              </div>

              {/* Pagination */}
              <div className="w-full lg:w-40">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Par page
                </label>
                <Select
                  value={pageSize}
                  onChange={setPageSize}
                  size="large"
                  className="w-full"
                >
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={50}>50</Option>
                </Select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Spin size="large" />
                  <p className="text-gray-600 mt-4">Chargement des utilisateurs...</p>
                </div>
              </div>
            ) : (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredUsers}
                pagination={{
                  pageSize: pageSize,
                  showSizeChanger: false,
                  showTotal: (total) => `Total: ${total} utilisateurs`,
                  className: "!px-6 !py-4"
                }}
                className="!rounded-2xl"
                scroll={{ x: 800 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
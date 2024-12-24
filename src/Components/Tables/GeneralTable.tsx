import { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, Space, message, Spin } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';


export default function GeneralTable() {
  const baseURL = "http://localhost:3000"
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [editingUser, setEditingUser]: any = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const fetchUsuarios = async (params: any = {}) => {
    setLoading(true);
    try {
      const { data } = await axios.get(baseURL + '/api/dashboard/users', {
        params: {
          ...params,
          search: searchText,
        },
        withCredentials: true
      });

      setUsuarios(data.records);
      setPagination({
        ...params.pagination,
        total: data.total,
      });
    } catch (error) {
      message.error('Error when fetching data from users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios({
      pagination,
    });
  }, [pagination.current, searchText]);


  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    fetchUsuarios({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const handleEdit = (record: any) => {
    setEditingUser(record);
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(baseURL + `/api/dashboard/users/${id}`);
      message.success('User deleted');
      fetchUsuarios({ pagination });
    } catch {
      message.error('Error when deleting user');
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(baseURL + `/api/dashboard/users/${editingUser!.id}`, values);
      message.success('User updated');
      setIsModalOpen(false);
      fetchUsuarios({ pagination });
    } catch {
      message.error('Error when updating user');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'User',
      dataIndex: 'usuario',
      sorter: true,
      filterDropdown: () => <Input placeholder="Buscar User" />,
    },
    {
      title: 'Email',
      dataIndex: 'correo',
      sorter: true,
      filterDropdown: () => <Input placeholder="Find by Email" />,
    },
    {
      title: 'Full Name',
      dataIndex: 'nombreCompleto',
      sorter: true,
      filterDropdown: () => <Input placeholder="Find by Full Name" />,
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Find by Full Name"
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={usuarios}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
        rowKey="id"
      />
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="usuario" label="User" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="correo" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="nombreCompleto" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

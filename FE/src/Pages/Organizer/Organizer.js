import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Button, Modal, Input, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Organizer.css';

const { Title, Text } = Typography;
const { Search } = Input;

export default function Organizer() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [organizerDetails, setOrganizerDetails] = useState([]);
  const [selectedOrganizerId, setSelectedOrganizerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedOrganizerId !== null) {
      fetchOrganizerDetails(selectedOrganizerId);
    }
  }, [selectedOrganizerId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/organizerDetails');
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizerDetails = async (organizerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/OrganizerMoreDetails/${organizerId}`);
      setOrganizerDetails(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching organizer details:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      const filtered = data.filter(
        (organizer) =>
          organizer.fullname.toLowerCase().includes(value.toLowerCase()) ||
          organizer.organizer_id.toString().includes(value)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleOk = () => {
    setOpen(false);
    setOrganizerDetails([]);
  };

  const handleCancel = () => {
    setOpen(false);
    setOrganizerDetails([]);
  };

  const columns = [
    {
      title: 'Organizer Name',
      dataIndex: 'fullname',
      key: 'organizerName',
      render: (text) => <Space><UserOutlined /> {text}</Space>,
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_no',
      key: 'contactNumber',
    },
    {
      title: 'Organizer ID',
      dataIndex: 'organizer_id',
      key: 'organizerId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'More Details',
      key: 'moreDetails',
      render: (text, record) => (
        <Button type="primary" onClick={() => setSelectedOrganizerId(record.organizer_id)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className='main'>
      <Card className='organizer-card' hoverable>
        <div className='header'>
          <h2>Organizer Table</h2>
          <Search
            placeholder="Search by organizer name or ID"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
            style={{ width: '300px', borderRadius: '10px', overflow: 'hidden' }}
            enterButton
          />
        </div>
        <Spin spinning={loading}>
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData.length,
              onChange: handlePageChange,
              showSizeChanger: false,
            }}
            rowKey="organizer_id"
          />
        </Spin>
      </Card>
      <Modal
        title={<Title level={3}>Organizer Details</Title>}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelText="Cancel"
        width={600}
      >
        {organizerDetails.map((organizer, index) => (
          <Card key={index} hoverable style={{ marginBottom: 16 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>Organizer ID</Title>
                <Text>{organizer.organizer_id}</Text>
              </div>
              <div>
                <Title level={4}>Full Name</Title>
                <Text>{organizer.fullname}</Text>
              </div>
              <div>
                <Title level={4}>Email</Title>
                <Text>{organizer.email}</Text>
              </div>
              <div>
                <Title level={4}>Username</Title>
                <Text>{organizer.username}</Text>
              </div>
              <div>
                <Title level={4}>Contact No</Title>
                <Text>{organizer.contact_no}</Text>
              </div>
            </Space>
          </Card>
        ))}
      </Modal>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Modal } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const OrganizerDetails = () => {
  const [organizerDetails, setOrganizerDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [params.organizer_id]); // Refetch data when params.organizer_id changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/OrganizerMoreDetails/${params.organizer_id}`);
      setOrganizerDetails(response.data); // Store data in an array
    } catch (error) {
      console.error('Error fetching organizer details:', error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: '20px', margin: '55' }}>
      <Button type="primary" onClick={showModal}>
        Show Organizer Details
      </Button>
      <Modal
        title="Organizer Details"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ type: 'primary' }}
        cancelButtonProps={{ type: 'default' }}
      >
        {organizerDetails.map((organizer, index) => (
          <div key={index}>
            <div style={{ marginBottom: '10px' }}>
              <Title level={4}>Organizer ID</Title>
              <Text>{organizer.organizer_id}</Text>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Title level={4}>Full Name</Title>
              <Text>{organizer.fullname}</Text>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Title level={4}>Email</Title>
              <Text>{organizer.email}</Text>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Title level={4}>Username</Title>
              <Text>{organizer.username}</Text>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Title level={4}>Contact No</Title>
              <Text>{organizer.contact_no}</Text>
            </div>
          </div>
        ))}
      </Modal>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Link to="/organizer">
          <Button type="primary">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrganizerDetails;
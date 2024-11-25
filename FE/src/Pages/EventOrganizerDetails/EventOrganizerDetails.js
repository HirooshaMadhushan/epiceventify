import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const EventOrganizerDetails = () => {
  const [organizerDetails, setOrganizerDetails] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [params.organizer_id]); // Refetch data when params.organizer_id changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/OrganizerMoreDetails/${params.event_id}`);
      setOrganizerDetails(response.data); // Store data in an array
      console.log(response.data);
      console.log("hi")

    } catch (error) {
      console.error('Error fetching organizer details:', error);
    }
  };

  return (
    <div style={{ padding: '20px', margin: 60 }}>
      <Card title="Organizer Details" style={{ width: 900 }}>
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
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Link to="/organizer">
            <Button type="primary">Back</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default EventOrganizerDetails;

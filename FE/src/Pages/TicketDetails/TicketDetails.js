import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Table, Spin, Button, Card, Typography } from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useParams } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

function TicketDetails() {
  const [data, setData] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const eventId = params.eventId;
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await axios.get(`http://localhost:8000/CompletedEventDetails/${eventId}`);
        setEventDetails(eventResponse.data[0]);

        const ticketResponse = await axios.get(`http://localhost:8000/Ticket_details/${eventId}`);
        setData(ticketResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const columns = [
    { title: 'Type', dataIndex: 'Ticket_type', key: 'type' },
    { title: 'Issued', dataIndex: 'Ticket_issued', key: 'issued' },
    { title: 'Sold Out', dataIndex: 'Ticket_sold', key: 'soldOut' },
    { title: 'Price', dataIndex: 'Ticket_price', key: 'price' },
    { title: 'Total', dataIndex: 'Ticket_total_amount', key: 'total' },
  ];

  const chartData = {
    labels: data.map(ticket => ticket.Ticket_type),
    datasets: [{
      label: 'Tickets',
      data: data.map(ticket => ticket.Ticket_sold),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    }]
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add event image
    if (eventDetails.EventImg) {
      const img = new Image();
      img.src = eventDetails.EventImg;
      doc.addImage(img, 'JPEG', 15, 15, 180, 100);
    }

    // Add event details
    doc.setFontSize(18);
    doc.text('Event Details', 15, 130);
    doc.setFontSize(12);
    doc.text(`Name: ${eventDetails.event_name}`, 15, 140);
    doc.text(`Date: ${eventDetails.date}`, 15, 150);
    doc.text(`Time: ${eventDetails.time}`, 15, 160);
    doc.text(`Venue: ${eventDetails.venue}`, 15, 170);
    doc.text(`Description: ${eventDetails.description}`, 15, 180, { maxWidth: 180 });

    // Add ticket details table
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Ticket Details', 15, 15);
    doc.autoTable({
      head: [columns.map(column => column.title)],
      body: data.map(row => columns.map(column => row[column.dataIndex])),
      startY: 25,
    });

    // Add chart
    if (chartRef.current) {
      const chartImage = chartRef.current.toBase64Image();
      doc.addPage();
      doc.setFontSize(18);
      doc.text('Ticket Summary', 15, 15);
      doc.addImage(chartImage, 'PNG', 15, 30, 180, 180);
    }

    doc.save('event-details.pdf');
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card hoverable style={{ height: '100%' }}>
            <Title level={2} style={{ textAlign: 'center', color: '#722ed1', marginBottom: '24px' }}>Event Details</Title>
            <img 
              src={eventDetails.EventImg || "https://via.placeholder.com/150"} 
              alt="Event"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '24px' }}
            />
            <Paragraph>
              <Text strong>Name:</Text> {eventDetails.event_name}
            </Paragraph>
            <Paragraph>
              <Text strong>Date:</Text> {eventDetails.date}
            </Paragraph>
            <Paragraph>
              <Text strong>Time:</Text> {eventDetails.time}
            </Paragraph>
            <Paragraph>
              <Text strong>Location:</Text> {eventDetails.venue}
            </Paragraph>
            <Paragraph>
              <Text strong>Description:</Text> {eventDetails.description}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card hoverable style={{ marginBottom: '24px' }}>
            <Title level={2} style={{ textAlign: 'center', color: '#722ed1', marginBottom: '24px' }}>Ticket Details</Title>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
          <Card hoverable>
            <Title level={2} style={{ textAlign: 'center', color: '#722ed1', marginBottom: '24px' }}>Summary</Title>
            <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
              <Doughnut data={chartData} ref={chartRef} />
            </div>
            <Button type="primary" onClick={downloadPDF} style={{ display: 'block', margin: '24px auto 0' }}>
              Download Event Data
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TicketDetails;
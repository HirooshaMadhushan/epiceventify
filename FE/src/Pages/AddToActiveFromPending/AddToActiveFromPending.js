import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card } from 'antd';
import AddToInactiveModal from '../AddToActive/AddToActive'; // Ensure the path is correct

const { Title, Paragraph } = Typography;

const styles = {
    container: {
        margin: '70px auto',
        maxWidth: '1200px',
        padding: '40px',
    },
    eventImage: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    infoCard: {
        marginBottom: '20px',
    },
    button: {
        height: '50px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '15px',
    },
};

export default function EventDetail() {
    const [eventDetails, setEventDetails] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const params = useParams();

    useEffect(() => {
        fetchData();
    }, [params.eventId]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/CompletedEventDetails/${params.eventId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event details');
            }
            const data = await response.json();
            setEventDetails(data[0] || {});
        } catch (error) {
            console.error('Error fetching event details:', error);
            setEventDetails({});
        }
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div style={styles.container}>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={16}>
                    <Card>
                        {Object.keys(eventDetails).length > 0 ? (
                            <>
                                <img src={eventDetails.EventImg} alt="Event" style={styles.eventImage} />
                                <Title level={2}>{eventDetails.event_name}</Title>
                                <Paragraph>{eventDetails.description}</Paragraph>
                                <Card style={styles.infoCard}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Title level={4}>Location</Title>
                                            <Paragraph>{eventDetails.venue}</Paragraph>
                                        </Col>
                                        <Col span={12}>
                                            <Title level={4}>Date</Title>
                                            <Paragraph>{new Date(eventDetails.date).toLocaleDateString()}</Paragraph>
                                        </Col>
                                    </Row>
                                </Card>
                            </>
                        ) : (
                            <Paragraph>Loading event details...</Paragraph>
                        )}
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Button onClick={handleOpenModal} style={styles.button} type="primary">
                            Add to Active
                        </Button>
                        <Link to={`/user/TicketDetails/${params.eventId}`}>
                            <Button style={styles.button} type="default">Ticket Details</Button>
                        </Link>
                    </Card>
                </Col>
            </Row>

            <AddToInactiveModal
                visible={modalVisible}
                onCancel={handleCloseModal}
                onConfirm={handleCloseModal}
                eventDetails={eventDetails}
            />
        </div>
    );
}
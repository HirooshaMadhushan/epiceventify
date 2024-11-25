import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './gallery.css';
import Admingallery from './admingallery';

export default function Gallery() {
    const [totalEvents, setTotalEvents] = useState(0);

    useEffect(() => {
        fetchTotalEvents();
    }, []);

    const fetchTotalEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/data');
            setTotalEvents(response.data[0].totalevent );
        } catch (error) {
            console.error('Error fetching total events:', error);
        }
    };

    const [inprogress, setInprogress] = useState(0);

    useEffect(() => {
        fetchInprogress();
    }, []);

    const fetchInprogress = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inprogressEvent');
            setInprogress(response.data[0].inprogressEvent );
        } catch (error) {
            console.error('Error fetching total events:', error);
        }
    };

    const [completedEvent, setcompletedEvent] = useState(0);

    useEffect(() => {
        fetchcompletedEvent();
    }, []);

    const fetchcompletedEvent = async () => {
        try {
            const response = await axios.get('http://localhost:8000/completedEvent');
            setcompletedEvent(response.data[0].completedEvent );
        } catch (error) {
            console.error('Error fetching completedEvent events:', error);
        }
    };

    const [weekEvent, setweekEvent] = useState(0);

    useEffect(() => {
        fetchweekEvent();
    }, []);

    const fetchweekEvent = async () => {
        try {
            const response = await axios.get('http://localhost:8000/weekEvent');
            
            console.log(response.data);
            setweekEvent(response.data.weekEvent );
        } catch (error) {
            console.error('Error fetching weekEvent:', error);
        }
    };

    const cards = [
        { title: 'Total Event Listed', text: `${totalEvents}` },
        { title: 'Events in Queue', text:  `${inprogress}` },
        { title: 'Events Completed', text:  `${completedEvent} ` },
        { title: 'Event added in this week', text: `${weekEvent}`  }
    ];

    return (
        <div className='main'>
            <div className="container">
                <Row>
                    {cards.map((card, index) => (
                        <Col key={index} md={3}>
                            <Card bg="primary" text="white" className="mb-4">
                                <Card.Body className="text-center">
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="button">
                <Link to="/completed" className='btn btn-success'>Completed</Link>
                <Link to="/pending" className='btn btn-success'>Pending</Link>
            </div>
            <Admingallery />
        </div>
    );
}

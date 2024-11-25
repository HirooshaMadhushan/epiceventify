import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import './gallery.css';

export default function Admingallery() {
    const [exampleEventGalleries, setExampleEventGalleries] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/completedGallery');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setExampleEventGalleries(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = () => {
        setShowAll(true);
    };

    const handleShowLess = () => {
        setShowAll(false);
    };

    return (
        <div className='main'>
            <div className="gallery-container">
                <Row>
                    {exampleEventGalleries.slice(0, showAll ? exampleEventGalleries.length : 3).map((gallery, index) => (
                        <Col key={index} md={4} className="mb-4">
                            <Card style={{ width: '18rem' }}>
                                {/* <Card.Img variant="top" src={gallery.imageUrl} /> */}
                                <Card.Img variant="top" src="https://glenreceptions.com/wp-content/uploads/2020/10/corporate-events-1200x801.jpg"/>

                                <Card.Body>
                                    <Card.Title>{gallery.event_name}</Card.Title>
                                    <Card.Text>{gallery.venue}</Card.Text>
                                    <Card.Text>{gallery.time}</Card.Text>
                                    
                                    <Link to={`/eventdetails/${gallery.id}`} className='btn btn-success'>Pending</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {exampleEventGalleries.length > 3 && (
                    <div className="view-button">
                        {showAll ? (
                            <Button onClick={handleShowLess}>Show Less</Button>
                        ) : (
                            <Button onClick={handleViewMore}>View More</Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

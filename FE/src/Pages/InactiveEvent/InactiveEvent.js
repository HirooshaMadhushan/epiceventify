import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import './InactiveEvent.css'; // Ensure you have a corresponding CSS file

const { Meta } = Card
const { Search } = Input;

export default function CompletedEvent() {
    const [exampleEventGalleries, setExampleEventGalleries] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/ShowInactiveEvent');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setExampleEventGalleries(data);
            setFilteredEvents(data); // Initially show all events
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

    const handleSearch = (value) => {
        setSearchQuery(value);
        if (value) {
            const filtered = exampleEventGalleries.filter(
                (gallery) =>
                    gallery.event_name.toLowerCase().includes(value.toLowerCase()) ||
                    gallery.event_id.toString().includes(value)
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(exampleEventGalleries); // Reset to all events when search query is empty
        }
    };

    return (
        <div className='main'>
            <div className="header">
                <h3>Inactive Events</h3>
                <Search
                    placeholder="Search by event name or event ID"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchQuery}
                    style={{ width: '300px', borderRadius: '10px', overflow: 'hidden' }}
                    enterButton
                />
            </div>
            <div className="gallery-container">
                <Row gutter={[16, 16]}>
                    {filteredEvents.slice(0, showAll ? filteredEvents.length : 3).map((gallery, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                cover={<img src={gallery.EventImg} alt="Event" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                                actions={[
                                    <Link to={`/user/AddToActiveFromPending/${gallery.event_id}`}>Details</Link>
                                ]}
                            >
                                <Meta
                                    title={gallery.event_name}
                                    description={gallery.venue}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
                {filteredEvents.length > 3 && (
                    <div className="view-button">
                        {showAll ? (
                            <Button type="primary" onClick={handleShowLess} className="mt-4">Show Less</Button>
                        ) : (
                            <Button type="primary" onClick={handleViewMore} className="mt-4">View More</Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import './CompletedEvent.css'; // Make sure to import the CSS

const { Meta } = Card;
const { Search } = Input;

export default function CompletedEvent() {
    const [exampleEventGalleries, setExampleEventGalleries] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearched, setIsSearched] = useState(false);

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
        setIsSearched(!!value);
        if (value) {
            const filtered = exampleEventGalleries.filter(
                (gallery) =>
                    gallery.event_name.toLowerCase().includes(value.toLowerCase()) ||
                    gallery.event_id.toString().includes(value)
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(exampleEventGalleries);
            setIsSearched(false);
        }
    };

    const renderGridView = () => (
        <Row gutter={[16, 16]}>
            {filteredEvents.slice(0, showAll ? filteredEvents.length : 3).map((gallery, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                    <Card
                        hoverable
                        cover={<img alt="Event" src={gallery.EventImg} style={{ height: '200px', objectFit: 'cover' }} />}
                    >
                        <Meta
                            title={gallery.event_name || "No Name"}
                            description={gallery.venue || "No Venue"}
                        />
                        <div style={{ marginTop: '10px' }}>
                            <Link to={`/user/EventDetails/${gallery.event_id}`}>Details</Link>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const renderListView = () => (
        <Row gutter={[0, 16]}>
            {filteredEvents.map((gallery, index) => (
                <Col key={index} xs={24}>
                    <Card
                        hoverable
                        style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
                        cover={<img src={gallery.EventImg} alt="Event" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />}
                    >
                        <Meta
                            title={gallery.event_name || "No Name"}
                            description={gallery.venue || "No Venue"}
                        />
                        <div style={{ marginTop: '10px' }}>
                            <Link to={`/user/EventDetails/${gallery.event_id}`}>Details</Link>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    return (
        <div className='main' style={{ padding: '20px' }}>
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Completed Events</h2>
                <Search
                    placeholder="Search by event name or event ID"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchQuery}
                    style={{ width: '300px' }}
                    enterButton
                />
            </div>
            <div className="gallery-container" style={{ maxWidth: isSearched ? '800px' : '1200px', margin: '0 auto' }}>
                {isSearched ? renderListView() : renderGridView()}
                {!isSearched && filteredEvents.length > 3 && (
                    <div className="view-button" style={{ textAlign: 'center', marginTop: '20px' }}>
                        {showAll ? (
                            <Button type="primary" onClick={handleShowLess}>Show Less</Button>
                        ) : (
                            <Button type="primary" onClick={handleViewMore}>View More</Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
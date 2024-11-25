import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export default function EventDetails() {
  // Dummy data for gallery (replace it with actual data)
  const galleryData = [
    { id: 1, imageUrl: 'image_url_1', eventName: 'Event 1', location: 'Location 1', time: 'Time 1', persons: 'Person 1' },
    { id: 2, imageUrl: 'image_url_2', eventName: 'Event 2', location: 'Location 2', time: 'Time 2', persons: 'Person 2' },
    // Add more gallery data as needed
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60% 40%' }}>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightgrey' }}>
        {/* Gallery */}
        {galleryData.map(gallery => (
          <Card key={gallery.id} style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Img variant="top" src={gallery.imageUrl} />
            
          </Card>
        ))}

        {/* Left side content */}
        <img src="event_photo_url_here" alt="Event" style={{ maxWidth: '100%', marginBottom: '10px' }} />
        <h2>Event Name</h2>
        <p>This is a brief description of the event. You can add some text here to provide more details about the event.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '20px', gap: '10px' }}>
          <div>
            <h3>Location:</h3>
            <p>Event Location</p>
          </div>
          <div>
            <h3>Persons:</h3>
            <p>Person's Name</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {/* Right side content */}
        <h1>Right Side Content</h1>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          {/* Buttons */}
          <Link to="/button1">
            <Button style={{ marginBottom: '10px' }}>Button 1</Button>
          </Link>
          <Link to="/button2">
            <Button style={{ marginBottom: '10px' }}>Button 2</Button>
          </Link>
          <Link to="/button3">
            <Button style={{ marginBottom: '10px' }}>Button 3</Button>
          </Link>
          <Link to="/button4">
            <Button style={{ marginBottom: '10px' }}>Button 4</Button>
          </Link>
          <Link to="/button5">
            <Button style={{ marginBottom: '10px' }}>Button 5</Button>
          </Link>
          <Link to="/">
            <Button style={{ marginBottom: '10px' }}>Button 6</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

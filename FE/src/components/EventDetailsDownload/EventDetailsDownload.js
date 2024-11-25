import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function EventDetailsDownload() {
    const [eventDetails, setEventDetails] = useState({});
    const params = useParams();

    useEffect(() => {
        fetchData();
    }, [params.event_id]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/CompletedEventDetails/${params.event_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event details');
            }
            const data = await response.json();
            console.log(data);
            setEventDetails(data[0]);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('http://localhost:8000/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            // Initiate download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'event_details.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error generating PDF:', error.message);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', margin: '70px' }}>
            {/* Left side content */}
            {/* Right side content */}
            <div style={{ padding: '20px', alignContent: 'center', paddingLeft: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
                    {/* Buttons */}
                    <Button style={{ marginBottom: '10px', width: '250px' }} onClick={handleDownloadPDF}>Download Event Details as PDF</Button>
                    <Link to="/Ticket">
                        <Button style={{ marginBottom: '10px', width: '250px' }}>Back</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

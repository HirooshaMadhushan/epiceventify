import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col } from 'antd';
import { HomeOutlined, AppstoreOutlined, CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './AppContent.css';
import Eventchart from '../graphs/Eventchart';

export default function AppContent() {
    const [totalEvents, setTotalEvents] = useState({ totalevent: 0 });
    const [inprogress, setInprogress] = useState({ inprogressEvent: 0 });
    const [completedEvent, setCompletedEvent] = useState({ completedEvent: 0 });
    const [weekEvent, setWeekEvent] = useState({ weekEvent: 0 });

    const fetchData = useCallback(async (url, setter) => {
        try {
            const response = await axios.get(url);
            setter(response.data[0] || {});
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            setter({});
        }
    }, []);

    const fetchTotalEvents = useCallback(() => fetchData('http://localhost:8000/data', setTotalEvents), [fetchData]);
    const fetchInprogress = useCallback(() => fetchData('http://localhost:8000/inprogressEvent', setInprogress), [fetchData]);
    const fetchCompletedEvent = useCallback(() => fetchData('http://localhost:8000/completedEvent', setCompletedEvent), [fetchData]);
    const fetchWeekEvent = useCallback(() => fetchData('http://localhost:8000/weekEvent', setWeekEvent), [fetchData]);

    useEffect(() => {
        fetchTotalEvents();
        fetchInprogress();
        fetchCompletedEvent();
        fetchWeekEvent();
    }, [fetchTotalEvents, fetchInprogress, fetchCompletedEvent, fetchWeekEvent]);

    const cards = [
        { title: 'Total Events', text: totalEvents?.totalevent || 0, className: 'gradient-purple', icon: <AppstoreOutlined className="icon" />, titleColor: 'blue', valueColor: 'black' },
        { title: 'Pending Event', text: inprogress?.inprogressEvent || 0, className: 'gradient-blue', icon: <HomeOutlined className="icon" />, titleColor: 'rgb(9, 212, 30)', valueColor: 'black' },
        { title: 'Completed Event', text: completedEvent?.completedEvent || 0, className: 'gradient-green', icon: <CheckCircleOutlined className="icon" />, titleColor: 'purple', valueColor: 'black' },
        { title: 'New Events', text: weekEvent?.weekEvent || 0, className: 'gradient-orange', icon: <PlusCircleOutlined className="icon" />, titleColor: 'orange', valueColor: 'black' }
    ];

    return (
        <div className='main'>
            <div className="container">
                <h1 style={{ color: 'black', paddingLeft: '15px' }}>Dashboard</h1>
                <Row gutter={[16, 16]}>
                    {cards.map((card, index) => (
                        <Col key={index} span={6}>
                            <Card
                                bordered={false}
                                className={`custom-card ${card.className}`}
                            >
                                <Row>
                                    <Col span={16}>
                                        <div>
                                            <p className="card-title" style={{ color: card.titleColor }}>{card.title}</p>
                                            <h4 className="card-value" style={{ color: card.valueColor }}>{card.text}</h4>
                                        </div>
                                    </Col>
                                    <Col span={8} className="icon-container">
                                        <div>{card.icon}</div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div style={{ width: '100%' }}>
                <Eventchart />
            </div>
        </div>
    );
}

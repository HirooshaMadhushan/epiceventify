import React, { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { Card } from 'antd';

export default function EventChart() {
    const columnChartRef = useRef(null);
    const donutChartRef = useRef(null);
    const [completedEvents, setCompletedEvents] = useState(0);
    const [inProgressEvents, setInProgressEvents] = useState(0);
    const [monthlyEvents, setMonthlyEvents] = useState([]);

    // Fetch data function
    const fetchEventData = useCallback(async () => {
        try {
            const completedResponse = await fetch('http://localhost:8000/completedEvent');
            const completedData = await completedResponse.json();
            setCompletedEvents(completedData[0]?.completedEvent || 0);

            const inProgressResponse = await fetch('http://localhost:8000/inprogressEvent');
            const inProgressData = await inProgressResponse.json();
            setInProgressEvents(inProgressData[0]?.inprogressEvent || 0);

            const monthlyResponse = await fetch('http://localhost:8000/GetMonthlyeventCount');
            console.log(monthlyResponse)
            const monthlyData = await monthlyResponse.json();
            setMonthlyEvents(monthlyData?.counts || []);
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

    // Update charts when data changes
    useEffect(() => {
        if (monthlyEvents.length > 0) {
            const monthNames = monthlyEvents.map(event => event.month_name);
            const eventCounts = monthlyEvents.map(event => event.number_of_events);

            let columnChartInstance, donutChartInstance;

            // Column Chart Data
            const columnChartData = {
                labels: monthNames,
                datasets: [{
                    label: 'Number of Events',
                    data: eventCounts,
                    backgroundColor: 'blue',
                    borderColor: 'white',
                    borderWidth: 1
                }]
            };

            // Donut Chart Data
            const donutChartData = {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    label: 'Events',
                    data: [completedEvents, inProgressEvents],
                    backgroundColor: ['Purple', 'Blue'],
                    borderColor: ['rgba(0, 0, 255, 1)', 'rgba(128, 0, 128, 1)'],
                    borderWidth: 1
                }]
            };

            // Render Column Chart
            if (columnChartRef.current) {
                const columnChartCtx = columnChartRef.current.getContext('2d');
                if (columnChartInstance) columnChartInstance.destroy();
                columnChartInstance = new Chart(columnChartCtx, {
                    type: 'bar',
                    data: columnChartData,
                    options: {
                        aspectRatio: 2,
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Number of Events per Month',
                                font: { size: 16, weight: 'bold' }
                            }
                        }
                    }
                });
            }

            // Render Donut Chart
            if (donutChartRef.current) {
                const donutChartCtx = donutChartRef.current.getContext('2d');
                if (donutChartInstance) donutChartInstance.destroy();
                donutChartInstance = new Chart(donutChartCtx, {
                    type: 'doughnut',
                    data: donutChartData,
                    options: {
                        aspectRatio: 1,
                        responsive: true,
                        cutout: '60%',
                        plugins: {
                            title: {
                                display: true,
                                text: 'Completed and Pending Events',
                                font: { size: 16, weight: 'bold' }
                            }
                        }
                    }
                });
            }

            return () => {
                if (columnChartInstance) columnChartInstance.destroy();
                if (donutChartInstance) donutChartInstance.destroy();
            };
        }
    }, [completedEvents, inProgressEvents, monthlyEvents]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }} className='graphbody'>
            <Card style={{ width: '60%', marginRight: '10px', color: 'black', backgroundColor: 'white' }} className='column-chart'>
                <canvas ref={columnChartRef}></canvas>
            </Card>
            <Card style={{ width: '40%', marginLeft: '10px', backgroundColor: 'white' }} className='donut-chart'>
                <div style={{ height: '300px', width: '100%' }}>
                    <canvas ref={donutChartRef} style={{ height: '100%', width: '100%' }}></canvas>
                </div>
                <div style={{ paddingLeft: '30px', marginTop: '10px' }}>
                    <h7 style={{ color: 'black' }}>Completed: {completedEvents}</h7>
                    <br />
                    <h7 style={{ color: 'black' }}>Pending: {inProgressEvents}</h7>
                </div>
            </Card>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { HomeIcon, AppWindowIcon } from 'lucide-react';

const AppContent = () => {
    const [totalEvents, setTotalEvents] = useState({ totalevent: 0 });
    const [inprogress, setInprogress] = useState({ inprogressEvent: 0 });
    const [completedEvent, setCompletedEvent] = useState({ completedEvent: 0 });
    const [weekEvent, setWeekEvent] = useState({ weekEvent: 0 });

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setter(data[0] || { totalevent: 0 }); // Provide default value if data[0] is undefined
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                // Set default value in case of error
                setter({ totalevent: 0 });
            }
        };

        // Fetch all data
        fetchData('http://localhost:8000/data', setTotalEvents);
        fetchData('http://localhost:8000/inprogressEvent', setInprogress);
        fetchData('http://localhost:8000/completedEvent', setCompletedEvent);
        fetchData('http://localhost:8000/weekEvent', setWeekEvent);
    }, []);

    const cards = [
        { 
            title: 'Total Event Listed', 
            text: totalEvents?.totalevent || 0, 
            icon: <AppWindowIcon className="h-12 w-12 text-white" />
        },
        { 
            title: 'Events in Queue', 
            text: inprogress?.inprogressEvent || 0, 
            icon: <HomeIcon className="h-12 w-12 text-white" />
        },
        { 
            title: 'Events Completed', 
            text: completedEvent?.completedEvent || 0, 
            icon: <AppWindowIcon className="h-12 w-12 text-white" />
        },
        { 
            title: 'New Events', 
            text: weekEvent?.weekEvent || 0, 
            icon: <HomeIcon className="h-12 w-12 text-white" />
        }
    ];

    return (
        <div className="flex flex-col items-center pt-2 text-gray-600">
            <div className="container mb-0">
                <div className="grid grid-cols-1">
                    <Card className="bg-gray-100 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {cards.map((card, index) => (
                                <Card 
                                    key={index}
                                    className="bg-gradient-to-br from-purple-600 to-purple-400"
                                >
                                    <div className="flex p-4">
                                        <div className="w-1/3 flex justify-center items-center">
                                            {card.icon}
                                        </div>
                                        <div className="w-2/3 text-center">
                                            <p className="text-white text-sm mb-1">
                                                {card.title}
                                            </p>
                                            <h2 className="text-white text-2xl mt-1">
                                                {card.text}
                                            </h2>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
            <div className="w-full">
                {/* Assuming Eventchart is a valid component */}
                {/* <Eventchart /> */}
            </div>
        </div>
    );
};

export default AppContent;
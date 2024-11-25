import React from 'react';
import './App.css';
import Appstart from './Appstart';
import CompletedEvent from './Pages/CompletedEvent/CompletedEvent';
import Organizer from './Pages/Organizer/Organizer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPage from './Pages/Layoutpage/LayoutPage';
import PendingEvent from './Pages/PendingEvent/PendingEvent';
import EventDetail from './Pages/EventDetails/EventDetail';
import OrganizerDetails from './Pages/OrganizerDetails/OrganizerDetails';
import EventDetailsDownload from './components/EventDetailsDownload/EventDetailsDownload';
import EventOrganizerDetails from './Pages/EventOrganizerDetails/EventOrganizerDetails';
import TicketDetails from './Pages/TicketDetails/TicketDetails';
import Login from './components/Login/Login';
import AddToInnactive from './Pages/AddToInnactive/AddToInactiveModal';
import AddToActiveFromPending from './Pages/AddToActiveFromPending/AddToActiveFromPending';
import InactiveEvent from './Pages/InactiveEvent/InactiveEvent';
import AddToActive from './Pages/AddToActive/AddToActive';
import AdminDetails from './Pages/AdminDetails/AdminDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/user" element={<LayoutPage />}>
          <Route path="appstart" element={<Appstart />} />
          <Route path="ticket" element={<CompletedEvent />} />
          <Route path="Organizer" element={<Organizer />} />
          <Route path="PendingEvent" element={<PendingEvent />} />
          <Route path="EventDetails/:eventId" element={<EventDetail />} />
          <Route path="organizer/:id" element={<OrganizerDetails />} />
          <Route path="OrganizerMoreDetails/:organizer_id" element={<OrganizerDetails />} />
          <Route path="EventDetailsDownload/:event_id" element={<EventDetailsDownload />} />
          <Route path="EventOrganizerDetails/:organizer_id" element={<EventOrganizerDetails />} />
          <Route path="TicketDetails/:eventId" element={<TicketDetails />} />
          <Route path="AddToInnactive/:event_id" element={<AddToInnactive />} />
          <Route path="InactiveEvent" element={<InactiveEvent />}/>
          <Route path="AddToActiveFromPending/:eventId" element={<AddToActiveFromPending />} />
          <Route path="AddToActiveEvent/:event_id" element={<AddToActive />} />
          <Route path="AdminDetails" element={<AdminDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

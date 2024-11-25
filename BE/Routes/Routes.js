const express = require('express');
const router = express.Router();

const totalevents = require("../Components/Totalevent/Totalevent");
const completedEvent = require("../Components/completedEvent/completedEvent");
const inprogressEvent = require('../Components/inprogressEvent/inprogressEvent');
const weekEvent = require('../Components/weekEvent/weekEvent');
const gallery = require('../Components/gallery/gallery');
const organizerDetails = require('../Components/organizerDetails/organizerDetails');
const completedGallery = require('../Components/completedGallery/completedGallery');
const EventDetails = require('../Components/EventDetails/EventDetails');
// const mail = require('../Components/Mailsystem/NewUserMailsystem.js');
const CompletedEventDetails= require('../Components/CompletedEventDetails/CompletedEventDetails');
const OrganizerMoreDetails = require('../Components/OrganizerMoreDetails/OrganizerMoreDetails');
const PendingGallery = require('../Components/PendingGallery/PendingGallery');

const Ticket_details = require('../Components/Ticket/Ticket_details/Ticket_details');
const adminLogin = require('../Components/AdminLogin/AdminLogin');
const AddToInactive = require('../Components/AddToInnactive/AddToInnactive');
const ShowInactiveEvent = require('../Components/ShowInactiveEvent/ShowInactiveEvent');
const AddToActiveEvent = require('../Components/AddToActiveEvent/AddToActiveEvent');
const InactiveEventDetails = require('../Components/InactiveEventDetails/InactiveEventDetails');
const AdminDetails = require('../Components/AdminDetails/AdminDetails');
const AdminMoreDetails = require('../Components/AdminMoreDetails/AdminMoreDetails');
const GetMonthlyEventCount = require('../Components/GetMonthlyEventCount/GetMonthlyEventCount');

router.get('/data', (req, res) => {
    totalevents(req, res);
});

router.get('/completedEvent', (req, res) => {
    completedEvent(req, res);
});

router.get('/inprogressEvent', (req, res) => {
    inprogressEvent(req, res);
});

router.get('/weekEvent', (req, res) => {
    weekEvent(req, res);
});

router.get('/gallery', (req, res) => {
    gallery(req, res);
});

router.get('/organizerDetails', (req, res) => {
    organizerDetails(req, res);
});

router.get('/completedGallery', (req, res) => {
    completedGallery(req, res);
});

router.get('/EventDetails', (req, res) => {
    EventDetails(req, res);
});
router.get('/CompletedEventDetails/:id',(req,res)=>{
    CompletedEventDetails(req,res);
});

router.get('/OrganizerMoreDetails/:id',(req,res)=>{
    OrganizerMoreDetails(req,res);
});

router.get('/PendingGallery',(req,res)=>{
    PendingGallery(req,res);
});

router.get('/Ticket_details/:id',(req,res)=>{
    Ticket_details(req,res);
});

router.post('/adminlogin', (req, res) => {
    adminLogin(req, res);
});

router.put('/AddToInactive/:id',(req,res)=>{
    AddToInactive(req,res);
});

router.put('/AddToActiveEvent/:id',(req,res)=>{
    AddToActiveEvent(req,res);
});

router.get('/ShowInactiveEvent',(req,res)=>{
    ShowInactiveEvent(req,res);
});


router.get('./InactiveEventDetails/:id',(req,res)=>{
    AddToActiveEvent(req,res);
});

router.get('/AdminDetails',(req,res)=>{
    AdminDetails(req,res);
});

router.get('/AdminMoreDetails',(req,res)=>{
    AdminMoreDetails(req,res);
});


router.get('/GetMonthlyeventCount',(req,res)=>{
    GetMonthlyEventCount(req,res);
}  );

// router.get('/mail',(req,res)=>{
//     mail(req,res);
// });





module.exports = router;

const path = require('path');
const connection = require('../../connection');
const sendMail = require('../../Utils/sendMail'); 



module.exports = function AddToActiveEvent(req, res) {
    const eventId = req.params.id;

    // Update SQL query
    const sql = "UPDATE event SET type = 0 WHERE event_id = ? ";

    // SQL query to get organizer's email
    const getOrgEmail = 'SELECT email, fullName,event.event_name FROM `event` JOIN organizer ON event.organizer_id = organizer.organizer_id WHERE event.event_id = ?';

    connection.query(sql, [eventId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating event type" });
        }

        // Fetch organizer's email
        connection.query(getOrgEmail, [eventId], (err, emailResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error getting organizer email" });
            }

            const email = emailResult[0].email;
            const name = emailResult[0].fullName;
            const eventname  = emailResult[0].event_name;
            const subject = "Event Activation";
            const htmlTemplatePath = path.join(__dirname, '../../Templates', 'activateevent.html');
            const replacements = { name: name, eventName: eventname};

            // Send email to organizer
            sendMail(email, subject, htmlTemplatePath, replacements)
                .then(() => {
                    return res.status(200).json({ message: "Event type updated successfully and email sent" });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ message: "Error sending email" });
                });
        });
    });
};

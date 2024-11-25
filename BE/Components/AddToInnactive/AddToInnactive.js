const connection = require('../../connection');
const path = require('path');
const sendMail = require('../../Utils/sendMail'); 

module.exports = function AddToInactive(req, res) {
    const eventId = req.params.id;

    // Update SQL query
    const updateEventSql = "UPDATE event SET type = 1 WHERE event_id = ?";
    const getOrgEmailSql = 'SELECT email, fullName, event.event_name FROM event JOIN organizer ON event.organizer_id = organizer.organizer_id WHERE event.event_id = ?';

    connection.query(updateEventSql, [eventId], (err, updateResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating event type" });
        }

        connection.query(getOrgEmailSql, [eventId], (err, emailResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error getting organizer email" });
            }

            if (emailResult.length === 0) {
                return res.status(404).json({ message: "Organizer email not found" });
            }

            const email = emailResult[0].email;
            const name = emailResult[0].fullName;
            const eventname  = emailResult[0].event_name;
            const subject = "Event Inactivation";
            const htmlTemplatePath = path.join(__dirname, '../../Templates', 'inactivateevent.html');
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

const connection = require('../../connection');
const nodemailer = require('nodemailer');

const mailServer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eventifyepic@gmail.com',
        pass: 'fhbm nsdf zche ivgy'
    }
});

console.log('Mail server created');

// Function to add a new user to the database
function addUserToDatabase(newUser) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users SET ?';
        connection.query(query, newUser, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log('User added to database');
            resolve(result.insertId); // Assuming 'insertId' is returned
        });
    });
}

// Function to retrieve the email address of the organizer based on the organizer ID
function getEmailAddressOfOrganizer(organizerId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT email FROM organizers WHERE organizer_id = ?';
        connection.query(query, [organizerId], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (result.length > 0) {
                console.log('Email retrieved from database');
                resolve(result[0].email);
            } else {
                reject('No organizer found with the given ID');
            }
        });
    });
}

// Function to send email to the provided email address
function sendEmail(toEmail) {
    mailServer.sendMail({
        from: 'eventifyepic@gmail.com',
        to: toEmail,
        subject: 'Test Mail',
        text: 'This is a test mail from nodemailer'
    }, (err, info) => {
        if (err) {
            console.log('Cannot send email', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Adding a new user to the database and sending an email to the organizer
async function main(newUser, organizerId) {
    try {
        const userId = await addUserToDatabase(newUser);
        const toEmail = await getEmailAddressOfOrganizer(organizerId);
        sendEmail(toEmail);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Example usage of main function
const newUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Other user fields
};

const organizerIdFromFrontend = 1; // Replace with the actual organizer ID received from the frontend

main(newUser, organizerIdFromFrontend);

console.log('Mail process initiated');

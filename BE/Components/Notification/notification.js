const mysql = require('mysql');
const nodemailer = require('nodemailer');

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'your_db_name'
};

// Email configuration
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'eventifyepic@gmail.com',
        pass: 'fhbm nsdf zche ivgy'
    }
};

// Create database connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass
    }
});

// Function to check schema changes and send an email
function checkSchemaChangesAndNotify() {
    const schemaChangeSql = "SELECT * FROM schema_changes WHERE change_time > (NOW() - INTERVAL 1 MINUTE)";
    
    connection.query(schemaChangeSql, (err, changes) => {
        if (err) {
            console.error("Error checking schema changes:", err);
            return;
        }
        
        if (changes.length > 0) {
            changes.forEach(change => {
                const mailOptions = {
                    from: emailConfig.auth.user,
                    to: 'recipient@example.com',  // Change this to the recipient's email
                    subject: 'Schema Change Notification',
                    text: `A schema change has been made: ${change.change_description}`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Email sent: ' + info.response);
                });
            });
        }
    });
}

// EventDetails function to get event details and check for schema changes
module.exports = async function EventDetails(req, res) {
    const sql = "SELECT * FROM event";
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error getting event details" });
        }
        
        checkSchemaChangesAndNotify();
        
        return res.status(200).json(result);
    });
};

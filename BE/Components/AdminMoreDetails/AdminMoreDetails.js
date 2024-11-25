const connection = require('../../connection');

module.exports = function AdminMoreDetails(req, res) {
    // Correct SQL query
    const sql = "SELECT * FROM users WHERE id = 1";

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching Admin Details" });
        }
        return res.status(200).json({ message: "Admin Details fetched successfully", data: result });
    });
};

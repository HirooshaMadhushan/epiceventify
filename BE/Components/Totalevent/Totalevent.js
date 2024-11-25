const connection = require("../../connection");

module.exports = async function totalevents(req, res) {
    const sql = "SELECT COUNT(*) AS totalevent FROM event";

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching total events" });
        }

        if (result.length === 0 || !result[0].totalevent) {
            return res.status(404).json({ message: "No events found" });
        }

        
        return res.status(200).json(result);
    });
};

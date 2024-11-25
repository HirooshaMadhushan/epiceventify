const connection = require('../../connection');

module.exports = async function getMonthlyEventCount(req, res) {
    const sql = `
        SELECT 
            MONTHNAME(date) AS month_name, 
            COUNT(*) AS number_of_events 
        FROM event 
        WHERE YEAR(date) = YEAR(CURDATE()) 
        GROUP BY MONTH(date), MONTHNAME(date) 
        ORDER BY MONTH(date);
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error getting monthly event count" });
        }
        return res.status(200).json({ counts: result });
    });
};

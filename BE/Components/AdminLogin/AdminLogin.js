
const connection = require('../../connection'); // Adjust path as per your file structure

async function adminLogin(req, res) {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND role = "Admin"';
    connection.query(sql, [email], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const user = result[0];
        if(user.password === password){
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    });

}

module.exports = adminLogin;
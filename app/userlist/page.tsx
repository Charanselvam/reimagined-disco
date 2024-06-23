// pages/api/users.js
import db from 'db';

export default function handler(req, res) {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    res.status(200).json({ users: results });
  });
}

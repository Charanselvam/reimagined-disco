// pages/api/submit-form.js
import sql from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formName, formData } = req.body;

    try {
      const [result] = await sql.query(
        'INSERT INTO form_responses (form_name, response) VALUES (?, ?)',
        [formName, JSON.stringify(formData)]
      );

      res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'Failed to save form data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

import sql from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, type } = req.body;

    try {
      const [result] = await sql.query(
        'INSERT INTO attributes (form_id, name, size, type) VALUES (?, ?, ?, ?)',
        [1, name, null, type]
      );

      res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error('Error saving component:', error);
      res.status(500).json({ error: 'Failed to save component' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

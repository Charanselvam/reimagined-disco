import sql from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { components } = req.body;

    if (!Array.isArray(components)) {
      return res.status(400).json({ error: 'Invalid components data' });
    }

    try {
      const insertComponentPromises = components.map(async component => {
        const result = await sql.query(
          'INSERT INTO attributes (form_id, name, size, type, placeholder, required) VALUES (?, ?, ?, ?, ?, ?)',
          [1, component.name, component.size || null, component.type, component.placeholder || null, component.required || false]
        );

        const attributeId = result[0].insertId;

        const insertOptionPromises = (component.options || []).map(option =>
          sql.query(
            'INSERT INTO options (attribute_id, display_value, value) VALUES (?, ?, ?)',
            [attributeId, option.DisplayValue, option.Value]
          )
        );

        await Promise.all(insertOptionPromises);

        return attributeId;
      });

      const insertedIds = await Promise.all(insertComponentPromises);

      res.status(200).json({ success: true, ids: insertedIds });
    } catch (error) {
      console.error('Error saving components:', error);
      res.status(500).json({ error: 'Failed to save components' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

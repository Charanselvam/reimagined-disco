// pages/api/retriever.js
import sql from '../../db';

export default async function handler(req, res) {
  const { masterName, childName } = req.query;

  try {
    const [results] = await sql.query(
      `SELECT cgdm.NAME ,cgdsa.LOG_QUERY ,cos2.SQL,cgdsa.CNF_GET_DATA_SCRIPTS_ASSTN_ID,cgdc.NAME,cgdsa.KEY_NAME  
       FROM CNF_GET_DATA_MASTER cgdm
       INNER JOIN CNF_GET_DATA_CHILD cgdc ON cgdm.CNF_GET_DATA_MASTER_ID = cgdc.CNF_GET_DATA_MASTER_ID
       INNER JOIN CNF_GET_DATA_SCRIPTS_ASSTN cgdsa ON cgdc.CNF_GET_DATA_CHILD_ID = cgdsa.CNF_GET_DATA_CHILD_ID 
       AND cgdc.CNF_GET_DATA_MASTER_ID = cgdsa.CNF_GET_DATA_MASTER_ID
       INNER JOIN CNF_OBJECT_SCRIPTS cos2 ON cgdsa.CNF_OBJECT_SCRIPTS_ID = cos2.CNF_OBJECT_SCRIPTS_ID
       WHERE cgdm.NAME = ? AND cgdc.NAME = ?`, [masterName, childName]);

    const componentQuery = results[0]?.SQL;

    if (componentQuery) {
      const [components] = await sql.query(componentQuery);
      res.status(200).json({ results: { components } });
    } else {
      res.status(500).json({ error: 'Component query not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

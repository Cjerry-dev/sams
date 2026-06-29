
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const [rows] = await connection.execute('SELECT 1'); // Simple test query
    await connection.end();
    
    res.status(200).json({ status: 'Connected to TiDB!', data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

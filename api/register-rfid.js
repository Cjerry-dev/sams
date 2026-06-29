import mysql from 'mysql2/promise';
import crypto from 'crypto';

const HMAC_SECRET = process.env.HMAC_SECRET; // Store this in Vercel settings!

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const signature = req.headers['x-signature']; // ESP32 sends this
  const { rfid_uid } = req.body;

  // 1. Verify HMAC
  const hmac = crypto.createHmac('sha256', HMAC_SECRET);
  const calculatedSignature = hmac.update(JSON.stringify(req.body)).digest('hex');

  if (signature !== calculatedSignature) {
    return res.status(401).json({ error: 'Unauthorized: Invalid signature' });
  }

  // 2. Database logic
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    await connection.execute('INSERT INTO temp_registration (rfid_uid) VALUES (?)', [rfid_uid]);
    await connection.end();
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

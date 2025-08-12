const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  host: 'paysys.kr',
  database: 'paysys-shop',
  password: '',
  port: 5432,
});

async function exportBillsToJSON() {
  try {
    const result = await pool.query('SELECT * FROM bill ORDER BY created_at');
    
    const bills = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      hall: row.hall,
      etc: row.etc || '',
      total_amount: row.total_amount,
      items: row.items || [],
      reserve: row.reserve,
      created_at: row.created_at,
      cart_id: row.cart_id,
      user_id: row.user_id,
      username: row.username
    }));
    
    const fs = require('fs');
    fs.writeFileSync('bills.json', JSON.stringify(bills, null, 2));
    
    console.log('Exported', bills.length, 'bills to bills.json');
    console.log('First bill items count:', bills[0].items.length);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

exportBillsToJSON();
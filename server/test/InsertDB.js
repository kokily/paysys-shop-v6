const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'paysys-shop',
  password: '',
  port: 5432,
});

async function insertBillsFromJSON() {
  try {
    // JSON 파일 읽기
    const billsData = JSON.parse(fs.readFileSync('bills.json', 'utf8'));
    
    console.log(`Found ${billsData.length} bills to insert`);
    
    // 외래키 제약조건 비활성화
    await pool.query('SET session_replication_role = replica;');
    console.log('Disabled foreign key constraints');
    
    // 기존 bills 테이블 비우기
    await pool.query('DELETE FROM bills');
    console.log('Cleared existing bills table');
    
    // 데이터 삽입
    for (let i = 0; i < billsData.length; i++) {
      const bill = billsData[i];
      
      const query = `
        INSERT INTO bills (id, title, hall, etc, total_amount, items, reserve, created_at, cart_id, user_id, username)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;
      
      await pool.query(query, [
        bill.id,
        bill.title,
        bill.hall,
        bill.etc,
        bill.total_amount,
        JSON.stringify(bill.items),
        bill.reserve,
        bill.created_at,
        bill.cart_id,
        bill.user_id,
        bill.username
      ]);
      
      if ((i + 1) % 100 === 0) {
        console.log(`Inserted ${i + 1} bills...`);
      }
    }
    
    // 외래키 제약조건 다시 활성화
    await pool.query('SET session_replication_role = DEFAULT;');
    console.log('Re-enabled foreign key constraints');
    
    console.log(`Successfully inserted ${billsData.length} bills!`);
    
    // 확인용 쿼리
    const countResult = await pool.query('SELECT COUNT(*) FROM bills');
    console.log('Total bills in database:', countResult.rows[0].count);
    
  } catch (error) {
    console.error('Error inserting bills:', error);
    // 에러 발생 시에도 제약조건 복원
    try {
      await pool.query('SET session_replication_role = DEFAULT;');
    } catch (e) {
      console.error('Error restoring constraints:', e);
    }
  } finally {
    await pool.end();
  }
}

insertBillsFromJSON();
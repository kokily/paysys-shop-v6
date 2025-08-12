const fs = require('fs');

// SQL 파일 읽기
const sqlContent = fs.readFileSync('bills.sql', 'utf8');

console.log('SQL file length:', sqlContent.length);
console.log('\nFirst 500 characters:');
console.log(sqlContent.substring(0, 500));

console.log('\nLooking for INSERT statements...');
const insertMatches = sqlContent.match(/INSERT INTO bills/gi);
console.log('Found INSERT statements:', insertMatches ? insertMatches.length : 0);

// 첫 번째 INSERT 문 찾기
const firstInsert = sqlContent.match(/INSERT INTO bills[^;]+;/);
if (firstInsert) {
  console.log('\nFirst INSERT statement:');
  console.log(firstInsert[0]);
}
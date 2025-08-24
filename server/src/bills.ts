import xlsx from 'xlsx';
import fs from 'fs';

const excelFilePath: string = `${__dirname}/../src/bills.xlsx`;
const outputJsonPath: string = `${__dirname}/../src/bills.json`;

export async function bills() {
  try {
    const workBook = xlsx.readFile(excelFilePath);
    const sheetName: string = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[sheetName];

    const jsonData: any[] = xlsx.utils.sheet_to_json(workSheet);

    const cleanedData = jsonData.map((row) => {
      if (typeof row.created_at === 'number') {
        const date = xlsx.SSF.parse_date_code(row.created_at);
        row.created_at = new Date(date.y, date.m - 1, date.d, date.H, date.M, date.S).toISOString();
      }

      if (row.total_amount && typeof row.total_amount === 'string') {
        row.total_amount = Number(row.total_amount);
      }

      if (row.reserve && typeof row.reserve === 'string') {
        row.reserve = Number(row.reserve);
      }

      if (row.items && typeof row.items === 'string') {
        try {
          const itemsArray = JSON.parse(row.items);

          // items 배열 내부의 각 객체를 순회
          const cleanedItems = itemsArray.map((item) => {
            if (typeof item.count === 'string') {
              item.count = Number(item.count);
            }
            if (typeof item.price === 'string') {
              item.price = Number(item.price);
            }
            if (typeof item.amount === 'string') {
              item.amount = Number(item.amount);
            }
            return item;
          });

          row.items = cleanedItems;
        } catch (error) {
          console.error('파싱 실패: ', error);
        }
      }

      return row;
    });

    fs.writeFileSync(outputJsonPath, JSON.stringify(cleanedData, null, 2));
    console.log('저장 완료');
  } catch (error) {
    console.error(error);
  }
}

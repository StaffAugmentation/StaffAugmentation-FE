import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileExporterService {

  constructor() { }

  importExcel(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(jsonData);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async exportExcelBR(list: any[], fileName: string): Promise<boolean> {
    const XLSX = await import('xlsx');
  
    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_json(worksheet, [{}]);
    XLSX.utils.sheet_add_json(worksheet, list, { skipHeader: false, origin: 1 });
  
    const mergeConfigs = [
      { range: { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } }, text: 'General Request Information' },
      { range: { s: { r: 0, c: 12 }, e: { r: 0, c: 18 } }, text: 'Work Orders/Request Processing' },
      { range: { s: { r: 0, c: 19 }, e: { r: 0, c: 28 } }, text: 'Basic Characteristics' },
      { range: { s: { r: 0, c: 29 }, e: { r: 0, c: 41 } }, text: 'SPECIFIC AGREEMENT' },
    ];
  
    if (!worksheet['!merges']) {
      worksheet['!merges'] = [];
    }
  
    mergeConfigs.forEach((config) => {
      const { range, text } = config;
      if (worksheet['!merges']) {
        worksheet['!merges'].push(range);
      }
  
      const cellRef = XLSX.utils.encode_cell(range.s);
      const cell = worksheet[cellRef] || {};
      cell.t = 's';
      cell.v = text;
      worksheet[cellRef] = cell;
    });
  
    const ref = worksheet['!ref'];
    if (ref) {
      const columnRange = XLSX.utils.decode_range(ref);
      for (let colIndex = columnRange.s.c; colIndex <= columnRange.e.c; colIndex++) {
        let maxLength = 0;
        for (let rowIndex = columnRange.s.r; rowIndex <= columnRange.e.r; rowIndex++) {
          const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          const cell = worksheet[cellRef];
          if (cell && cell.v) {
            const cellValue = cell.v.toString();
            maxLength = Math.max(maxLength, cellValue.length);
          }
        }
        const columnWidth = maxLength > 0 ? Math.min(35, Math.max(10, maxLength + 2)) : 10;
        worksheet['!cols'] = worksheet['!cols'] || [];
        worksheet['!cols'][colIndex] = { wch: columnWidth };
      }
    }
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'data');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
  
    saveAs(data, `${fileName}_export.xlsx`);
    return true;
  }
  
  async exportExcel(list: any[], fileName: string): Promise<boolean> {
    await import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(list);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: "xlsx", type: "array"});
      const data: Blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
      saveAs( data, `${fileName}_export.xlsx`);
      return true;
    });
    return false;
  }
}

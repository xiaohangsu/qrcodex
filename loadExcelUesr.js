var XLS = require("xlsjs");
var XLSX = require('xlsx');
var fs = require('fs');
/**
* configure
*
**/
// fill in  xls xlsx file Nmame
// example: student.xls | student.xlsx
var EXCEL_UESRFILE = 'student.xls';
// fill in sheet that has students' data
// ex: Sheet1 || Sheet2
var SHEET_NAME = 'Sheet1';

var SAVED_JSON_PATH =  './';
var SAVED_JSON_NAME = 'student.json';

var workbook = null;
  /**
   * return JSON
   *
   **/
function toJson(workbook) {

  var FILE_EXTENSION = EXCEL_UESRFILE.split('.').pop().toLowerCase();

  switch (FILE_EXTENSION) {
    case 'xls':
      workbook = XLS.readFile(EXCEL_UESRFILE);
      return XLS.utils.make_json(workbook.Sheets[SHEET_NAME]);

    case 'xlsx':
      workbook = XLSX.readFile(EXCEL_UESRFILE);
      return XLSX.utils.make_json(workbook.Sheets[SHEET_NAME]);
      
    default:
      throw new Error("File Extension isn't correct.");
  }
}

function writeToJsonFile(workbook) {
  fs.writeFile(SAVED_JSON_PATH + SAVED_JSON_NAME, JSON.stringify(toJson(workbook)), null, 4);
}


// console.log(XLS.utils.make_json(workbook.Sheets.Sheet1).length);
// var workbook = XLS.readFile('student.xls');
// // console.log(workbook.Sheets.Sheet1);
var XLS = require("xlsjs");
var XLSX = require('xlsx');
var fs = require('fs');
var AV = require('avoscloud-sdk').AV;
AV.initialize("4jqce5lbpwlc134doriax0mrj2nzalh0nnr07a7uq5lpxro0", "1wvx7b6wgzk3bwk1agwo2a3afavp5gn7n41izj91nfjyij78");
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

var SAVED_JSON_PATH = './';
var SAVED_JSON_NAME = 'student.json';

// intervalLength
// depend on computer CPU capability & bandwidth &
var INTERVELLENGTH = 10;
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

writeToJsonFile(workbook);



function uploadDataToDataBase(workbook) {
  var userJson = toJson(workbook);
  for (var index =0; index < INTERVELLENGTH; index++) {
    intervalUpload(index, userJson, INTERVELLENGTH);
  }
}

function intervalUpload(index, userJson, intervalLength) {
  var Student = AV.Object.extend("student");
  
  console.log(index);
  var student = new Student();
  student.save({
    myFav: [],
    myReview: [],
    password: userJson[index]["学号"],
    student_ID: userJson[index]["学号"],
    username: userJson[index]["姓名"],
    gender: userJson[index]["性别"],
    grade: userJson[index]["年级"],
    class: userJson[index]["班级"]
  }, {
    success: function(student) {
    console.log(index + ' Completed!');
      if (index + intervalLength >= userJson.length) {
        console.log("Task " + (index % intervalLength) + " finished!");
        return;
      }
      return intervalUpload(index + intervalLength, userJson,  intervalLength);
    },
    error: function(student, err) {
      console.log(err.description);
    }
  });
}
uploadDataToDataBase(workbook);


// console.log(XLS.utils.make_json(workbook.Sheets.Sheet1).length);
// var workbook = XLS.readFile('student.xls');
// // console.log(workbook.Sheets.Sheet1);
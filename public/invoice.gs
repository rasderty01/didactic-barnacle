var spreadsheetId = "1sL4uBvhPTxDYpA4feBrkLp71Y86jC9nY5JqBw28HBqM";
var sheetNames = ["Visit", "Fiance", "Spouse", "Married", "Unmarried"];
var invoicesheet = "Payments";

function doPost(e) {
  try {
    var email = e.parameter.emailverification;

    if (email) {
      var invoiceUrl = getInvoiceUrl(email);
      return ContentService.createTextOutput(invoiceUrl).setMimeType(
        ContentService.MimeType.TEXT
      );
    } else {
      throw new Error("Email parameter is missing.");
    }
  } catch (error) {
    return ContentService.createTextOutput(
      "Error: " + error.message
    ).setMimeType(ContentService.MimeType.TEXT);
  }
}

function getInvoiceUrl(email) {
  var sheet, dataRange, values, row;
  var lastName, firstName, address, country, postalCode;

  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var randomInvoiceNumber = "INV-" + Math.floor(Math.random() * 9000 + 1000);
  var invoiceTemplateId = "1mpt9_b9xHGzdcF57xz0zJ3HLAKEoqzrToH4qay3TutQ";

  for (var i = 0; i < sheetNames.length; i++) {
    sheet = spreadsheet.getSheetByName(sheetNames[i]);
    dataRange = sheet.getDataRange();
    values = dataRange.getValues();

    for (var j = 1; j < values.length; j++) {
      row = values[j];
      if (row[3] === email) {
        lastName = row[1];
        firstName = row[2];
        address = row[5];
        country = row[6]; // Make sure to update the column index for the country field
        postalCode = row[7]; // Make sure to update the column index for the postal code field
        break;
      }
    }

    if (lastName) {
      break;
    }
  }
  if (lastName) {
    var currency = country === "UK" ? "GBP" : "PHP";

    var invoiceDate = new Date();
    var dueDate = new Date(invoiceDate);
    dueDate.setDate(invoiceDate.getDate() + 3);

    var invoiceData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      country: country,
      postalCode: postalCode,
      invoiceNumber: randomInvoiceNumber,
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      unitPrice: 1500.0,
      currency: currency,
      amount: 1500.0,
    };

    var pdfBlob = createInvoicePdf(invoiceTemplateId, invoiceData);
    var folderId = "1YWV151ABte4c9pbJJcDaZhpPn9asrA2o";
    var folder = DriveApp.getFolderById(folderId);
    var file = folder.createFile(pdfBlob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var sheet33 = spreadsheet.getSheetByName(invoicesheet);
    sheet33.appendRow([
      new Date(),
      lastName,
      firstName,
      email,
      randomInvoiceNumber,
      file.getUrl(),
    ]);

    return file.getUrl();
  } else {
    throw new Error("Email not found in any sheet: " + email);
  }
}

function createInvoicePdf(templateId, invoiceData) {
  var template = DriveApp.getFileById(templateId);
  var tempDoc = template.makeCopy().getId();
  var doc = DocumentApp.openById(tempDoc);
  var body = doc.getBody();

  body.replaceText("{{First_Name}}", invoiceData.firstName);
  body.replaceText("{{Last_Name}}", invoiceData.lastName);
  body.replaceText("{{Insert_Address}}", invoiceData.address);
  body.replaceText("{{Insert_Country}}", invoiceData.country);
  body.replaceText("{{Insert_Pcode}}", invoiceData.postalCode);
  body.replaceText("{{invoice_in}}", invoiceData.invoiceNumber);
  body.replaceText("{{duedate_in}}", formatDate(invoiceData.dueDate));
  body.replaceText("{{today_in}}", formatDate(invoiceData.invoiceDate));
  body.replaceText("{{unit_price}}", invoiceData.unitPrice.toFixed(2));
  body.replaceText("{{amount_in}}", invoiceData.amount.toFixed(2));
  body.replaceText("{{currency_}}", invoiceData.currency);
  body.replaceText("{{total_}}", invoiceData.amount.toFixed(2));
  doc.saveAndClose();

  var pdfBlob = DriveApp.getFileById(tempDoc).getAs("application/pdf");
  pdfBlob.setName("Invoice-" + invoiceData.invoiceNumber + ".pdf");

  DriveApp.getFileById(tempDoc).setTrashed(true);

  return pdfBlob;
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return month + "/" + day + "/" + year;
}

-----------------------




function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}


var spreadsheetId = "1aJnk-SiFXdgs4Czv9Jg2qi37fQhKks0373-v0hx7-_U";
var sheetNames = ["Visit", "Fiance", "Spouse", "Married", "Unmarried"];
var invoicesheet = "Payments";

var url = '1aJnk-SiFXdgs4Czv9Jg2qi37fQhKks0373-v0hx7-_U';
var sh = 'Payments';
var folderId = '1hFTz_wyjSKfjNLc6O7iJhJf8hTeM7am-';


console.log(doGet);

function doPost(e) {
  var email = e.parameter.emailverification;
  var responseText = processEmailVerification(email);
  return ContentService.createTextOutput(responseText);
}

function verifyEmail(email) {
  var sheet, dataRange, values, row;
  var lastName, firstName, address, country, postalCode;

  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var randomInvoiceNumber = "INV-" + Math.floor(Math.random() * 9000 + 1000);
  var invoiceTemplateId = "1mpt9_b9xHGzdcF57xz0zJ3HLAKEoqzrToH4qay3TutQ";

  for (var i = 0; i < sheetNames.length; i++) {
    sheet = spreadsheet.getSheetByName(sheetNames[i]);
    dataRange = sheet.getDataRange();
    values = dataRange.getValues();

    for (var j = 1; j < values.length; j++) {
      row = values[j];
      if (row[3] === email) {
        lastName = row[1];
        firstName = row[2];
        address = row[5];
        country = row[6]; // Make sure to update the column index for the country field
        postalCode = row[7]; // Make sure to update the column index for the postal code field
        break;
      }
    }

    if (lastName) {
      break;
    }
  }
  if (lastName) {
    var currency = country === "UK" ? "GBP" : "PHP";

    var invoiceDate = new Date();
    var dueDate = new Date(invoiceDate);
    dueDate.setDate(invoiceDate.getDate() + 3);

    var invoiceData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      country: country,
      postalCode: postalCode,
      invoiceNumber: randomInvoiceNumber,
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      unitPrice: 1500.0,
      currency: currency,
      amount: 1500.0,
    };

    var pdfBlob = createInvoicePdf(invoiceTemplateId, invoiceData);
    var folderId = "1Y7_xZgNCZsjXdIauI67gENueMFcCe8M0";
    var folder = DriveApp.getFolderById(folderId);
    var file = folder.createFile(pdfBlob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var sheet33 = spreadsheet.getSheetByName(invoicesheet);
    sheet33.appendRow([
      new Date(),
      lastName,
      firstName,
      email,
      randomInvoiceNumber,
      file.getUrl(),
    ]);

    return file.getUrl();
  } else {
    throw new Error("Email not found in any sheet: " + email);
  }
}

function createInvoicePdf(templateId, invoiceData) {
  var template = DriveApp.getFileById(templateId);
  var tempDoc = template.makeCopy().getId();
  var doc = DocumentApp.openById(tempDoc);
  var body = doc.getBody();

  body.replaceText("{{First_Name}}", invoiceData.firstName);
  body.replaceText("{{Last_Name}}", invoiceData.lastName);
  body.replaceText("{{Insert_Address}}", invoiceData.address);
  body.replaceText("{{Insert_Country}}", invoiceData.country);
  body.replaceText("{{Insert_Pcode}}", invoiceData.postalCode);
  body.replaceText("{{invoice_in}}", invoiceData.invoiceNumber);
  body.replaceText("{{duedate_in}}", formatDate(invoiceData.dueDate));
  body.replaceText("{{today_in}}", formatDate(invoiceData.invoiceDate));
  body.replaceText("{{unit_price}}", invoiceData.unitPrice.toFixed(2));
  body.replaceText("{{amount_in}}", invoiceData.amount.toFixed(2));
  body.replaceText("{{currency_}}", invoiceData.currency);
  body.replaceText("{{total_}}", invoiceData.amount.toFixed(2));
  doc.saveAndClose();

  var pdfBlob = DriveApp.getFileById(tempDoc).getAs("application/pdf");
  pdfBlob.setName("Invoice-" + invoiceData.invoiceNumber + ".pdf");

  DriveApp.getFileById(tempDoc).setTrashed(true);

  return pdfBlob;
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return month + "/" + day + "/" + year;
}


//

function processForm(fileData) {
    var folder = DriveApp.getFolderById(folderId);
    var contentType = fileData.data.substring(5, fileData.data.indexOf(';'));
    var bytes = Utilities.base64Decode(fileData.data.split(',')[1]);
    var blob = Utilities.newBlob(bytes, contentType, fileData.name);
    var file = folder.createFile(blob);

    var ss = SpreadsheetApp.openById(url);
    var ws = ss.getSheetByName(sh);

    var data = ws.getRange(1, 1, ws.getLastRow(), ws.getLastColumn()).getValues();
    var emailColumn = 3; // Change this to the index of the email column in your sheet (0-based)
    var fileUrlColumn = 6; // Change this to the index of the file URL column in your sheet (0-based)

    for (var i = 0; i < data.length; i++) {
        if (data[i][emailColumn] === fileData.email) {
            ws.getRange(i + 1, fileUrlColumn + 1).setValue(file.getUrl());
            break;
        }
    }
}
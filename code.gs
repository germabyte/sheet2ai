/**
 * Exports Google Sheet data to a structured TXT format for LLMs.
 * Allows excluding specific sheets from export.
 *
 * Features:
 * 1. Reads data from a specified Google Sheet.
 * 2. Identifies non-empty cells in all sheets (except excluded ones).
 * 3. Extracts cell information: Sheet Name, Address, Value, Formula (or "data"), Data Type.
 * 4. Structures data as TXT.
 * 5. Saves TXT to a specified Google Drive folder.
 * 6. Allows users to exclude sheets by name in configuration.
 *
 * User Configuration:
 * - Set `spreadsheetId` to the ID of your Google Sheet.
 * - Set `outputFolderId` to the ID of your Google Drive folder.
 * - Set `excludedSheetNames` to an array of sheet names to exclude (optional).
 *   Example: `const excludedSheetNames = ["Sheet3", "HiddenDataSheet"];`
 *   Leave it empty `[]` to export all sheets.
 */

// **User Configuration - MODIFY THESE VALUES**
const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Spreadsheet ID
const outputFolderId = 'YOUR_OUTPUT_FOLDER_ID_HERE';    // Replace with your Google Drive Output Folder ID
const excludedSheetNames = []; // Add sheet names to exclude here, e.g., ["Sheet3", "Summary"]

function exportSheetDataToTxt() {
  Logger.log("Starting TXT data export from Google Sheet..."); // Start Log
  if (!spreadsheetId || spreadsheetId === 'YOUR_SPREADSHEET_ID_HERE') {
    Logger.log("Error: Please configure the spreadsheetId in the script.");
    return;
  }
  if (!outputFolderId || outputFolderId === 'YOUR_OUTPUT_FOLDER_ID_HERE') {
    Logger.log("Error: Please configure the outputFolderId in the script.");
    return;
  }

  try {
    Logger.log("Accessing spreadsheet with ID: " + spreadsheetId); // Spreadsheet Access Log
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    Logger.log("Spreadsheet name: " + spreadsheet.getName()); // Spreadsheet Name Log
    const sheets = spreadsheet.getSheets();
    let txtOutput = `Spreadsheet ID: ${spreadsheetId}\n\n`; // Start TXT output

    Logger.log("Processing sheets (excluding: " + (excludedSheetNames.length > 0 ? excludedSheetNames.join(", ") : "None") + ")..."); // Sheet Processing Start Log
    sheets.forEach(sheet => {
      const sheetName = sheet.getName();
      if (excludedSheetNames.includes(sheetName)) {
        Logger.log("Excluding sheet: " + sheetName + " (as per configuration)."); // Excluded Sheet Log
        return; // Skip to the next sheet
      }

      Logger.log("Processing sheet: " + sheetName); // Sheet Name Log
      const sheetText = processSheet(sheet);
      if (sheetText) { // Only add sheet to TXT if it has data
        txtOutput += sheetText;
      } else {
        Logger.log("Sheet '" + sheetName + "' has no data to export."); // Log when sheet has no data
      }
    });

    if (txtOutput === `Spreadsheet ID: ${spreadsheetId}\n\n`) {
      Logger.log("No data found in any non-excluded sheets of the spreadsheet. Export aborted."); // Improved No Data Log
      return;
    }

    Logger.log("Saving TXT to Google Drive folder: " + outputFolderId); // Drive Save Start Log
    saveTextToDrive(txtOutput, spreadsheet.getName() + '_data.txt', outputFolderId);

    Logger.log("TXT data export complete. File saved to Google Drive folder: " + outputFolderId); // Success Log

  } catch (e) {
    Logger.log("Error during script execution: " + e);
    if (e.stack) {
      Logger.log("Stack trace: " + e.stack);
    }
  }
  Logger.log("Script execution finished."); // Script End Log
}

function processSheet(sheet) {
  const sheetName = sheet.getName();
  let sheetTextOutput = "";
  const sheetData = {
    sheetName: sheetName,
    cells: []
  };
  const dataRange = sheet.getDataRange(); // Efficiently get only the used range
  const values = dataRange.getValues();
  const formulas = dataRange.getFormulas();

  Logger.log("Extracting data from sheet: " + sheetName + "..."); // Data Extraction Log

  let cellCount = 0;
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      const value = values[i][j];
      if (value !== null && value !== undefined && value !== "") { // Check for non-empty cells

        const cell = dataRange.getCell(i + 1, j + 1); // 1-based indexing for getCell
        const cellAddress = cell.getA1Notation();
        const formula = formulas[i][j];
        const cellInfo = {
          cellAddress: sheetName + '!' + cellAddress, // Include sheet name in address for clarity
          value: value,
          dataType: getDataType(value)
        };

        if (formula) {
          cellInfo.formula = formula;
        } else {
          cellInfo.formula = "data";
        }
        sheetData.cells.push(cellInfo);
        cellCount++;
      }
    }
  }

  if (cellCount > 0) {
    sheetTextOutput += `Sheet: ${sheetName}\n`;
    sheetData.cells.forEach(cellInfo => {
      let formulaPart = "";
      if (cellInfo.formula === "data") {
        formulaPart = "Formula: data, ";
      } else {
        formulaPart = `Formula: ${cellInfo.formula}, `;
      }
      sheetTextOutput += `  Cell: ${cellInfo.cellAddress}, Value: ${cellInfo.value}, ${formulaPart}Data Type: ${cellInfo.dataType}\n`;
    });
  }


  Logger.log("Data extraction from sheet: " + sheetName + " complete. Found " + cellCount + " cells with data."); // Data Extraction Complete Log
  return sheetTextOutput;
}

function getDataType(value) {
  const type = typeof value;
  if (type === 'number') {
    if (isNaN(value)) {
      return 'NaN'; // Not a Number
    } else if (value % 1 === 0) {
      return 'integer';
    } else {
      return 'number'; // floating-point
    }
  } else if (type === 'boolean') {
    return 'boolean';
  } else if (value instanceof Date) {
    return 'date';
  } else {
    return 'text'; // Default to text for strings and other types
  }
}


function saveTextToDrive(textString, fileName, folderId) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    const file = folder.createFile(fileName, textString, MimeType.PLAIN_TEXT);
    Logger.log("TXT file created successfully: " + file.getName() + ", URL: " + file.getUrl()); // More informative success log
  } catch (e) {
    Logger.log("Error saving TXT file to Drive: " + e);
    if (e.stack) {
      Logger.log("Stack trace: " + e.stack);
    }
  }
}

// Run the main function when the script is executed.
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('LLM Export')
      .addItem('Export Sheet Data to TXT', 'exportSheetDataToTxt')
      .addToUi();
}

// Optional: Run the export function directly when you open the script editor for testing.
// exportSheetDataToTxt();

# sheet2ai:  Making Spreadsheet Data Accessible to Large Language Models

## 1. Introduction and Purpose

sheet2ai is a Google Apps Script that bridges the gap between complex Google Sheets data and Large Language Models (LLMs).  It transforms the intricate structure of a spreadsheet into a clear, text-based format that LLMs can easily understand.

**Purpose:**  The primary goal of sheet2ai is to enable users to interact with their spreadsheet data using natural language through an LLM.  It addresses the challenge of LLMs not being able to directly access and interpret the data within a Google Sheet.  By converting the spreadsheet's content, including cell values, formulas, and data types, into a structured text file, sheet2ai allows users to ask questions about their spreadsheets and receive informed answers from an LLM. For example, a user could ask the LLM, "What does the formula in cell B12 of the 'Sales' sheet do?" and the LLM, with the aid of the exported data, can provide a meaningful explanation.

**Value Proposition:** sheet2ai simplifies the process of extracting and understanding information from Google Sheets. It empowers users, regardless of their spreadsheet expertise, to leverage the power of LLMs to analyze and gain insights from their data.

## 2. Dependencies (Required Software)

This program runs entirely within the Google Apps Script environment and requires the following:

*   **Google Account:** A free Google account is needed to access Google Sheets and Google Drive. You can create one at [https://accounts.google.com/signup](https://accounts.google.com/signup).
*   **Google Sheets:**  This is the spreadsheet application where your data resides. It's part of Google Workspace and is accessible with a Google account.
*   **Google Drive:** This is Google's cloud storage service, where the exported text file will be saved.  It is also part of Google Workspace and accessible with a Google account.
*    **Google Apps Script:** The sheet2ai program is already a google apps script.
*   **Web Browser:** A modern web browser (like Google Chrome, Mozilla Firefox, or Microsoft Edge) is needed to access the Google Sheets and Google Apps Script interfaces.

No additional software installation is required on your computer.

## 3. Getting Started (Installation and Execution)

Since sheet2ai is a Google Apps Script, it's not "installed" in the traditional sense.  Instead, you copy the script into your Google Sheet's script editor.

1.  **Create a Google Sheet:** Open Google Sheets ([https://sheets.google.com](https://sheets.google.com)) and either create a new spreadsheet or open an existing one that you want to use with sheet2ai.

2.  **Open the Script Editor:**
    *   In your Google Sheet, go to "Tools" in the menu bar.
    *   Select "Script editor".  This will open a new window or tab containing the Google Apps Script editor.

3.  **Copy the Script:** Copy the entire sheet2ai code provided above.

4.  **Paste the Script:**  In the Google Apps Script editor, replace any existing code (likely a default `myFunction` function) with the copied sheet2ai code.

5.  **Save the Script:**  Click the "Save" icon (it looks like a floppy disk) in the script editor's toolbar.  You might be prompted to give your project a name; you can name it "sheet2ai" or something similar.

6. **Configuration:** Before running the script, you *must* configure it:
   *   **`spreadsheetId`:**  In the script, find the line that says `const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';`.  Replace `'YOUR_SPREADSHEET_ID_HERE'` with the actual ID of your Google Sheet.  The spreadsheet ID is the long string of characters in the URL of your Google Sheet, located between `/d/` and `/edit`.  For example, if your sheet's URL is `https://docs.google.com/spreadsheets/d/1abc123xyz456/edit#gid=0`, the spreadsheet ID is `1abc123xyz456`.
   *   **`outputFolderId`:** Find the line `const outputFolderId = 'YOUR_OUTPUT_FOLDER_ID_HERE';`.  Replace `'YOUR_OUTPUT_FOLDER_ID_HERE'` with the ID of the Google Drive folder where you want the exported text file to be saved.  To get the folder ID, open the folder in Google Drive. The folder ID is the string of characters at the end of the URL, after the last `/`.
   *   **`excludedSheetNames`:**  If there are any sheets in your spreadsheet that you *don't* want to export (e.g., sheets containing sensitive data or internal notes), list their names in the `excludedSheetNames` array.  For example: `const excludedSheetNames = ["Sheet3", "HiddenData"];`.  If you want to export all sheets, leave this array empty: `const excludedSheetNames = [];`.

7.  **Authorize the Script:** The first time you run the script, Google will ask you to authorize it to access your Google Sheet and Google Drive. Click the 'Run' button in the top toolbar (you might have to select 'exportSheetDataToTxt' function in the selection next to the button).
    * Click "Review Permissions".
    * Select your Google account.
    * Click "Allow" to grant the script the necessary permissions.

8.  **Run the Script:**
    *   Go back to your Google Sheet.
    *   Refresh the page (usually by pressing F5 or Ctrl+R / Cmd+R).
    *   A new menu item called "LLM Export" should appear in the menu bar.
    *   Click "LLM Export" and then select "Export Sheet Data to TXT".

9. **Find the Output:** After the script finishes running, a text file (named after your spreadsheet with `_data.txt` appended) will be created in the Google Drive folder you specified.  This text file contains the structured data from your spreadsheet.

## 4. Using the Program (User Guide)

After running the script (as described in "Getting Started"), sheet2ai automatically performs the following actions:

1.  **Reads Data:**  The script accesses the Google Sheet you specified.

2.  **Processes Sheets:**  It iterates through each sheet in your spreadsheet (except those you've excluded).

3.  **Extracts Cell Information:** For each non-empty cell, it extracts:
    *   **Sheet Name:** The name of the sheet the cell belongs to.
    *   **Cell Address:** The cell's location (e.g., "A1", "B5").
    *   **Value:** The content of the cell.
    *   **Formula:**  If the cell contains a formula, the formula itself is extracted.  If the cell contains a direct value (not a formula), it's labeled as "data".
    *   **Data Type:** The type of data in the cell (e.g., "text", "number", "date", "boolean").

4.  **Creates a Text File:** The script generates a text file (`.txt`) containing all the extracted information in a structured format.

5.  **Saves to Google Drive:** The text file is saved to the Google Drive folder you specified in the configuration.

**Interpreting the Output:**

The output text file is designed to be easily readable by both humans and LLMs. Here's how the data is structured:

```
Spreadsheet ID: [Your Spreadsheet ID]

Sheet: Sheet1
  Cell: Sheet1!A1, Value: Product Name, Formula: data, Data Type: text
  Cell: Sheet1!B1, Value: Price, Formula: data, Data Type: text
  Cell: Sheet1!A2, Value: Apple, Formula: data, Data Type: text
  Cell: Sheet1!B2, Value: 1.00, Formula: data, Data Type: number
  Cell: Sheet1!A3, Value: Orange, Formula: data, Data Type: text
  Cell: Sheet1!B3, Value: 0.75, Formula: data, Data Type: number

Sheet: Sheet2
  Cell: Sheet2!A1, Value: Total Sales, Formula: =SUM(Sheet1!B2:B3), Data Type: number
```

*   **Spreadsheet ID:** The unique identifier of your Google Sheet.
*   **Sheet:**  Indicates the start of a new sheet's data.
*   **Cell:**  Shows the sheet name and cell address (e.g., `Sheet1!A1`).
*   **Value:**  Displays the content of the cell.
*   **Formula:** Shows the formula in the cell, or "data" if it's a direct value.
*   **Data Type:** Indicates the type of data (text, number, date, boolean).

You can now use this text file as input for an LLM. You can copy and paste the content, or provide the file itself, depending on the LLM's capabilities.

## 5. Use Cases and Examples

Here are three practical scenarios demonstrating how sheet2ai can be used:

**Scenario 1: Understanding Formulas**

*   **Situation:** You have a complex spreadsheet with many formulas, and you're not sure what a specific formula does.
*   **Example:** You have a sheet named "Sales" with a formula in cell C10: `=SUMIFS(B2:B100, A2:A100, ">="&DATE(2023,1,1), A2:A100, "<="&DATE(2023,12,31))`.
*   **sheet2ai Use:** Run sheet2ai to export the spreadsheet data. The exported text file will show the formula for cell C10. You can then ask the LLM: "Explain the formula: `=SUMIFS(B2:B100, A2:A100, ">="&DATE(2023,1,1), A2:A100, "<="&DATE(2023,12,31))`".
*   **Expected LLM Output:** The LLM would likely explain that this formula calculates the sum of values in the range B2:B100, but only for rows where the corresponding value in the range A2:A100 is a date between January 1, 2023, and December 31, 2023.

**Scenario 2: Data Summarization**

*   **Situation:** You have a large dataset in a Google Sheet and want a quick summary of its contents.
*   **Example:** Your sheet "Customers" contains customer data, including names, locations, and purchase amounts.
*   **sheet2ai Use:** Export the data using sheet2ai. Provide the generated text file to the LLM and ask: "Summarize the customer data, focusing on the total purchase amount per location."
*   **Expected LLM Output:** The LLM could provide a summary like: "The total purchase amount for New York customers is $X, for London customers is $Y, and for Tokyo customers is $Z."

**Scenario 3: Data Validation**

*   **Situation:** You want to check if there are any inconsistencies or errors in your data.
*   **Example:** Your "Inventory" sheet has a "Quantity" column, and you want to make sure all quantities are positive numbers.
*   **sheet2ai Use:** Export the sheet data. Ask the LLM: "Identify any cells in the 'Quantity' column of the 'Inventory' sheet that contain negative values or non-numeric data."
*   **Expected LLM Output:** The LLM, based on the exported data, could identify any cells that violate the expected data constraints (e.g., "Cell Inventory!B5 contains a negative value: -5").

## 6. Disclaimer

This repository and its contents, including the sheet2ai script and this README file, are subject to updates at any time. These updates may introduce changes that render portions of this README file outdated. No guarantee is made that this README file will be updated to reflect changes in the repository.

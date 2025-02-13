# sheet2ai

## 1. Introduction and Purpose

sheet2ai is a Google Apps Script program designed to help users make their Google Sheets understandable by Large Language Models (LLMs), such as ChatGPT.  It solves the problem of directly uploading a Google Sheet to an LLM, which often leads to confusion or misinterpretation by the AI. This program converts the data from a Google Sheet into a specially formatted text file (.txt) that is easier for LLMs to process. This allows users to ask questions about their sheets, understand formulas, and analyze the data using an LLM.  The script runs entirely within the Google Apps Script editor associated with your Google Sheet.

The value of sheet2ai lies in bridging the gap between human-readable spreadsheets and LLM-interpretable data.  It eliminates the need for manual data conversion or tedious explanations to the LLM.

## 2. Dependencies (Required Software)

To use sheet2ai, the following are required:

*   **Google Account:**  You need a Google Account to access Google Sheets and Google Drive.  This is where your spreadsheet is located and where the output text file will be saved.  If you don't have a Google Account, you can create one for free.
*   **Google Sheet:** You need a Google Sheet containing the data you want to analyze.
*   **Google Drive:** sheet2ai saves the generated text file to a folder in your Google Drive.
*   **Web Browser:** You need a modern web browser (like Google Chrome, Mozilla Firefox, or Microsoft Edge) to access Google Sheets, Google Drive, and the Google Apps Script editor.
* **No additional software downloads or installations are required.**  The script runs entirely within the Google ecosystem.

## 3. Getting Started (Installation and Execution)

Since sheet2ai is a Google Apps Script, it doesn't require traditional "installation."  Instead, you'll copy the script code into the Google Apps Script editor associated with your Google Sheet.

1.  **Open Your Google Sheet:** Open the Google Sheet you want to analyze with sheet2ai.

2.  **Open the Script Editor:**
    *   In your Google Sheet, go to "Tools" > "Script editor".  This will open a new tab with the Google Apps Script editor.

3.  **Copy the Script Code:** Copy the entire code provided for sheet2ai (the code you provided in your request).

4.  **Paste the Code into the Script Editor:** In the Script editor, delete any existing code (usually a `myFunction()` example) and paste the copied sheet2ai code into the editor.

5.  **Configure the Script:**
    *   **Find the Configuration Section:** Look for the section in the code that starts with `// **User Configuration - MODIFY THESE VALUES**`.
    *   **`spreadsheetId`:**  Find the line `const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';`.
        *   Go back to your Google Sheet's browser tab.  Look at the address bar of your browser. You'll see a long string of characters in the URL after `/spreadsheets/d/` and before the next `/`.  This is your Spreadsheet ID.
        *   Copy *only* the Spreadsheet ID.
        *   Paste the Spreadsheet ID, replacing `'YOUR_SPREADSHEET_ID_HERE'` (keep the single quotes).  For example: `const spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';`
    *   **`outputFolderId`:** Find the line `const outputFolderId = 'YOUR_OUTPUT_FOLDER_ID_HERE';`.
        *   Open Google Drive in a new browser tab (`drive.google.com`).
        *   Create a new folder (or use an existing one) where you want to save the output text files.
        *   Open the folder you created (or chose).
        *   Look at the address bar of your browser.  You'll see a string of characters in the URL after `/folders/`.  This is your Folder ID.
        *   Copy *only* the Folder ID.
        *   Paste the Folder ID, replacing `'YOUR_OUTPUT_FOLDER_ID_HERE'` (keep the single quotes). For example: `const outputFolderId = '0B2x-j51iN3H4f2NHdXRzX0U1ZlU';`
    *   **`excludedSheetNames` (Optional):** Find the line `const excludedSheetNames = [];`.
        *   If there are any sheets in your Google Sheet that you *don't* want to include in the analysis (e.g., a sheet with private data), list their names inside the square brackets, separated by commas, and enclosed in double quotes.  For example: `const excludedSheetNames = ["Sheet3", "Summary"];`
        *   If you want to include *all* sheets, leave this line as it is: `const excludedSheetNames = [];`

6.  **Save the Script:**  Click the "Save" icon (it looks like a floppy disk) in the Script editor toolbar.  You might be prompted to give your project a name (e.g., "sheet2ai").

7.  **Run the Script:**
    *   Click the "Run" button (it looks like a play button) in the Script editor toolbar.
    *   The first time you run the script, Google will ask you to authorize it to access your Google Sheet and Google Drive.  Click "Review permissions" and follow the prompts to grant the necessary permissions. Choose "Advanced" and then click "Go to [your project name] (unsafe)" which is the project name you input when you saved the script. Finally click "Allow".
    *   The script will now run.  You can monitor its progress in the "Execution log" window at the bottom of the Script editor.

8.  **Find the Output:** Once the script finishes, go to the Google Drive folder you specified in the `outputFolderId`.  You should find a new text file (`.txt`) with the same name as your Google Sheet, followed by "_data".  This file contains the extracted data in the format that LLMs can understand.

## 4. Using the Program (User Guide)

Once you have run sheet2ai and generated the text file, you can use it with a Large Language Model.

1.  **Access an LLM:** Go to a platform that provides access to an LLM, such as ChatGPT (openai.com).

2.  **Upload or Paste the Text File:** Most LLMs allow you to upload files.  Upload the text file that sheet2ai created.  Alternatively, you can open the text file, copy its contents, and paste them directly into the LLM's input area.

3.  **Ask Questions:** Now you can start asking the LLM questions about your spreadsheet.  You can ask about:
    *   Specific cell values: "What is the value of cell Sheet1!B5?"
    *   Formulas: "Explain the formula in cell Sheet2!C10."
    *   Relationships between cells: "How does the value in cell Sheet1!A1 affect the value in Sheet1!B2?"
    *   Overall data analysis: "What is the total of all values in column C of Sheet1?"

4. **Interpreting the output:**
   * The LLM will now be able to use the provided text file to understand the structure and content of the Google Sheet. The output file follows a structure where each line has the following format:
     ```
      Sheet: [Sheet Name]
        Cell: [Sheet Name]![Cell Address], Value: [Cell Value], Formula: [Cell Formula or "data"], Data Type: [Data Type]
     ```
     For instance, a line might appear as:
        `Cell: Sheet1!A1, Value: 10, Formula: data, Data Type: integer`
     Or, if the cell has a formula:
        `Cell: Sheet1!B2, Value: 20, Formula: =A1*2, Data Type: integer`
     The output will follow the same format for each non-empty cell in the non-excluded sheets.

## 5. Use Cases and Examples

Here are a few examples of how you can use sheet2ai with an LLM:

**Scenario 1: Understanding a Complex Formula**

*   **Situation:** You have a complex formula in a cell (e.g., `Sheet1!D5`) that you don't fully understand.
*   **Example:** You upload the text file to the LLM and ask: "Explain the formula in cell Sheet1!D5 in simple terms."
*   **Expected Output:** The LLM should provide a clear, step-by-step explanation of what the formula does and how it calculates the result.

**Scenario 2: Analyzing Sales Data**

*   **Situation:** You have a Google Sheet containing sales data for different products across various regions.
*   **Example:** You upload the text file and ask: "What is the total sales for Product A in the North region?" (Assuming your sheet has columns for Product and Region).
*   **Expected Output:** The LLM should be able to locate the relevant data and calculate the total sales based on your query.

**Scenario 3: Identifying Dependencies**

*   **Situation:** You want to know which cells are affected if you change the value of a particular cell.
*   **Example:** You upload the file and ask: "If I change the value in cell Sheet2!A3, which other cells will be affected?"
*   **Expected Output:** The LLM, by examining the formulas, can identify cells that directly or indirectly depend on Sheet2!A3 and might change their values as a result.

## 6. Disclaimer

This repository, sheet2ai, is subject to updates at any time.  These updates may render portions of this README file outdated.  No guarantee is made that this README file will be updated to reflect changes in the repository. The code is provided "as-is" and without any warranty, express or implied. There is no guarantee that the code will work as expected or at all. Use at your own risk.

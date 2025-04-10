# 📄 README for `sheets2ai`

---

## 1. 📌 Introduction and Purpose

### Introduction  
`sheets2ai` is a Google Apps Script utility that **converts structured data from Google Sheets into a clean, readable TXT format** optimized for Large Language Models (LLMs). The tool processes every non-empty cell in the selected spreadsheet and saves the information into a text file on Google Drive.

### Purpose & Problem Statement  
While LLMs can understand natural language, they often struggle to interpret complex, formula-laden spreadsheet data. `sheets2ai` solves this by exporting spreadsheet data — including formulas, values, and cell types — into a simple textual format that is both human- and machine-readable.

### Value Proposition  
- 🔍 **Simplifies spreadsheet structures** for better LLM interpretation.  
- 📂 **Organizes data consistently** across multiple sheets.  
- 📄 **Includes cell formulas and data types** for context.  
- 🛠️ **User-configurable**, allowing exclusion of irrelevant sheets.  
- 📤 **Saves directly to Google Drive**, ready for LLM processing.

---

## 2. 🔧 Dependencies (Required Software/Libraries)

This script runs entirely in the **Google Apps Script environment**, requiring no external installations.

### ✅ Required Platform:
- **Google Apps Script**  
  Built-in scripting platform for automating tasks in Google Workspace.  
  **Why Needed?** Used to read Google Sheets, process cell data, and save TXT files in Google Drive.  

### ✅ Required Services (automatically available in Google Apps Script):
- `SpreadsheetApp`: Accesses and reads spreadsheet data.  
- `DriveApp`: Writes TXT files to Google Drive.  
- `Logger`: Logs execution progress and errors.

> 💡 **No downloads or installations** are required beyond access to a Google account and Google Sheets.

---

## 3. 🚀 Getting Started (Installation & Execution)

### Step 1: Open Google Apps Script
1. Open the **Google Sheet** you want to export.
2. Click on **Extensions > Apps Script**.

### Step 2: Add the Script
1. Replace any existing code in the Apps Script editor with the full script provided in this repository.
2. Click **File > Save** and give your project a name.

### Step 3: Modify User Configuration
At the top of the script, locate and modify these lines:
```javascript
const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with actual Sheet ID
const outputFolderId = 'YOUR_OUTPUT_FOLDER_ID_HERE'; // Replace with Drive folder ID
const excludedSheetNames = []; // Optional: Add sheet names to exclude
```

- **How to find `spreadsheetId`:**
  - It's the string in your spreadsheet URL between `/d/` and `/edit`.
  - Example: `https://docs.google.com/spreadsheets/d/123ABC456DEF789GHI/edit` → ID = `123ABC456DEF789GHI`

- **How to find `outputFolderId`:**
  - Open your target Google Drive folder, and copy the string after `/folders/` in the URL.

### Step 4: Run the Script
1. In the Apps Script editor, click the function dropdown (next to the debug icon).
2. Select `exportSheetDataToTxt`.
3. Click the ▶️ **Run** button.
4. Authorize the script when prompted.

---

## 4. 🧑‍🏫 User Guide (How to Effectively Use the Program)

### ✅ What the Script Does
- Loops through all sheets (excluding those you specify).
- For every non-empty cell, extracts:
  - Sheet name
  - Cell address (e.g., `Sheet1!A2`)
  - Cell value
  - Formula (if any)
  - Data type (`text`, `number`, `integer`, `boolean`, `date`, `NaN`)

### ⚙️ Configuration Options
- **Excluded Sheets:** Modify `excludedSheetNames` to ignore certain sheets:
```javascript
const excludedSheetNames = ["Instructions", "Calculations"];
```

### 📁 Output Format
- A `.txt` file saved to your Google Drive folder, containing:
```
Sheet: Sheet1
  Cell: Sheet1!A1, Value: Sales, Formula: data, Data Type: text
  Cell: Sheet1!B2, Value: 1234.56, Formula: data, Data Type: number
```

---

## 5. 💡 Use Cases and Real-World Examples

### ✅ Use Case 1: Preparing Spreadsheet Data for LLMs
**Scenario:** You want to feed tabular business data into GPT-4 for analysis.  
**How It Helps:** `sheets2ai` exports structured data with context (formulas, types), making it LLM-friendly.  
**Example Output:**  
```
Cell: Sheet1!C3, Value: =SUM(A1:A2), Formula: =SUM(A1:A2), Data Type: number
```

---

### ✅ Use Case 2: Extracting Audit-Ready Documentation from Sheets
**Scenario:** You need to archive your financial model logic for an audit.  
**How It Helps:** Formulas and values are exported clearly.  
**Example Output:**  
```
Cell: Sheet2!E10, Value: 2025-01-01, Formula: data, Data Type: date
```

---

### ✅ Use Case 3: Training AI Models on Spreadsheet Patterns
**Scenario:** You’re building a model that learns from spreadsheet structures.  
**How It Helps:** Clean and consistent output of cell-level info enables easy data ingestion.  
**Example Output:**  
```
Cell: Data!F5, Value: TRUE, Formula: data, Data Type: boolean
```

---

## 6. ⚠️ Disclaimer & Important Notices

- This script and its functionality may change at any time without notice.  
- Such changes may render parts of this README obsolete.  
- The provided code is delivered **"as-is"** without any guarantees, warranties, or assurances of functionality, reliability, or compatibility.  
- No commitment is made to maintain or update this code or its documentation.

import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "results.xlsx") => {
  // Create a new workbook and a worksheet
  const workbook = XLSX.utils.book_new();
  const worksheetData = [
    ["Name", "Email", "Phone", "Topic", "Difficulty", "Score", "Penalty Points", "Final Score"],
    ...data
  ];

  // Append the worksheet data
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  // Generate and download the Excel file
  XLSX.writeFile(workbook, fileName);
};

import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "results.xlsx") => {
  const workbook = XLSX.utils.book_new();
  const worksheetData = [
    ["Name", "Email", "Phone", "Topic", "Difficulty", "Score", "Penalty Points", "Final Score"],
    ...data
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
  XLSX.writeFile(workbook, fileName);
};

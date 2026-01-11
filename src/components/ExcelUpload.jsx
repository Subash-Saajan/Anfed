import * as XLSX from "xlsx";

export default function ExcelUpload({ onDataParsed }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binary = evt.target.result;
      const workbook = XLSX.read(binary, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      onDataParsed(data);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <input
      type="file"
      accept=".xlsx,.xls"
      onChange={handleFile}
    />
  );
}

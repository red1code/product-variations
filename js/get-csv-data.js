export default function getCsvData(csvString) {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',');
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',');
    let fieldIndex = 0;
    for (let j = 0; j < headers.length; j++) {
      let field = currentLine[fieldIndex];
      if (field && field.startsWith('"')) {
        // Concatenate fields until we find a closing quote
        do {
          field += `,${currentLine[++fieldIndex]}`;
        } while (
          fieldIndex < currentLine.length &&
          !currentLine[fieldIndex].endsWith('"')
        );
      }
      obj[headers[j]] = field;
      fieldIndex++;
    }
    result.push(obj);
  }
  return result;
}

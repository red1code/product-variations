export default function generateCsv(csvRows) {
  try {
    const csvData = csvRows.map((row) => row.join(',')).join('\n');
    // Create a Blob object with the CSV MIME type
    const blob = new Blob([csvData], { type: 'text/csv' });
    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-products-variations.csv';
    link.click();
    // Clean up the URL object
    URL.revokeObjectURL(url);
  }
  catch (error) {
    alert(error)
  }
}

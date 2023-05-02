const csvFileInput = document.getElementById('csv-file-input');


let variationsRowsContainer = [
  [
    'ID', 'Type', 'SKU', 'Name', 'Published', 'Is featured?', 'Visibility in catalog', 'Short description',
    'Description', 'Date sale price starts', 'Date sale price ends', 'Tax status', 'Tax class', 'In stock?',
    'Stock', 'Low stock amount', 'Backorders allowed?', 'Sold individually?', 'Weight (kg)', 'Length (cm)',
    'Width (cm)', 'Height (cm)', 'Allow customer reviews?', 'Purchase note', 'Sale price', 'Regular price',
    'Categories', 'Tags', 'Shipping class', 'Images', 'Download limit', 'Download expiry days', 'Parent',
    'Grouped products', 'Upsells', 'Cross-sells', 'External URL', 'Button text', 'Position',
    'Attribute 1 name', 'Attribute 1 value(s)', 'Attribute 1 visible', 'Attribute 1 global',
    'Attribute 2 name', 'Attribute 2 value(s)', 'Attribute 2 visible', 'Attribute 2 global',
    'Attribute 3 name', 'Attribute 3 value(s)', 'Attribute 3 visible', 'Attribute 3 global',
    'Attribute 4 name', 'Attribute 4 value(s)', 'Attribute 4 visible', 'Attribute 4 global',
    'Attribute 5 name', 'Attribute 5 value(s)', 'Attribute 5 visible', 'Attribute 5 global'
  ]
];

// variationsRowsContainer.map(item => {
//   let indx = item.indexOf('Position');
//   console.warn('position index: ' + indx)
// })


csvFileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const fileData = event.target.result;
    const csvData = readCsvData(fileData);
    for (let i = 0; i < csvData.length - 1; i++) {
      const attrs = getAttributesFromRow(csvData[i]);
      const productVariations = generateVariations(attrs);
      const csvRows = variationsToRows(productVariations, attrs, csvData[i]);
      csvRows.map(row => {
        variationsRowsContainer.push(row);
      })
    }
    let position = 1;
    variationsRowsContainer.map(row => {
      if (variationsRowsContainer.indexOf(row) > 0) {
        row[38] = position;
        position++;
      }
    })
  };
  reader.readAsText(file);
});


function readCsvData(csvString) {
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
        } while (fieldIndex < currentLine.length && !currentLine[fieldIndex].endsWith('"'));
      }
      obj[headers[j]] = field;
      fieldIndex++;
    }
    result.push(obj);
  }
  return result;
}


function getAttributesFromRow(row) {
  const attributes = [];
  for (let i = 1; i < 10; i++) {
    const attrName = `AttributeName${i}`;
    const attrVals = `AttributeValues${i}`
    if (row[attrName]) {
      const newAttribute = {
        attributeName: row[attrName],
        attributeValues: stringToArray(row[attrVals])
      };
      attributes.push(newAttribute);
    }
    else {
      break;
    }
  }
  return attributes;
}


function generateVariations(attributes) {
  const keys = attributes.map(attr => attr.attributeName);
  const values = attributes.map(attr => attr.attributeValues);
  const cartesianProduct = (...arrays) =>
    arrays.reduce((acc, arr) =>
      acc.flatMap(x => arr.map(y => [...x, y])),
      [[]]
    );
  const variations = cartesianProduct(...values).map((productVariation) =>
    keys.reduce(
      (acc, key, i) => ({
        ...acc,
        [key]: productVariation[i]
      }),
      {}
    )
  );
  return variations;
}


function variationsToRows(variations, attributes, parentData) {
  let variationsRows = [];
  let i = 1;
  variations.map(variation => {
    let row = [
      `${parentData['SKU']}-${i}`, 'variation', `${parentData['SKU']}-${i}`, `${parentData['Name']}`,
      '1', '0', 'visible', `${parentData['Short description']}`, `${parentData['Description']}`, '', '',
      'taxable', 'parent', '1', '', '', '0', '0', '', '', '', '', '0', '', '', `${parentData['Price']}`,
      '', '', '', `${parentData['ImageLink']}`, '', '', `id:${parentData['SKU']}`, '', '', '', '', '', ''
    ];
    for (const [key, value] of Object.entries(variation)) {
      row = row.concat([key, value, '', '1']);
    }
    variationsRows.push(row);
    i++;
  });
  variationsRows.unshift(generateParentRow(attributes, parentData));
  return variationsRows;
}


function generateParentRow(attributes, rowData) {
  let parentRow = [
    `${rowData['SKU']}`, 'variable', `${rowData['SKU']}`, `${rowData['Name']}`, '1', '0', 'visible',
    `${rowData['Short description']}`, `${rowData['Description']}`, '', '', 'taxable', '', '1', '', '',
    '0', '0', '', '', '', '', '1', '', '', '', `${rowData['Categories']}`, '', '', `${rowData['ImageLink']}`,
    '', '', '', '', '', '', '', '', ''
  ];
  const newCols = attributes.map(attr => [
    attr.attributeName,
    `"${arrayToString(attr.attributeValues)}"`,
    '1',
    '1'
  ]);
  return parentRow.concat(newCols).flat();
}


function generateCsv(csvRows) {
  const csvData = csvRows.map(row => row.join(',')).join('\n');
  // Create a Blob object with the CSV MIME type
  const blob = new Blob([csvData], { type: 'text/csv' });
  // Create a download link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'products-variations.csv';
  link.click();
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

function downloadVariations() {
  generateCsv(variationsRowsContainer);
}


/*
helper functions
*/


function stringToArray(str) {
  return str?.split('-').map(val => val.trim());
}


function arrayToString(arr) {
  let str = '';
  arr.map(item => {
    if (arr.indexOf(item) === 0) {
      str = item;
      return;
    }
    str += ', ' + item;
  });
  return str;
}

import { stringToArray, arrayToString, getImgLink, Btn } from './js/utils.js';
import { variationsHeader } from './js/variations-header.js';
import generateCsv from './js/generate-csv-file.js';
import getCsvData from './js/get-csv-data.js';
import showAlertMsg, { ALERT_TYPE } from './js/alert-msg.js';

const csvFileInput = document.getElementById('csv-file-input');
const form = document.getElementById('form');

const downloadBtn = Btn('downloadBtn');
downloadBtn.disable();

let ID = 1;
const variationsRowsContainer = [];
variationsRowsContainer.push(variationsHeader);

form.addEventListener('submit', () => {
  generateCsv(variationsRowsContainer)
});

csvFileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const fileData = event.target.result;
    const csvData = getCsvData(fileData);
    for (let i = 0; i < csvData.length; i++) {
      const attrs = getAttributesFromRow(csvData[i]);
      const productVariations = generateVariations(attrs);
      const csvRows = variationsToRows(productVariations, attrs, csvData[i]);
      csvRows.map((row) => {
        variationsRowsContainer.push(row);
      });
    }
    downloadBtn.enable();
    showAlertMsg(
      'The variations have been generated successfully. Click on "Download Variations" button to download the CSV file',
      ALERT_TYPE.SUCCESS
    )
  };
  reader.readAsText(file);
});

function getAttributesFromRow(row) {
  const attributes = [];
  for (let i = 1; i < 10; i++) {
    const attrName = `AttributeName${i}`;
    const attrVals = `AttributeValues${i}`;
    if (row[attrName]) {
      const newAttribute = {
        attributeName: row[attrName],
        attributeValues: stringToArray(row[attrVals]),
      };
      attributes.push(newAttribute);
    } else {
      break;
    }
  }
  return attributes;
}

function generateVariations(attributes) {
  const keys = attributes.map((attr) => attr.attributeName);
  const values = attributes.map((attr) => attr.attributeValues);
  const cartesianProduct = (...arrays) =>
    arrays.reduce(
      (acc, arr) => acc.flatMap((x) => arr.map((y) => [...x, y])),
      [[]]
    );
  const variations = cartesianProduct(...values).map((productVariation) =>
    keys.reduce(
      (acc, key, i) => ({
        ...acc,
        [key]: productVariation[i],
      }),
      {}
    )
  );
  return variations;
}

function variationsToRows(variations, attributes, parentData) {
  let variationsRows = [];
  let i = 1;
  variations.map((variation) => {
    let row = [
      '',
      'variation',
      `${parentData['SKU']}-${i}`,
      `${parentData['Name']}`,
      '1',
      '0',
      'visible',
      `${parentData['Short description']}`,
      `${parentData['Description']}`,
      '',
      '',
      'taxable',
      'parent',
      '1',
      '',
      '',
      '0',
      '0',
      '',
      '',
      '',
      '',
      '0',
      '',
      '',
      `${parentData['Price']}`,
      '',
      '',
      '',
      getImgLink(parentData['ImageLink'], variation.Color),
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ];
    for (const [key, value] of Object.entries(variation)) {
      row = row.concat([key, value, '', '1']);
    }
    variationsRows.push(row);
    i++;
  });
  variationsRows.unshift(generateParentRow(attributes, parentData));
  variationsRows.map((row) => {
    row[0] = ID;
    row[38] = ID;
    row[16] = '1';
    ID++;
    if (variationsRows.indexOf(row) > 0) {
      row[32] = variationsRows[0][2];
    }
  });
  return variationsRows;
}

function generateParentRow(attributes, rowData) {
  let parentRow = [
    `${rowData['SKU']}`,
    'variable',
    `${rowData['SKU']}`,
    `${rowData['Name']}`,
    '1',
    '0',
    'visible',
    `${rowData['Short description']}`,
    `${rowData['Description']}`,
    '',
    '',
    'taxable',
    '',
    '1',
    '',
    '',
    '0',
    '0',
    '',
    '',
    '',
    '',
    '1',
    '',
    '',
    '',
    `${rowData['Categories']}`,
    '',
    '',
    `${rowData['ImageLink']}`,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  const newCols = attributes.map((attr) => [
    attr.attributeName,
    `"${arrayToString(attr.attributeValues)}"`,
    '1',
    '1',
  ]);
  return parentRow.concat(newCols).flat();
}

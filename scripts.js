const form = document.querySelector('form');
const productName = document.getElementById('product-name');
const tableTitle = document.getElementById('table-title');
const table = document.getElementById('table');


productName.addEventListener('keyup', evt => {
  tableTitle.textContent = `${productName.value} Attributes`;
});


const App = (() => {
  let _Attributes = [];
  const getAttributes = () => _Attributes;
  const saveNewAttribute = (attrInputName, attrInputValues) => {
    const newAttribute = {
      attributeName: getInputValue(attrInputName),
      attributeValues: strToArray(getInputValue(attrInputValues))
    };
    _Attributes.push(newAttribute);
    renderTable();
    clearInput('attribute-name');
    clearInput('attribute-items');
  }
  return { getAttributes, saveNewAttribute }
})();


function renderTable() {
  table.innerHTML = `
    <tr>
      <th>Attributes</th>
      <th>Attribute Name</th>
      <th>Attribute Values</th>
    </tr>`;
  let i = 1;
  App.getAttributes().map(attr => {
    table.innerHTML += `
      <tr>
        <th>Attribute ${i}</th>
        <td>${attr.attributeName}</td>
        <td>${attr.attributeValues}</td>
      </tr>`;
    i++
  })
}


function saveNewAttribute() {
  App.saveNewAttribute('attributeName', 'attributeItems')
}


function getVariations() {
  const variations = generateVariations(App.getAttributes());
  console.warn(variations);
  generateCsv(variations);
}


function getInputValue(inputName) {
  return form.elements.namedItem(inputName).value;
}


function clearInput(inputID) {
  document.getElementById(inputID).value = '';
}


function strToArray(str) {
  return str.split(",").map(val => val.trim());
}


// Function to generate all possible variations from attributes
function generateVariations(attributes) {
  const keys = attributes.map((attr) => attr.attributeName);
  const values = attributes.map((attr) => attr.attributeValues);

  const cartesianProduct = (...arrays) =>
    arrays.reduce((acc, arr) =>
      acc.flatMap((x) =>
        arr.map((y) =>
          [...x, y])), [[]]);

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


function generateCsv(variations) {
  // Define the data for the CSV file
  const data = variations.map(variation => {
    let row = ['', `variation`, ``, `${productName.value}`, '1', `0`, `visible`, '', '', '', '', 'taxable', 'parent', '1', '', '', '0', '0', '', '', '', '', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    for (const [key, value] of Object.entries(variation)) {
      row = row.concat([key, value, "", "1"]);
    }
    return row;
  });

  const csvHeader = ['ID', 'Type', 'SKU', 'Name', 'Published', 'Is featured?', 'Visibility in catalog', 'Short description', 'Description', 'Date sale price starts', 'Date sale price ends', 'Tax status', 'Tax class', 'In stock?', 'Stock', 'Low stock amount', 'Backorders allowed?', 'Sold individually?', 'Weight (kg)', 'Length (cm)', 'Width (cm)', 'Height (cm)', 'Allow customer reviews?', 'Purchase note', 'Sale price', 'Regular price', 'Categories', 'Tags', 'Shipping class', 'Images', 'Download limit', 'Download expiry days', 'Parent', 'Grouped products', 'Upsells', 'Cross-sells', 'External URL', 'Button text', 'Position', 'Attribute 1 name', 'Attribute 1 value(s)', 'Attribute 1 visible', 'Attribute 1 global'];

  data.unshift(csvHeader);

  // Convert the data to a CSV format
  const csvData = data.map(row => row.join(',')).join('\n');

  // Create a Blob object with the CSV MIME type
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Create a download link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = productName.value || 'products.csv';
  link.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
}

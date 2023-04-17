const form = document.querySelector('form');

const App = (() => {
  let _Attributes = [];
  const getAttributes = () => _Attributes;
  const saveNewAttribute = (attrInputName, attrInputValues) => {
    _Attributes.push({
      attributeName: getInputValue(attrInputName),
      attributeValues: getInputValue(attrInputValues)
    });
    console.warn(_Attributes);
    clearInput('attribute-name');
    clearInput('attribute-items');
  }
  return { getAttributes, saveNewAttribute }
})();


function getInputValue(inputName) {
  return form.elements.namedItem(inputName).value;
}

function saveNewAttribute() {
  App.saveNewAttribute('attributeName', 'attributeItems')
}

function clearInput(inputID) {
  document.getElementById(inputID).value = '';
}








// // Define the product variations and their attributes
// const variations = [
//   {
//     color: 'Red',
//     size: 'Small',
//     price: 10.00,
//     stock: 5
//   },
//   {
//     color: 'Red',
//     size: 'Medium',
//     price: 12.50,
//     stock: 10
//   },
//   {
//     color: 'Blue',
//     size: 'Small',
//     price: 11.00,
//     stock: 3
//   },
//   {
//     color: 'Blue',
//     size: 'Medium',
//     price: 14.00,
//     stock: 7
//   }
// ];

// generateCsv(variations);

// // Define a function to generate the CSV file
// function generateCsv(variations) {
//   // Define the headers for the CSV file
//   const headers = ['Type', 'SKU', 'Name', 'Published', 'Visibility in catalog', 'Short description', 'Description', 'Price', 'Regular price', 'Sale price', 'Tax status', 'Tax class', 'In stock?', 'Backorders allowed?', 'Sold individually?', 'Weight (kg)', 'Length (cm)', 'Width (cm)', 'Height (cm)', 'Allow customer reviews?', 'Purchase note', 'Menu order', 'Featured', 'Attribute 1 name', 'Attribute 1 value(s)', 'Attribute 1 visible', 'Attribute 1 global', 'Attribute 2 name', 'Attribute 2 value(s)', 'Attribute 2 visible', 'Attribute 2 global', 'Image(s)'];

//   // Define the data for the CSV file
//   const data = variations.map(variation => {
//     const attributes = [
//       { name: 'Color', value: variation.color, visible: '1', global: '1' },
//       { name: 'Size', value: variation.size, visible: '1', global: '1' }
//     ];

//     return [
//       'variation',
//       `${variation.color}-${variation.size}`,
//       `Product ${variation.color} ${variation.size}`,
//       '1',
//       'visible',
//       `This is the ${variation.color} ${variation.size} variation of the product.`,
//       `This is the ${variation.color} ${variation.size} variation of the product, with a price of ${variation.price} and a stock of ${variation.stock}.`,
//       variation.price.toFixed(2),
//       variation.price.toFixed(2),
//       '',
//       'taxable',
//       'standard',
//       '1',
//       '0',
//       '0',
//       '0.5',
//       '20',
//       '10',
//       '5',
//       '1',
//       '',
//       '0',
//       '0',
//       attributes[0].name,
//       attributes[0].value,
//       attributes[0].visible,
//       attributes[0].global,
//       attributes[1].name,
//       attributes[1].value,
//       attributes[1].visible,
//       attributes[1].global,
//       'https://example.com/product.jpg'
//     ];
//   });

//   // Prepend the headers to the data
//   data.unshift(headers);

//   // Convert the data to a CSV format
//   const csvData = data.map(row => row.join(',')).join('\n');

//   // Create a Blob object with the CSV MIME type
//   const blob = new Blob([csvData], { type: 'text/csv' });

//   // Create a download link and trigger the download
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'variations.csv';
//   // link.click();
// }
  // Clean
















// // Define the data for the CSV file
// const data = [
//   ['Product Name', 'Price', 'Quantity'],
//   ['Product 1', '10', '5'],
//   ['Product 2', '15', '10'],
//   ['Product 3', '20', '3']
// ];

// // Convert the data to a CSV format
// const csvData = data.map(row => row.join(',')).join('\n');

// // Create a Blob object with the CSV MIME type
// const blob = new Blob([csvData], { type: 'text/csv' });

// // Create a download link and trigger the download
// const url = URL.createObjectURL(blob);
// const link = document.createElement('a');
// link.href = url;
// link.download = 'products.csv';
// link.click();

// // Clean up the URL object
// URL.revokeObjectURL(url);



// const attrNameContainer = document.createElement('div');
// attrNameContainer.classList.add('attribute-name');
// const attrNameInput = document.createElement('input');
// attrNameInput.type = 'text';
// attrNameInput.name = 'attributeName' + i;
// attrNameInput.id = 'attribute-name' + i;
// attrNameInput.placeholder = 'Enter attribute name';
// attrNameContainer.appendChild(attrNameInput);

// const attrItemsContainer = document.createElement('div');
// attrItemsContainer.classList.add('attribute-items');
// const attrItemsInput = document.createElement('input');
// attrItemsInput.type = 'text';
// attrItemsInput.name = 'attributeItems' + i;
// attrItemsInput.id = 'attribute-items' + i;
// attrItemsInput.placeholder = 'Enter attribute items. separate them with comma (,)';
// attrItemsContainer.appendChild(attrItemsInput);

// attributesContainer.appendChild(attrNameContainer);
// attributesContainer.appendChild(attrItemsContainer);

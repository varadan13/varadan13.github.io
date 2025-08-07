const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('input.pdf');

pdf(dataBuffer).then(data => {
  fs.writeFileSync('output.txt', data.text);
});

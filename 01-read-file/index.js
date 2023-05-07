const fs = require('fs');

const readStream = fs.ReadStream(__dirname + '/text.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('error', (err) => {
  console.error(err);
});


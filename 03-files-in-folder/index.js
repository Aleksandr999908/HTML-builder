const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath)
  .then(files => {
    console.log('Files in secret-folder:');
    files.forEach(async file => {
      const filePath = path.join(folderPath, file);
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        const extension = path.extname(filePath).slice(1);
        const size = stat.size / 1024;
        console.log(`${file}-${extension}-${size.toFixed(3)}kb`);
      }
    });
  })
  .catch(err => console.error(err));
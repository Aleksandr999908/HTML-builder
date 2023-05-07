const fs = require('fs').promises;
const path = require('path');

const buildStyles = async () => {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const distDir = path.join(__dirname, 'project-dist');
    const distFile = path.join(distDir, 'bundle.css');

    const styleFiles = await fs.readdir(stylesDir);
    const cssFiles = styleFiles.filter((file) => path.extname(file) === '.css');

    if (!(await fs.stat(distDir)).isDirectory()) {
      await fs.mkdir(distDir);
    }

    await fs.writeFile(distFile, ''); // очистить файл перед записью

    for (const file of cssFiles) {
      const stylePath = path.join(stylesDir, file);
      const styleContent = await fs.readFile(stylePath);
      await fs.appendFile(distFile, styleContent);
    }

    console.log('Пакет создан успешно!');
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
};

buildStyles();

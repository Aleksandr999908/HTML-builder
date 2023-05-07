const fs = require('fs').promises;
const path = require('path');

const copyDir = async () => {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    // Создаем директорию files-copy, если ее нет
    await fs.mkdir(targetDir, { recursive: true });

    // Получаем список файлов в директории files
    const files = await fs.readdir(sourceDir);

    // Для каждого файла в списке проверяем, является он папкой или файлом
    for (const file of files) {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);

      const stats = await fs.stat(sourceFile);

      if (stats.isDirectory()) {
        // Если файл является папкой, то рекурсивно вызываем copyDir
        await copyDir(sourceFile, targetFile);
      } else {
        // Если файл - обычный файл, то копируем его
        await fs.copyFile(sourceFile, targetFile);
      }
    }

    console.log('Файлы успешно скопированы!');
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
};

copyDir();

const fs = require('fs');
const readline = require('readline');

console.log('Привет! Введите текст для записи в файл:');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input === 'exit') { // проверяем, не введено ли exit для завершения программы
    console.log('До свидания!');
    rl.close();
  } else {
    fs.appendFile('./02-write-file/text.txt', input + '\n', (err) => { // добавляем новый текст в конец файла
      if (err) throw err;
      console.log('Текст успешно добавлен в файл!');
      console.log('Введите следующий текст или введите "exit" для завершения:');
    });
  }
});

rl.on('SIGINT', () => { // обработка сигнала SIGINT (нажатия ctrl + c)
  console.log('До свидания!');
  rl.close();
});
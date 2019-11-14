/**
 * Задача:
 * написать программу(скрипт) который ищет в текстовом файле строки содержащие заданную подстроку(как команда fileGrep)
 * и выводит их на экран
 *
 * Пример запуска:
 * $ npx ts-node fileGrep.ts path/to/file.txt azaza
 * blabla azaza bla bla
 * azaza
 * 111azaza000...
 *
 * Требования:
 * Программа должна быть способна обрабатывать файлы любого размера(вплоть до нескольких гигабайт)
 * и выводить соответствующие строки по мере их нахождения
 */

import fs from "fs";
const readline = require("readline");
const stream = require("stream");

const file = process.argv[2];
const search = process.argv[3];

const helpMessage = `
Run parameters:
   npx ts-node grep.ts {path to file} {search message}
`;

const error = (message: String) => {
  console.error(message);
  console.info(helpMessage);
  process.exit();
};

try {
  if (!search) {
    error(`Search string is empty`);
  }
  if (!fs.existsSync(file)) {
    error(`File "${file}" doesn't exist`);
  }
  fs.accessSync(file, fs.constants.R_OK);

  function readLines(input: NodeJS.ReadableStream, search: string) {
    const output = new stream.PassThrough({ objectMode: true });
    const rl = readline.createInterface(input);
    rl.on("line", (line: string) => {
        if(line.includes(search)) {
            output.write(line);
        }
    });
    rl.on("close", () => {
      output.push(null);
    });
    return output;
  }
  const input = fs.createReadStream(file);
  (async () => {
    for await (const line of readLines(input, search)) {
      console.log(line);
    }
  })();

} catch (e) {
  error(e);
}

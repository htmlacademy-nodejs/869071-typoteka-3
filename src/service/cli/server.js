'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../constants.js`);

const DEFAULT_PORT = 9000;
const MAX_PORT = 64000;
const FILE_NAME = `mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
      <!Doctype html>
        <html lang="ru">
        <head>
          <title>With love from Node</title>
        </head>
        <body>${message}</body>
      </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    if (port > MAX_PORT) {
      console.error(chalk.red(`Порт больше чем максимально допустимый ${MAX_PORT}`));
      process.exit(1);
    }

    if (port <= 0) {
      console.error(chalk.red(`Отрицательные значения не допустимы`));
      process.exit(1);
    }

    http.createServer(onClientConnect)
        .listen(port)
        .on(`listening`, (err) => {
          if (err) {
            return console.error(chalk.red(`Ошибка при создании сервера`, err));
          }

          return console.info(chalk.green(`Ожидаю соединений на порту: ${port}`));
        });
  }
};

'use strict';

const chalk = require(`chalk`);
const {HttpCode} = require(`../constants.js`);
const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`../routes/main-routes`);

const DEFAULT_PORT = 9000;
const MAX_PORT = 64000;
const TEMPLATES_DIR = `../../express/templates`;
const PUBLIC_DIR = `../../express/public`;


module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const app = express();
    app.use(express.json());

    if (port > MAX_PORT) {
      console.error(chalk.red(`Порт больше чем максимально допустимый ${MAX_PORT}`));
      process.exit(1);
    }

    if (port <= 0) {
      console.error(chalk.red(`Отрицательные значения не допустимы`));
      process.exit(1);
    }

    // Подключаем движок шаблонизатор и папку с его шаблонами
    app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
    app.set(`view engine`, `pug`);

    // Подключим созданные маршруты
    app.use(`/`, mainRoutes);

    // Подключаем статичные маршруты
    app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

    // Ловим ошибки
    app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .render(`errors/400`));

    // Запуск сервера
    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }
      return console.info(chalk.green(`Ожидаю соединений на порту: ${port}`));
    });

  }
};

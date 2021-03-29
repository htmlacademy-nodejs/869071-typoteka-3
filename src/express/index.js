'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const articlesRouter = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

// Зафиксируем порт для сервера
const DEFAULT_PORT = 9000;

const app = express();

// Подключим созданные маршруты
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

// Запуск сервера
app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    return console.error(chalk.red(`Ошибка при создании сервера`, err));
  }
  return console.info(chalk.green(`Ожидаю соединений на порту: ${DEFAULT_PORT}`));
});

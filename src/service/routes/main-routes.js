'use strict';

const fs = require(`fs`).promises;
const {Router} = require(`express`);
const {HttpCode} = require(`../constants.js`);

const FILE_NAME = `mocks.json`;

const myRoutes = new Router();

// Определяем `GET` маршруты.
// основной путь маршрута /
myRoutes.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

module.exports = myRoutes;

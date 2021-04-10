'use strict';

const {Router} = require(`express`);
const myRoutes = new Router();

// Определяем `GET` маршруты.
// основной путь маршрута /my
myRoutes.get(`/`, (req, res) => res.render(`my`));
myRoutes.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = myRoutes;

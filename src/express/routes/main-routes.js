'use strict';

const {Router} = require(`express`);
const mainRoutes = new Router();

// Определяем `GET` маршруты.
// основной путь маршрута /
mainRoutes.get(`/`, (req, res) => res.render(`main`));
mainRoutes.get(`/main`, (req, res) => res.render(`main`));
mainRoutes.get(`/register`, (req, res) => res.render(`sing-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`sing-up`));
mainRoutes.get(`/search`, (req, res) => res.render(`search`));
mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRoutes;

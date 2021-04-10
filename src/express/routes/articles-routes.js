'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

// Определяем `GET` маршруты.
// основной путь маршрута /articles
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`new-post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`new-post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRouter;

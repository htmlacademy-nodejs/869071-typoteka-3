'use strict';

const {getRandomInt, shuffle} = require(`../utils`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS = 1000;
const BACK_DAYS_MAX = 91;
const FULL_TEXT_MIN_SENT = 5;

const FILE_PATH_TITLES = `./data/titles.txt`;
const FILE_PATH_CATEGORIES = `./data/categories.txt`;
const FILE_PATH_SENTENCES = `./data/sentences.txt`;

const CategoriesRestrict = {
  MIN: 1,
  MAX: 3
};

const getCategories = (num, categories) => {
  let categoryArray = categories.slice();

  let i = categoryArray.length;
  while (i > num) {
    categoryArray.splice(getRandomInt(0, categoryArray.length), 1);
    i = categoryArray.length;
  }

  return categoryArray;
};

const getPostDate = () => {
  let dateNow = new Date();
  let backDays = getRandomInt(0, BACK_DAYS_MAX);
  let datePost = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - backDays);
  let datePostString = `${datePost.getFullYear()}-${datePost.getMonth() + 1}-${datePost.getUTCDate()} ${dateNow.toLocaleTimeString([], {hour12: false, hour: `2-digit`, minute: `2-digit`, second: `2-digit`})}`;

  return datePostString;
};

const generatePosts = (count, titles, categories, sentences) => {
  return (
    Array(count).fill({}).map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      createDate: getPostDate(),
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences).slice(1, getRandomInt(FULL_TEXT_MIN_SENT, sentences.length)).join(` `),
      category: getCategories(getRandomInt(CategoriesRestrict.MIN, CategoriesRestrict.MAX), categories),
    }))
  );
};

const readFileFromDisk = async (path) => {
  try {
    const content = (await fs.readFile(path, `utf8`)).split(`\n`);
    content.pop();
    return content;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_OFFERS) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    if (countOffer <= 0) {
      console.error(chalk.red(`Отрицательные значения не допустимы`));
      process.exit(1);
    }

    // Пробуем прочитать данные и сформировать контент
    let content;
    try {
      const titles = await readFileFromDisk(FILE_PATH_TITLES);
      const categories = await readFileFromDisk(FILE_PATH_CATEGORIES);
      const sentences = await readFileFromDisk(FILE_PATH_SENTENCES);
      content = JSON.stringify(generatePosts(countOffer, titles, categories, sentences));
    } catch (err) {
      console.error(chalk.red(`Произошли ошибки при чтении шаблонных файлов: ${err} \nБудет произведен выход из программы `));
      process.exit(1);
    }

    // Пробуем записать данные, если они есть
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...Because: ${err}`));
      process.exit(1);
    }

    // Отработало корректно, успешный выход
    process.exit(0);
  }
};

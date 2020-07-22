'use strict';

const {getRandomInt, shuffle} = require(`../utils`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS = 1000;
const BACK_DAYS_MAX = 91;
const FULL_TEXT_MIN_SENT = 5;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const CategotiesRestrict = {
  MIN: 1,
  MAX: 3
};

const getCategories = (num) => {
  let categoryArray = CATEGORIES.slice();

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
  let datePostString = `${datePost.getFullYear()}-${datePost.getMonth() + 1}-${datePost.getUTCDate()} ${dateNow.toLocaleTimeString([], {hour12: false})}`;

  return datePostString;
};

const generatePosts = (count) => {
  return (
    Array(count).fill({}).map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      createDate: getPostDate(),
      announce: shuffle(SENTENCES).slice(1, 5).join(` `),
      fullText: shuffle(SENTENCES).slice(1, getRandomInt(FULL_TEXT_MIN_SENT, SENTENCES.length)).join(` `),
      category: getCategories(getRandomInt(CategotiesRestrict.MIN, CategotiesRestrict.MAX)),
    }))
  );
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_OFFERS) {
      console.log(`Не больше 1000 объявлений`);
      return;
    }

    const content = JSON.stringify(generatePosts(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created`);
    });
  }
};

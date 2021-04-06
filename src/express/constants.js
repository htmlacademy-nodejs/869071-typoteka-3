'use strict';

const PUBLIC_DIR = `public`;
const TEMPLATES_RID = `templates`;

const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  PUBLIC_DIR,
  TEMPLATES_RID,
  HttpCode
};

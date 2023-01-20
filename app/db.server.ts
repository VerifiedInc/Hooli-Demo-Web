import knex from 'knex';

import { config } from './config';

/**********************************
 * DATABASE CONNECTION (VIA KNEX) *
 **********************************/

export const knexConfig = {
  client: 'pg',
  connection: {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
  },
};

export const knexClient = knex(knexConfig);

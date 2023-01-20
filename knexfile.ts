// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
// this file is run by knex cli, e.g. in migrations

// load our database config
import { knexConfig } from './app/db.server';
import { logger } from './app/logger.server';

logger.info('in knexfile.ts');

module.exports = knexConfig;

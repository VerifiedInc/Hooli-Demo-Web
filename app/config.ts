import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

interface Config {
  COMMIT_SHA: string;
  ENV: string;
  NODE_ENV: string;
  logRocketId: string;
  logRocketProjectName: string;
  logLevel: string;
  newRelicEnabled: boolean;
  newRelicAppName: string;
  newRelicLicenseKey: string;
  newRelicLoggingLicenseKey: string;
  sessionSecret: string;
  unumAPIKey: string;
  coreServiceUrl: string;
  partnerUuid: string;
  sentryDSN: string;
}

export const config: Config = {
  COMMIT_SHA: execSync('git rev-parse --verify HEAD').toString().trim(),
  ENV: process.env.ENV || 'local',
  NODE_ENV: process.env.NODE_ENV || 'development',
  logRocketId: process.env.LOG_ROCKET_ID || '',
  logRocketProjectName: process.env.LOG_ROCKET_PROJECT_NAME || '',
  logLevel: process.env.LOG_LEVEL || 'debug',
  newRelicEnabled: process.env.NEW_RELIC_ENABLED === 'true',
  newRelicAppName: process.env.NEW_RELIC_APP_NAME || '',
  newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY || '',
  newRelicLoggingLicenseKey: process.env.NEW_RELIC_LOGGING_LICENSE_KEY || '',
  sessionSecret: process.env.SESSION_SECRET || '',
  unumAPIKey: process.env.UNUM_API_KEY || '',
  coreServiceUrl: process.env.CORE_SERVICE_URL || '',
  partnerUuid: process.env.PARTNER_UUID || '',
  sentryDSN: process.env.SENTRY_DSN || '',
};

import { config } from '~/config';
import { logger } from './logger.server';

/**
 * Represents a credential request
 */
export interface CredentialRequest {
  type: string;
  issuers: string[];
  required?: boolean;
}

/**
 * Interface to encapsulate the options for the hasMatchCredentials api call
 */

export interface HasMatchCredentialsOptions {
  email?: string;
  phone?: string;
  credentialRequests: CredentialRequest[];
}

/**
 * Function to make POST request to Unum ID's Core Service API /issueCredentials endpoint. The intent is to issue
 * an email credential for the Hooli application user.
 * Please note: This functionality is NOT and should NOT be called in the browser due to the sensitive nature
 * of the API key (unumAPIKey).
 * @param {string} email
 * @returns {Promise<'success' | 'error'>}
 */
export const issueCredentials = async (
  email: string | null
): Promise<'success' | 'error'> => {
  if (!email) return 'error'; // short circuit if no user email provided
  const headers = {
    Authorization: 'Bearer ' + config.unumAPIKey,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    email,
    credentials: [{ type: 'EmailCredential', data: { email } }],
  });
  // For the purpose of this demo we aren't saving the user credentials; however,
  // in a production environment it's advised to save the credentials returned from the call
  let credentials;
  try {
    credentials = await fetch(config.coreServiceUrl + '/credentials', {
      method: 'POST',
      headers,
      body,
    });
    credentials = await credentials.json();
  } catch (e) {
    logger.error(`issueCredentials for ${email} failed. Error: ${e}`);
    throw e;
  }

  if (credentials?.code) {
    logger.debug(
      `No credentials issued for ${email}. Error: ${credentials.message}`
    );
    return 'error';
  }
  logger.info(
    `Credentials successfully issued for ${email}. Total credentials issued: ${credentials.length}`
  );
  return 'success';
};

export const hasMatchCredentials = async (
  email: string | null
): Promise<boolean> => {
  if (!email) return false; // short circuit if no user email provided

  const headers = {
    Authorization: 'Bearer ' + config.unumAPIKey,
    'Content-Type': 'application/json',
  };

  const credentialRequest: CredentialRequest = {
    type: 'EmailCredential',
    issuers: [], // any issuer accepted
    required: true,
  };

  const options: HasMatchCredentialsOptions = {
    email,
    credentialRequests: [credentialRequest],
  };

  const body = JSON.stringify(options);

  try {
    const response = await fetch(
      config.coreServiceUrl + '/hasMatchingCredentials',
      {
        method: 'POST',
        headers,
        body,
      }
    );
    const result = await response.json();

    if (result?.code) {
      logger.debug(
        `No credentials issued for ${email}. Error: ${result.message}`
      );
      return false;
    }

    logger.info(`Has matching credentials? ${result.match}.`);

    return result.match;
  } catch (e) {
    logger.error(`issueCredentials for ${email} failed. Error: ${e}`);
    throw e;
  }
};

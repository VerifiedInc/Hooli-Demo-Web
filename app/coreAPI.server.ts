import { config } from '~/config';
import { logger } from './logger.server';
import { UserDto } from './models/user.server';

/**
 * Function to make POST request to Unum ID's Core Service API /issueCredentials endpoint.
 * Please note: This functionality is NOT and should NOT be called in the browser due to the sensitive nature
 * of the API key (unumAPIKey).
 * @param {UserDto} user
 * @returns {Promise<'success' | 'error'>}
 */
export const issueCredentials = async (
  user: UserDto | null
): Promise<'success' | 'error'> => {
  if (!user) return 'error'; // short circuit if no user info provided

  const { email } = user;

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
    logger.info(`Credentials issued for ${email}. Credentials: ${credentials}`);
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

  return 'success';
};

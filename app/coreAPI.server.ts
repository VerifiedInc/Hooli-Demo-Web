import { config } from '~/config';
import { logger } from './logger.server';
import { redirect, TypedResponse } from '@remix-run/node';

/**
 * Interface to encapsulate the credential object that is sent to the Core Service API /issueCredentials endpoint.
 */
interface Credential {
  type: string;
  data: Record<string, any>;
  expirationDate?: number; // unix timestamp, ms since epoch
}

/**
 * Interface to encapsulate the options DTO that is sent to the Core Service API /issueCredentials endpoint.
 */
interface CredentialOptions {
  email?: string;
  phone?: string;
  credentials: Credential[];
  partnerUuid?: string;
}

/**
 * Function to make POST request to Unum ID's Core Service API /issueCredentials endpoint. The intent is to issue
 * an email credential for the Hooli application user.
 * Please note: This functionality is NOT and should NOT be called in the browser due to the sensitive nature
 * of the API key (unumAPIKey).
 *
 * Documentation: https://docs.unumid.co/api-overview#issue-credentials
 * @param {string} email
 * @param {string} phone
 * @returns {Promise<'success' | 'error'>}
 */
export const issueCredentials = async (
  email: string | null,
  phone?: string | null
): Promise<'success' | 'error' | TypedResponse> => {
  if (!email) return 'error'; // short circuit if no user email provided
  const headers = {
    Authorization: 'Bearer ' + config.unumAPIKey,
    'Content-Type': 'application/json',
  };

  const credential: Credential = {
    type: 'EmailCredential',
    data: { email },
  };

  // For the purposes of the demo, these credentials are hard coded with dummy data.
  // The intent is to highlight the variety of credential data available for issuance.
  const dummyCredentials: Credential[] = [
    {
      type: 'FullNameCredential',
      data: [
        {
          type: 'FirstNameCredential',
          data: { firstName: 'Richard' },
        },
        {
          type: 'LastNameCredential',
          data: { lastName: 'Hendricks' },
        },
      ],
    },
    {
      type: 'SexCredential',
      data: { sex: 'Male' },
    },
    {
      type: 'BirthDateCredential',
      data: { birthDate: '603201600000' },
    },
    {
      type: 'SsnCredential',
      data: { ssn: '111223333' },
    },
    {
      type: 'NationalityCredential',
      data: { nationality: 'US' },
    },
    {
      type: 'GovernmentIdTypeCredential',
      data: { documentType: 'Drivers License' },
    },
    {
      type: 'GovernmentIdStateCredential',
      data: { state: 'US-CA' },
    },
    {
      type: 'GovernmentIdNumberCredential',
      data: { idNumber: '6383736743891101' },
    },
    {
      type: 'GovernmentIdIssuanceDateCredential',
      data: { issuanceDate: '1596888000000' },
    },
    {
      type: 'GovernmentIdExpirationDateCredential',
      data: { expirationDate: '1754654400000' },
    },
  ];

  const options: CredentialOptions = {
    email,
    credentials: [credential, ...dummyCredentials],
  };

  if (config.partnerUuid) {
    options.partnerUuid = config.partnerUuid;
  }

  if (phone) {
    // add US country code if not present
    const phoneWithCountryCode = phone?.startsWith('+1') ? phone : '+1' + phone;

    options.credentials.push({
      type: 'PhoneCredential',
      data: { phone: phoneWithCountryCode },
    });
    options.phone = phoneWithCountryCode;
  }

  const body = JSON.stringify(options);

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

  // We verify if the partner uuid is defined, so we use the url from the credentials with partner.
  if (credentials?.url) {
    return redirect(credentials.url);
  }

  logger.info(
    `Credentials successfully issued for ${email}. Total credentials issued: ${credentials.length}`
  );
  return 'success';
};

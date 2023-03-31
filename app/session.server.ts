import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { config } from './config';

/*************************
 * SESSION FUNCTIONALITY *
 *************************/

/**
 * Creates a session storage object
 * @see https://remix.run/docs/en/v1/utils/sessions#createcookiesessionstorage
 */
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: [config.sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  },
});

// key for getting/setting the user in the session
const USER_SESSION_KEY = 'user';

/**
 * Gets the session from the request
 * @param {Request} request
 * @returns {Promise<Session>} session
 */
export const getSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
};

/**
 * Gets the user from the session
 * @param {Request} request
 * @returns {Promise<Record<string, string | null>>} user
 */
export const getUser = async (request: Request) => {
  const session = await getSession(request);
  const user = session.get(USER_SESSION_KEY);

  return { ...user };
};

/**
 * Logs a user out
 * Clears the session cookie and redirects to the login page
 * @param {Request} request
 * @returns {Promise<Response>} response
 */
export const logout = async (request: Request) => {
  const session = await getSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};

/**
 * Requires an authenticated user w/ email to be in the session for a request
 * logs out if no user is found
 * @param {Request} request
 * @returns {Promise<string>} email
 */
export const requireUserEmail = async (request: Request): Promise<string> => {
  const user = await getUser(request);

  if (user?.email) return user.email;

  throw await logout(request);
};

/**
 * Creates a user session and sets the session cookie
 * @param {Request} request
 * @param {string} email
 */
export const createUserSession = async (
  request: Request,
  email: string,
  phone?: string,
  redirectTo = '/?prompt=true'
) => {
  const session = await getSession(request);
  const sessionValue = {
    email,
    phone,
  };
  session.set(USER_SESSION_KEY, sessionValue);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

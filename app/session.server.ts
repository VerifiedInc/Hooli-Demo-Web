import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { config } from './config';
import { getUserByUuid, UserDto } from './models/user.server';

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

// key for getting/setting the user uuid in the session
const USER_SESSION_KEY = 'userUuid';

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
 * Gets the user uuid from the session
 * @param {Request} request
 * @returns {Promise<string>} user uuid
 */
export const getUserUuid = async (request: Request): Promise<string> => {
  const session = await getSession(request);
  const userUuid = session.get(USER_SESSION_KEY);
  return userUuid;
};

/**
 * Gets the user from the session
 * @param {Request} request
 * @returns {Promise<UserDto | null>} user
 */
export const getUser = async (request: Request) => {
  const userUuid = await getUserUuid(request);

  if (!userUuid) {
    return null;
  }

  const user = await getUserByUuid(userUuid);

  return user;
};

/**
 * Logs a user out
 * Clears the session cookie and redirects to the login page
 * @param {Request} request
 * @returns {Promise<Response>} response
 */
export const logout = async (request: Request) => {
  console.log('logout');
  const session = await getSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};

/**
 * Requires a user uuid to be in the session for a request
 * @param {Request} request
 * @param {string} redirectTo - will be added as a query param to the login page on redirect
 */
export const requireUserUuid = async (
  request: Request,
  redirectTo = new URL(request.url).pathname
): Promise<string> => {
  const userUuid = await getUserUuid(request);

  if (!userUuid) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams.toString()}`);
  }

  return userUuid;
};

/**
 * Requires an authenticated user to be in the session for a request
 * logs out if no user is found
 * @param {Request} request
 * @returns {Promise<UserDto>} user
 */
export const requireUser = async (request: Request): Promise<UserDto> => {
  const userUuid = await requireUserUuid(request);

  const user = await getUserByUuid(userUuid);

  if (user) return user;

  throw await logout(request);
};

/**
 * Creates a user session and sets the session cookie
 * @param {Request} request
 * @param {string} userUuid
 */
export const createUserSession = async (
  request: Request,
  userUuid: string,
  redirectTo = '/?prompt=true'
) => {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userUuid);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

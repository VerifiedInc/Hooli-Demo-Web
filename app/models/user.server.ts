import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import invariant from 'tiny-invariant';

import { knexClient } from '~/db.server';

/****************************************
 * USER MODEL AND RELATED FUNCTIONALITY *
 ****************************************/

// options for creating a new user
export interface UserOptions {
  email: string;
  phone?: string;
  password: string;
}

// user data as stored in/retrieved from the database
export interface UserDb {
  uuid: string;
  createdAt: number;
  updatedAt: number;
  email: string;
  phone?: string;
  hashedPassword: string;
}

// user data as returned to the client
export interface UserDto {
  uuid: string;
  createdAt: number;
  updatedAt: number;
  email: string;
  phone?: string;
}

/**
 * Hashes a password using bcrypt
 * @param {string} password
 * @returns {Promise<string>} hashed password
 */
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

/**
 * Converts a user object from the database format to the dto format
 * @param {UserDb} user
 * @returns {UserDto} user
 */
const dbToDto = (user: UserDb): UserDto => {
  return {
    uuid: user.uuid,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    phone: user.phone,
  };
};

export const userTableName = 'users';

/**
 * Creates a new user
 * @param {UserOptions} options
 * @returns {Promise<UserDto>} created user
 */
export const createUser = async (options: UserOptions): Promise<UserDto> => {
  const hashedPassword = await hashPassword(options.password);
  const now = new Date().getTime();
  const [createdUser] = await knexClient<UserDb>(userTableName)
    .insert({
      uuid: v4(),
      createdAt: now,
      updatedAt: now,
      email: options.email,
      phone: options.phone,
      hashedPassword,
    })
    .returning('*');

  invariant(createdUser, 'User was not created');
  return dbToDto(createdUser);
};

/**
 * Gets a user from the database by email
 * @param {string} email
 * @returns {Promise<UserDb | undefined>} user
 */
export const actuallyGetUserByEmail = async (
  email: string
): Promise<UserDb | undefined> => {
  const user = await knexClient<UserDb>(userTableName)
    .where({
      email,
    })
    .first();
  return user;
};

/**
 * Gets a user by email
 * @param {string} email
 * @returns {Promise<UserDto | null>} user
 */
export const getUserByEmail = async (
  email: string
): Promise<UserDto | null> => {
  const user = await actuallyGetUserByEmail(email);

  if (!user) {
    return null;
  }

  return dbToDto(user);
};

/**
 * Gets a user from the database by uuid
 * @param {string} uuid
 * @returns {Promise<UserDb | null>} user
 */
export const getUserByUuid = async (uuid: string): Promise<UserDto | null> => {
  const user = await knexClient<UserDb>(userTableName)
    .where({
      uuid,
    })
    .first();

  if (!user) {
    return null;
  }

  return dbToDto(user);
};

/**
 * Logs a user in
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserDto>} logged in user
 */
export const login = async (
  email: string,
  password: string
): Promise<UserDto> => {
  const user = await actuallyGetUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  // check password
  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordCorrect) {
    throw new Error('Email and password do not match.');
  }

  return dbToDto(user);
};

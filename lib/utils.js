import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const salt = 12;
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function isInputsInvalid(email, password) {
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    console.log('invalid input');
    return true;
  }
  return false;
}

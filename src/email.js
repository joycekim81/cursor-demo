import { isValidEmail } from './validator.js';

function extractEmails(users) {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.map((user) => user.email);
}

function getValidEmails(users) {
  return extractEmails(users).filter(isValidEmail);
}

function uniqueValidEmails(users) {
  return [...new Set(getValidEmails(users))];
}

export { extractEmails, getValidEmails, uniqueValidEmails, isValidEmail };

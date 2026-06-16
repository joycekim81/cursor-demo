import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractEmails, isValidEmail, getValidEmails } from './email.js';

test('extractEmails returns emails from members', () => {
  const members = [{ email: 'a@b.com' }, { email: 'c@d.com' }];
  assert.deepEqual(extractEmails(members), ['a@b.com', 'c@d.com']);
});

test('extractEmails returns empty array for non-array input', () => {
  assert.deepEqual(extractEmails(null), []);
  assert.deepEqual(extractEmails('not-array'), []);
});

test('isValidEmail validates email format', () => {
  assert.equal(isValidEmail('user@example.com'), true);
  assert.equal(isValidEmail('invalid'), false);
  assert.equal(isValidEmail(123), false);
});

test('isValidEmail follows RFC 5322 examples from spec', () => {
  assert.equal(isValidEmail('alice@example.com'), true);
  assert.equal(isValidEmail('user+tag@example.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail(null), false);
  assert.equal(isValidEmail('a'.repeat(64) + '@example.com'), true);
  assert.equal(isValidEmail('a'.repeat(65) + '@example.com'), false);
  assert.equal(isValidEmail('a'.repeat(243) + '@example.com'), false);
});

test('isValidEmail rejects illegal IP octets in domain literal', () => {
  assert.equal(isValidEmail('user@[192.168.0.1]'), true);
  assert.equal(isValidEmail('user@[00.00.00.00]'), false);
});

test('getValidEmails returns only valid emails', () => {
  const members = [
    { email: 'good@example.com' },
    { email: 'bad-email' },
    { email: 'also@valid.org' },
    { email: null },
  ];
  assert.deepEqual(getValidEmails(members), ['good@example.com', 'also@valid.org']);
});

test('getValidEmails returns empty array for non-array input', () => {
  assert.deepEqual(getValidEmails(undefined), []);
});

/**
 * 이메일 문자열을 비교·저장용으로 정규화한다.
 * 앞뒤 공백을 제거하고 소문자로 변환한다.
 * @param {string} email - 정규화할 이메일
 * @returns {string} 정규화된 이메일. 문자열이 아니면 빈 문자열
 */
export function normalizeEmail(email) {
  if (typeof email !== 'string') {
    return '';
  }
  return email.trim().toLowerCase();
}

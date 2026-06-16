import { login } from '../auth.js';

const MAX_BODY_BYTES = 4096;

/**
 * 요청 본문을 읽어 문자열로 반환한다.
 * @param {import('http').IncomingMessage} req
 * @param {number} maxBytes - 허용 최대 바이트 수
 * @returns {Promise<string>}
 */
function readBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;

    req.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > maxBytes) {
        req.destroy();
        reject(new Error('BODY_TOO_LARGE'));
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });

    req.on('error', reject);
  });
}

/**
 * JSON 응답을 전송한다.
 * @param {import('http').ServerResponse} res
 * @param {number} statusCode
 * @param {object} payload
 */
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

/**
 * POST /api/login 요청을 처리한다.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @returns {Promise<void>}
 */
export async function handleLogin(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { success: false, error: 'POST 메서드만 허용됩니다.' });
    return;
  }

  const contentType = req.headers['content-type'] ?? '';
  if (!contentType.includes('application/json')) {
    sendJson(res, 415, { success: false, error: 'Content-Type은 application/json이어야 합니다.' });
    return;
  }

  let body;
  try {
    body = await readBody(req, MAX_BODY_BYTES);
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      sendJson(res, 413, { success: false, error: '요청 본문이 너무 큽니다.' });
      return;
    }
    sendJson(res, 400, { success: false, error: '요청 본문을 읽을 수 없습니다.' });
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    sendJson(res, 400, { success: false, error: '유효한 JSON이 아닙니다.' });
    return;
  }

  const { email, password } = parsed;
  const result = login(email, password);

  if (!result.success) {
    sendJson(res, 400, result);
    return;
  }

  sendJson(res, 200, { success: true });
}

import http from 'http';
import { handleLogin } from './api/login.js';

/**
 * HTTP 요청을 라우팅한다.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @returns {Promise<void>}
 */
async function routeRequest(req, res) {
  const { method, url } = req;

  if (method === 'POST' && url === '/api/login') {
    await handleLogin(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: false, error: '엔드포인트를 찾을 수 없습니다.' }));
}

/**
 * HTTP 서버 인스턴스를 생성한다.
 * @returns {import('http').Server}
 */
export function createServer() {
  return http.createServer((req, res) => {
    routeRequest(req, res).catch(() => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: '서버 내부 오류가 발생했습니다.' }));
      }
    });
  });
}

/**
 * 서버를 지정 포트에서 시작한다.
 * @param {number} [port=3000] - 리슨 포트
 * @returns {import('http').Server}
 */
export function startServer(port = 3000) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  });
  return server;
}

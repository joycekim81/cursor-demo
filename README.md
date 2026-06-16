# cursor-demo

RFC 5322 기반 이메일 검증 모듈과 사용자·인증 유틸리티를 제공하는 Node.js 프로젝트입니다.

## 설치 및 실행

```bash
npm test
```

## 릴리스 노트

### v1.0.0

**RFC 5322 기반 이메일 검증 모듈과 사용자·인증 유틸리티를 포함한 첫 공식 릴리스입니다.**

#### ✨ 기능

- **`isValidEmail()`** — RFC 5322 정규식과 RFC 3696 길이 제한(로컬 파트 64자, 전체 254자)으로 이메일 형식 검증
- **IP 도메인 리터럴 검증** — `user@[192.168.0.1]` 등 합법 옥텟만 허용, `00.00.00.00` 같은 불법 옥텟 거부
- **`email.js` 유틸리티** — 사용자 목록에서 이메일 추출(`extractEmails`), 유효 이메일 필터링(`getValidEmails`), 중복 제거(`uniqueValidEmails`)
- **`login()`** — 이메일 형식·비밀번호 입력 검증 후 로그인 결과 반환 (`auth.js`)
- **`normalizeEmail()`** — 이메일 앞뒤 공백 제거 및 소문자 정규화 (`util.js`)
- **테스트 스위트** — Node.js 내장 테스트(`node:test`)로 검증 로직 및 스펙 예시 커버 (`npm test`)

#### 🧹 기타

- ES Module(`import`/`export`) 기반 프로젝트 구조
- `docs/validator.md` — AI 리팩터링·코드 리뷰용 검증기 스펙 문서
- `.cursor/rules/coding-style.mdc` — 한국어 주석·JSDoc 코딩 스타일 규칙

## 문서

- [validator.js 스펙](docs/validator.md)

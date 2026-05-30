# My Security Write-ups

CERT를 목표로, 취약점 분석부터 익스플로잇까지의 과정을 기록

<details>
<summary><h2>🌐 Dreamhack (Web) (클릭하여 펼치기)</h2></summary>

<details>
<summary><h3>🥉 Bronze</h3></summary>

<details>
<summary><h4>Bronze 2</h4></summary>

* [Dream Badge](./dreamhack/web/bronze/bronze-2/dream-badge/dream-badge.md) - **Nginx 웹 캐시 기만(Web Cache Deception) 설계 결함 및 Dockerfile 노출을 이용한 배포 환경 정보 유출 파훼**

</details>

<details>
<summary><h4>Bronze 3</h4></summary>

* [Already Got](./dreamhack/web/bronze/bronze-3/already-got/already-got.md) - **HTTP 응답 헤더(Response Header) 내 중요 정보 평문 노출 취약점을 이용한 플래그 탈취**

* [AmoCafe](./dreamhack/web/bronze/bronze-3/amocafe/amocafe.md) - **비트 시프트 및 마스킹 연산을 이용한 암호화 로직 분석 및 16진수 역산을 통한 플래그 획득**

* [Apache htaccess](./dreamhack/web/bronze/bronze-3/apache-htaccess/apache-htaccess.md) - **AllowOverride 설정 결함과 확장자 필터링 우회를 이용한 .htaccess 변조 및 웹 셸 RCE 공격**

* [Baby AI](./dreamhack/web/bronze/bronze-3/baby-ai/baby-ai.md) - **단순 문자열 기반 금지어 필터링 결함과 간접적 지시어를 이용한 LLM 프롬프트 인젝션(Prompt Injection) 공격**

* [Base64 based](./dreamhack/web/bronze/bronze-3/base64-based/base64-based.md) - **Base64 인코딩 특성을 활용한 블랙리스트 필터링 우회 및 LFI 취약점을 이용한 플래그 획득**

* [BypassIF](./dreamhack/web/bronze/bronze-3/bypassif/bypassif.md) - **입력값 필터링 제약 우회 및 서브프로세스 Timeout 예외 처리 결함을 이용한 비밀 키 유출 및 인증 로직 우회**

* [DreamDocs](./dreamhack/web/bronze/bronze-3/dreamdocs/dreamdocs.md) - **클라이언트 기반 권한 검증 결함과 HTTP 헤더(X-User, Referer) 변조를 이용한 인가 우회 및 기밀문서 열람**

* [File Vulnerability Advanced for Linux](./dreamhack/web/bronze/bronze-3/file-vulnerability-advanced-for-linux/file-vulnerability-advanced-for-linux.md) - **LFI를 이용한 환경변수 유출 및 RCE 취약점 연계를 통한 플래그 획득**

* [Logical](./dreamhack/web/bronze/bronze-3/logical/logical.md) - **파이썬 논리 연산자(and) 검증 누락과 삼항 연산자 반환 결함을 이용한 인증 로직 우회**

* [MD5 Password](./dreamhack/web/bronze/bronze-3/md5-password/md5-password.md) - **PHP md5() 함수의 raw_output 특성과 MySQL 자동 형변환을 이용한 SQL Injection 및 인증 우회**

* [MongoBoard](./dreamhack/web/bronze/bronze-3/mongoboard/mongoboard.md) - **MongoDB ObjectID의 구조적 예측 가능성과 단건 조회 API의 인가 검증 미흡(IDOR)을 이용한 비밀글 데이터 열람 및 플래그 탈취**

* [Out of Money](./dreamhack/web/bronze/bronze-3/out-of-money/out-of-money.md) - **기존 부채 검증 누락 비즈니스 로직 결함을 이용한 대출 한도 우회 및 음수 부채 상환을 통한 플래그 획득**

* [PEPERO](./dreamhack/web/bronze/bronze-3/pepero/pepero.md) - **결제 시스템의 음수 입력 검증 누락(Logic Flaw)을 이용한 소지금 증식 및 플래그 획득**

* [Proxy-1](./dreamhack/web/bronze/bronze-3/proxy-1/proxy-1.md) - **SSRF 취약점과 Raw Socket 통신을 이용한 내부망 서비스 접근 및 관리자 인증 우회**

* [Simple PHParse](./dreamhack/web/bronze/bronze-3/simple-phparse/simple-phparse.md) - **웹 서버와 PHP parse_url 함수 간의 파서 불일치(Parser Differential) 및 라우팅 정형화 결함을 이용한 필터링 우회**

* [Simple SQLi](./dreamhack/web/bronze/bronze-3/simple_sqli/simple_sqli.md) - **f-string 기반의 동적 SQL 쿼리 생성 취약점 분석 및 주석을 이용한 인증 우회**

* [Type c-j](./dreamhack/web/bronze/bronze-3/type-c-j/type-c-j.md) - **명시적 형변환과 느슨한 비교(==) 연산자 결함을 이용한 PHP Type Juggling 공격 및 인증 우회**

* [What Is My IP](./dreamhack/web/bronze/bronze-3/what-is-my-ip/what-is-my-ip.md) - **HTTP X-Forwarded-For 헤더 변조 및 Flask access_route 구조적 결함을 이용한 Command Injection 공격**

* [XSS Filtering Bypass](./dreamhack/web/bronze/bronze-3/xss-filtering-bypass/xss-filtering-bypass.md) - **단일 치환(Replace) 필터링 결함 및 더블링(Doubling) 기법을 이용한 XSS 우회와 관리자 세션 탈취**

</details>

<details>
<summary><h4>Bronze 4</h4></summary>

* [(공백)](./dreamhack/web/bronze/bronze-4/space/space.md) - **비가시적 유니코드 제어 문자(LRM) 식별 및 시각적 기만 취약점 우회**

* [403 Forbidden](./dreamhack/web/bronze/bronze-4/403-forbbiden/403-forbbiden.md) - **클라이언트 전송 데이터 검증 미흡을 이용한 403 Forbidden 우회 및 플래그 탈취**

* [Broken Buffalo Wings](./dreamhack/web/bronze/bronze-4/broken-buffalo-wings/broken-buffalo-wings.md) - **PHP 출력 버퍼링(Output Buffering) 취약점을 이용한 CSP 우회 및 XSS 공격**

* [Click me!](./dreamhack/web/bronze/bronze-4/click-me/click-me.md) - **자바스크립트 클라이언트 사이드 이벤트 우회 및 DOM 조작을 통한 강제 클릭 트리거**

* [Command Injection Chatgpt](./dreamhack/web/bronze/bronze-4/command-injection-chatgpt/command-injection-chatgpt.md) - **f-string 기반의 OS 명령어 주입 필터링 우회 및 subprocess 취약점 분석**

* [CSRF-2](./dreamhack/web/bronze/bronze-4/csrf-2/csrf-2.md) - **CSRF 취약점을 이용한 관리자 비밀번호 변경 및 계정 탈취**

* [Ctrl-C](./dreamhack/web/bronze/bronze-4/ctrl-c/ctrl-c.md) - **프록시를 이용한 클라이언트 사이드 복사 제한 우회 및 XOR 암호문 복호화**

* [Dream of glorya](./dreamhack/web/bronze/bronze-4/dream-of-glorya/dream-of-glorya.md) - **대소문자 정규화 로직 결함 우회 및 취약한 난수 패스워드 무차별 대입을 통한 권한 탈취**

* [Ex Reg Ex](./dreamhack/web/bronze/bronze-4/ex-reg-ex/ex-reg-ex.md) - **파이썬 정규표현식(re.match) 패턴 분석 및 입력값 검증 우회**

* [Fakeday](./dreamhack/web/bronze/bronze-4/fakeday/fakeday.md) - **블랙박스 환경에서의 로컬 리소스 분석 및 의도된 심리적 함정(Rabbit Hole) 우회**

* [Find Real One](./dreamhack/web/bronze/bronze-4/find-real-one/find-real-one.md) - **대량의 정적 리소스 중 유일한 파일 경로 식별 및 페이지 소스 분석을 통한 플래그 탈취**

* [Image Storage](./dreamhack/web/bronze/bronze-4/image-storage/image-storage.md) - **파일 업로드 취약점 및 서버사이드 필터링 부재를 이용한 웹셸 업로드와 원격 코드 실행**

* [PHP7cmp4re](./dreamhack/web/bronze/bronze-4/php7cmp4re/php7cmp4re.md) - **PHP 7.x 느슨한 비교(Loose Comparison) 및 타입 저글링 취약점 우회**

* [PHPreg](./dreamhack/web/bronze/bronze-4/phpreg/phpreg.md) - **PHP 정규표현식(preg_replace) 필터링 우회 및 OS 명령어 주입**

* [Random Test](./dreamhack/web/bronze/bronze-4/random-test/random-test.md) - **부분 일치(Partial Match) 검증 로직 취약점을 이용한 오라클 Brute-force 공격**

* [Session Basic](./dreamhack/web/bronze/bronze-4/session-basic/session-basic.md) - **정보 노출 취약점을 이용한 세션 ID 탈취 및 관리자 인증 우회**

* [Simple SQLi Chatgpt](./dreamhack/web/bronze/bronze-4/simple_sqli_chatgpt/simple_sqli_chatgpt.md) - **f-string 기반의 SQL 쿼리 주입 및 ORDER BY를 이용한 결과 정렬 조작 취약점 분석**

* [Test Your Luck](./dreamhack/web/bronze/bronze-4/test-your-luck/test-your-luck.md) - **검증 로직의 횟수 제한(Rate Limiting) 부재를 이용한 자동화 브루트 포스 공격**

* [Whoami](./dreamhack/web/bronze/bronze-4/whoami/whoami.md) - **HTTP X-Forwarded-For 헤더 변조 및 Express 내부 IP 검증 로직 우회를 통한 관리자 권한 및 플래그 획득**

* [달고나](./dreamhack/web/bronze/bronze-4/dalgona/dalgona.md) - **HTTP 메소드 조작 및 서버사이드 상태 검증 부재를 이용한 게임 로직 우회 및 플래그 탈취**

</details>

</details>

<details>
<summary><h3>🌱 Beginner</h3></summary>

* [Carve Party](./dreamhack/web/beginner/carve-party/carve-party.md) - **클라이언트 사이드 검증 취약점 분석 및 DOM 이벤트 조작**

* [Command Injection-1](./dreamhack/web/beginner/command-injection-1/command-injection-1.md) - **OS 명령어 주입 취약점 기본**

* [Cookie](./dreamhack/web/beginner/cookie/cookie.md) - **클라이언트 측 조작을 통한 관리자 인증 우회 (쿠키 변조)**

* [Devtools Sources](./dreamhack/web/beginner/devtools-sources/devtools-sources.md) - **소스맵(.map) 파일 노출을 이용한 프론트엔드 원본 코드 탈취**

* [File Download-1](./dreamhack/web/beginner/file-download-1/file-download-1.md) - **Path Traversal(경로 조작) 취약점을 이용한 서버 내부 임의 파일 읽기**

* [Flying Chars](./dreamhack/web/beginner/flying-chars/flying-chars.md) - **자바스크립트 시각적 교란 우회 및 클라이언트 사이드 정적 데이터 분석**

* [Path Traversal](./dreamhack/web/beginner/pathtraversal/pathtraversal.md) - **SSRF와 Path Traversal 연계 및 프론트엔드(JS) 입력 검증 우회**

* [Session](./dreamhack/web/beginner/session/session.md) - **취약한 세션 생성 로직 분석 및 무작위 대입(Brute-force) 공격을 통한 세션 위조**

* [Simple Web Request](./dreamhack/web/beginner/simple-web-request/simple-web-request.md) - **HTTP GET/POST 요청 메서드 분석 및 단계별 파라미터 조작을 통한 인증 로직 우회**

* [Web Misconf-1](./dreamhack/web/beginner/web-misconf-1/web-misconf-1.md) - **보안 설정 오류(Security Misconfiguration)를 이용한 관리자 권한 탈취 및 민감 정보 노출**

</details>

</details>

<details>
<summary><h2>🏆 Dreamhack CTF (시즌 대회)</h2></summary>

<details>
<summary><h3>📅 2026년 시즌</h3></summary>

<details>
<summary><h4>Season 8 Round #5 (All-Round)</h4></summary>

* `[Pwnable]` [Product Manager](./dreamhack/ctf/season8-round5/pwnable/product-manager/product-manager.md) - **Off-by-One 취약점을 이용한 GOT Overwrite 및 셸 획득**

* `[Web]` [Suggestion Box](./dreamhack/ctf/season8-round5/web/suggestion-box/suggestion-box.md) - **Object Injection을 이용한 DB 검증 로직 우회 및 비공개 데이터 탈취**

</details>

</details>

</details>
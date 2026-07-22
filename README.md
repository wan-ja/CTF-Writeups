# My Security Write-ups

리버싱 및 웹 취약점 분석 역량 강화를 위해 익스플로잇부터 대응 방안까지의 과정을 기록

<br>

## Selected Write-ups (주요 분석 사례)
> 개인 학습 과정에서 분야별 주요 분석 케이스와 핵심 페이로드를 정돈한 요약 노트

### ⚙️ System & Reverse Engineering (시스템 분석 및 리버싱)
* [Rivest](./dreamhack/reversing/silver/silver-4/rivest/rivest.md) - **UPX 언패킹 및 GDB를 이용한 C2형 네트워크 통신 검증 강제 우회(return 조작)와 메모리 상의 MD5 암호 키 직접 패치를 통한 RC4 복호화 평문 플래그 추출**

* [BitChanger](./dreamhack/reversing/silver/silver-4/bitchanger/bitchanger.md) - **Heaven's Gate(64비트 전환) 및 SYSCALL 안티 디버깅 정적 우회와 4원 1차 연립방정식 역산 스크립팅**

* [GyulVault](./dreamhack/reversing/silver/silver-3/gyulvault/gyulvault.md) - **JNI 네이티브 라이브러리 정적 분석 및 XOR 대칭성을 활용한 메모리 덤프 역연산**

* [Stop before stops!](./dreamhack/reversing/bronze/bronze-2/stop-before-stops/stop_before_stops.md) - **C++ 전역 변수 초기화(.bss) 로직 정적 분석 및 GDB 동적 디버깅을 활용한 플래그 메모리 덤프**

* [Patch](./dreamhack/reversing/silver/silver-4/patch/patch.md) - **윈도우 프로시저(WM_PAINT) 분석 및 GDI+ 렌더링 방해 함수 어셈블리 변조(ret)를 통한 화면 덮어쓰기 무력화**

### 🌐 Web Application & Log Analysis (웹 보안 및 로그 분석)
* [Proxy-1](./dreamhack/web/bronze/bronze-3/proxy-1/proxy-1.md) - **SSRF 취약점과 Raw Socket 통신을 이용한 내부망 서비스 접근 및 관리자 인증 우회**

* [Dream Hospital (드림 병원 🌱)](./dreamhack/web/bronze/bronze-3/dream-hospital/dream-hospital.md) - **인가(Authorization) 검증 누락으로 인한 IDOR(안전하지 않은 직접 객체 참조) 취약점과 해시값 변조를 이용한 관리자 데이터 열람 및 플래그 탈취**

* [MD5 Password](./dreamhack/web/bronze/bronze-3/md5-password/md5-password.md) - **PHP md5() 함수의 raw_output 특성과 MySQL 자동 형변환을 이용한 SQL Injection 및 인증 우회**

* [XSS-1](./dreamhack/web/bronze/bronze-2/xss-1/xss-1.md) - **입력값 필터링 누락에 의한 Reflected XSS 취약점과 관리자 봇(Bot) 조종을 이용한 세션 탈취**

* [CSRF-2](./dreamhack/web/bronze/bronze-4/csrf-2/csrf-2.md) - **CSRF 취약점을 이용한 관리자 비밀번호 변경 및 계정 탈취**

---
<br>

<details>
<summary><h2>⚙️ Dreamhack (Reversing) </h2></summary>
<ul style="list-style-type: none;">

<details>
<summary><h3>🥈 Silver</h3></summary>
<ul>

<details>
<summary><h4>Silver 3</h4></summary>

* [GyulVault](./dreamhack/reversing/silver/silver-3/gyulvault/gyulvault.md) - **JNI 네이티브 라이브러리 정적 분석 및 XOR 대칭성을 활용한 메모리 덤프 역연산**

</details>

<details>
<summary><h4>Silver 4</h4></summary>

* [BitChanger](./dreamhack/reversing/silver/silver-4/bitchanger/bitchanger.md) - **Heaven's Gate(64비트 전환) 및 SYSCALL 안티 디버깅 정적 우회와 4원 1차 연립방정식 역산 스크립팅**

* [Gyul Order v2](./dreamhack/reversing/silver/silver-4/gyul-order-v2/gyul-order-v2.md) - **안드로이드 앱 디컴파일 기반 정적 분석 및 하드코딩된 객체 변수(price)를 활용한 동적 XOR 키 추출**

* [Patch](./dreamhack/reversing/silver/silver-4/patch/patch.md) - **윈도우 프로시저(WM_PAINT) 분석 및 GDI+ 렌더링 방해 함수 어셈블리 변조(ret)를 통한 화면 덮어쓰기 무력화**

* [Rivest](./dreamhack/reversing/silver/silver-4/rivest/rivest.md) - **UPX 언패킹 및 GDB를 이용한 C2형 네트워크 통신 검증 강제 우회(return 조작)와 메모리 상의 MD5 암호 키 직접 패치를 통한 RC4 복호화 평문 플래그 추출**

</details>

</ul>
</details>

<details>
<summary><h3>🥉 Bronze</h3></summary>
<ul>

<details>
<summary><h4>Bronze 1</h4></summary>

* [Mix-Compare](./dreamhack/reversing/bronze/bronze-1/mix-compare/mix-compare.md) - **하드코딩 데이터 기반 다단계 수식 검증 정적 분석 및 Z3 Solver를 활용한 역산 스크립팅**

* [Public](./dreamhack/reversing/bronze/bronze-1/public-wargame/public-wargame.md) - **자체 구현 RSA 암호화 로직 분석 및 취약한 모듈러스(N) 소인수분해를 통한 개인키 복원**

* [Secret Message](./dreamhack/reversing/bronze/bronze-1/secret-message/secret-message.md) - **RLE 기반 자체 인코딩 알고리즘 분석 및 파이썬 역산 스크립팅**

* [Small Counter](./dreamhack/reversing/bronze/bronze-1/small-counter/small-counter.md) - **디컴파일러 최적화(데드 코드 제거) 맹점 분석 및 동적 디버깅 기반 스택 메모리 조작**

</details>

<details>
<summary><h4>Bronze 2</h4></summary>

* [Batch Checker](./dreamhack/reversing/bronze/bronze-2/batch-checker/batch-checker.md) - **배치 스크립트 환경 변수 치환(Substring) 문법을 악용한 텍스트 난독화 정적 분석 및 파이썬 파싱 자동화**

* [Collect Me](./dreamhack/reversing/bronze/bronze-2/collect-me/collect-me.md) - **수백 개의 더미 함수 구조 파악 및 pwntools를 활용한 기계어 바이트(Opcode) 패턴 추출 자동화**

* [DLL with Notepad](./dreamhack/reversing/bronze/bronze-2/dll-with-notepad/dll-with-notepad.md) - **호스트 프로세스 검증 버그(FindWindow) 분석 및 동적 디버깅을 통한 전역 변수 메모리 탈취**

* [Dungeon In 1983](./dreamhack/reversing/bronze/bronze-2/dungeon-in-1983/dungeon-in-1983.md) - **비트 시프트를 활용한 64비트 난수 시드 복원 및 홀짝 분기 역연산 기반 Pwntools 통신 자동화**

* [Flag Printer](./dreamhack/reversing/bronze/bronze-2/flag-printer/flag-printer.md) - **C언어 strtok 함수 특성을 활용한 파싱 로직 분석 및 하드코딩된 XOR 백도어 복호화**

* [Gyul Brix Calculator](./dreamhack/reversing/bronze/bronze-2/gyul-brix-calculator/gyul-brix-calculator.md) - **단일 검증 변수 취약점 정적 분석 및 동적 디버깅 기반 조건 분기(ZF) 조작**

* [Inject ME!!!](./dreamhack/reversing/bronze/bronze-2/inject-me/inject-me.md) - **DLL DllMain 진입점 분석 및 호스트 프로세스명 검증 로직 우회용 전용 로더(Loader) 제작**

* [Labyrinth](./dreamhack/reversing/bronze/bronze-2/labyrinth/labyrinth.md) - **ptrace 안티 디버깅 우회 및 동적 디버깅을 활용한 레지스터(RBP) 내 동적 생성 평문 키(Key) 메모리 탈취**

* [LegacyOpt](./dreamhack/reversing/bronze/bronze-2/legacyopt/legacyopt.md) - **더프의 장치(Duff's Device) 제어 흐름 분석 및 패턴 기반 반복 XOR 역연산 스크립팅**

* [Malware L08](./dreamhack/reversing/bronze/bronze-2/malware-l08/malware-l08.md) - **정적 제어 흐름 그래프(CFG) 분석을 통한 외부 프로세스 실행 API(ShellExecuteExA) 호출 분기점 식별**

* [Many Shuffle](./dreamhack/reversing/bronze/bronze-2/many-shuffle/many-shuffle.md) - **시간(time) 기반 난수 생성기 취약점 분석 및 ctypes를 활용한 libc 난수 포팅, 더미 셔플 로직 우회를 통한 상태 예측 자동화**

* [My Favorite Fruit](./dreamhack/reversing/bronze/bronze-2/my-favorite-fruit/my-favorite-fruit.md) - **scanf 포맷 스트링 제한(Off-by-one) 함정 분석 및 하드코딩된 암호문 다중 XOR 오프라인 복호화**

* [My Rand](./dreamhack/reversing/bronze/bronze-2/my-rand/my-rand.md) - **하드코딩된 시드 배열과 커스텀 난수 연산(XOR, 비트 스왑) 로직 분석 및 파이썬 정방향 알고리즘 포팅 기반 상태 예측 자동화**

* [No Problem (아 문제 이름 뭘로하지)](./dreamhack/reversing/bronze/bronze-2/no_problem/no_problem.md) - **대칭형 검증 로직 취약점 정적 분석 및 하드코딩된 타겟 배열 XOR 복호화**

* [Rev-Basic-9](./dreamhack/reversing/bronze/bronze-2/rev-basic-9/rev-basic-9.md) - **커스텀 S-box 치환 및 다중 비트 연산(Shift, XOR) 기반 블록 암호화 로직 정적 분석과 파이썬 역연산 복호화**

* [SelfStatus](./dreamhack/reversing/bronze/bronze-2/selfstatus/selfstatus.md) - **안티 디버깅 로직 분석 및 동적 디버깅(GDB)을 통한 레지스터 변조 우회 및 인자(RDI) 메모리 탈취**

* [Simple Patch Me](./dreamhack/reversing/bronze/bronze-2/simple-patch-me/simple-patch-me.md) - **바이너리 패치(Binary Patching)를 통한 시간 지연(sleep) 루프 무력화 및 플래그 복호화**

* [Stop before stops!](./dreamhack/reversing/bronze/bronze-2/stop-before-stops/stop_before_stops.md) - **C++ 전역 변수 초기화(.bss) 로직 정적 분석 및 GDB 동적 디버깅을 활용한 플래그 메모리 덤프**

* [Tiny Maze](./dreamhack/reversing/bronze/bronze-2/tiny-maze/tiny-maze.md) - **사용자 입력 함수(read) 및 2D 좌표 이동 로직 분석을 통한 미로 탈출**

* [ToyPacked](./dreamhack/reversing/bronze/bronze-2/toypacked/toypacked.md) - **동적 디버깅을 통한 1차 파일리스(Fileless) 언패킹 및 XOR 연산 대칭성 기반 암호 키 역산**

</details>

<details>
<summary><h4>Bronze 3</h4></summary>

* [Check Function Argument](./dreamhack/reversing/bronze/bronze-3/check-function-argument/check-function-argument.md) - **함수 호출 규약(Calling Convention) 기반 동적 디버깅 및 레지스터(RDI) 인자 메모리 탈취**

* [Checkflag](./dreamhack/reversing/bronze/bronze-3/checkflag/checkflag.md) - **Stack BOF 취약점과 strcmp 특성을 활용한 역방향 블라인드 브루트 포스(Blind Brute-force) 공격 자동화**

* [Custom Encoding](./dreamhack/reversing/bronze/bronze-3/custom-encoding/custom-encoding.md) - **모듈러(Modulo) 기반 커스텀 암호화 수식 정적 분석 및 이항 정리를 활용한 파이썬 역연산 복호화**

* [Malware L06](./dreamhack/reversing/bronze/bronze-3/malware-l06/malware-l06.md) - **어셈블리 제어 흐름 분석을 통한 악성코드 다중 뮤텍스(Mutex) 생성 로직 파악 및 API 인자 역산**

* [MobileApp L01](./dreamhack/reversing/bronze/bronze-3/mobileapp-l01/mobileapp-l01.md) - **변조된 APK 파일 구조 수동 복구(리패키징) 및 클라우드 물리 기기를 활용한 ARM 환경 동적 분석**

* [R-XOR-T](./dreamhack/reversing/bronze/bronze-3/r-xor-t/r-xor-t.md) - **다중 암호화(비트 마스킹, 배열 역순, XOR) 로직 정적 분석 및 하드코딩된 타겟 기반의 파이썬 역연산 복호화**

* [Simple and Swap](./dreamhack/reversing/bronze/bronze-3/simple-and-swap/simple-and-swap.md) - **비트 스왑(Nibble Swap) 및 다중 연산(XOR, 인덱스 덧셈) 로직 정적 분석과 파이썬 역연산 복호화**

* [Simple Crack Me 2](./dreamhack/reversing/bronze/bronze-3/simple-crack-me-2/simple-crack-me-2.md) - **다중 사칙연산 및 XOR 알고리즘 분석과 정방향 함수 대칭성을 활용한 역연산 복호화**

* [Summer Fan](./dreamhack/reversing/bronze/bronze-3/summer-fan/summer-fan.md) - **안드로이드 APK 디컴파일(JADX)을 통한 하드코딩 배열 추출 및 다중 연산(거듭제곱, 모듈러, XOR) 로직 정적 분석과 파이썬 역연산 복호화**

* [Tiny Ouroboroi](./dreamhack/reversing/bronze/bronze-3/tiny-ouroboroi/tiny-ouroboroi.md) - **원형 연결 리스트 기반 동적 할당 및 다중 비트 연산(Shift, NOT) 로직 정적 분석과 파이썬 역연산 복호화**

</details>

<details>
<summary><h4>Bronze 4</h4></summary>

* [Check Return Value](./dreamhack/reversing/bronze/bronze-4/check-return-value/check-return-value.md) - **함수 반환값(RAX) 구조 분석 및 동적 디버깅을 활용한 메모리 포인터 추적 및 탈취**

* [Easy Assembly](./dreamhack/reversing/bronze/bronze-4/easy-assembly/easy-assembly.md) - **어셈블리 레지스터 흐름 분석 및 메모리 주소 기반 데이터 크기 유추를 통한 XOR 역연산**

* [Malware L07](./dreamhack/reversing/bronze/bronze-4/malware-l07/malware-l07.md) - **어셈블리 제어 흐름(Control Flow) 분석을 통한 악성 로직 분기점 추적 및 API(Sleep) 인자 역산**

* [Recover](./dreamhack/reversing/bronze/bronze-4/recover/recover.md) - **하드코딩된 4바이트 키 기반의 XOR 및 산술 역연산을 활용한 이미지 파일 복호화 분석**

* [Rev-Basic-5](./dreamhack/reversing/bronze/bronze-4/rev-basic-5/rev-basic-5.md) - **연속된 1바이트 덧셈 역연산을 활용한 하드코딩 데이터 복호화 및 플래그 획득**

* [Rev-Basic-6](./dreamhack/reversing/bronze/bronze-4/rev-basic-6/rev-basic-6.md) - **치환 테이블(S-Box)을 활용한 데이터 매칭 로직 분석 및 역산**

* [Rev-Basic-7](./dreamhack/reversing/bronze/bronze-4/rev-basic-7/rev-basic-7.md) - **비트 순환 시프트(ROL/ROR) 및 XOR 역연산을 활용한 하드코딩 데이터 복호화**

* [Rev-Basic-8](./dreamhack/reversing/bronze/bronze-4/rev-basic-8/rev-basic-8.md) - **음수 곱셈 기반 1바이트 오버플로우 특성 분석 및 브루트 포스 역산**

</details>

</ul>
</details>

<details>
<summary><h3>🌱 Beginner</h3></summary>

* [Rev-Basic-0](./dreamhack/reversing/beginner/rev-basic-0/rev-basic-0.md) - **하드코딩된 플래그 문자열 평문 검증 로직 분석 및 탈취**

* [Rev-Basic-1](./dreamhack/reversing/beginner/rev-basic-1/rev-basic-1.md) - **하드코딩된 플래그의 인덱스별 단항 비교 로직 분석 및 탈취**

* [Rev-Basic-2](./dreamhack/reversing/beginner/rev-basic-2/rev-basic-2.md) - **포인터 연산을 활용한 4바이트 배열 구조 분석 및 탈취**

* [Rev-Basic-3](./dreamhack/reversing/beginner/rev-basic-3/rev-basic-3.md) - **인덱스를 활용한 XOR 및 사칙연산 역연산 로직 분석 및 탈취**

* [Rev-Basic-4](./dreamhack/reversing/beginner/rev-basic-4/rev-basic-4.md) - **비트 시프트 연산(Nibble Swap)을 활용한 데이터 역연산 및 탈취**

* [Simple Crack Me](./dreamhack/reversing/beginner/simple-crack-me/simple-crack-me.md) - **정적 컴파일 바이너리 분석 및 하드코딩된 16진수 단순 비교 로직 우회**

* [Simple Operation](./dreamhack/reversing/beginner/simple-operation/simple-operation.md) - **난수 노출 취약점 및 문자열 리버싱, 단순 XOR 역연산을 활용한 검증 우회 및 탈취**

</details>

</ul>
</details>

<details>
<summary><h2>🌐 Dreamhack (Web) </h2></summary>
<ul style="list-style-type: none;">

<details>
<summary><h3>🥉 Bronze</h3></summary>
<ul>

<details>
<summary><h4>Bronze 2</h4></summary>

* [Blind Command](./dreamhack/web/bronze/bronze-2/blind-command/blind-command.md) - **HTTP 메소드 검증 우회 및 OOB(Out-of-Band) 기법을 활용한 Command Injection 공격**

* [Command Injection Advanced](./dreamhack/web/bronze/bronze-2/command-injection-advanced/command-injection-advanced.md) - **escapeshellcmd 필터링 우회 및 curl 인자 주입(Argument Injection)을 이용한 웹 셸 업로드 공격**

* [Dream Badge](./dreamhack/web/bronze/bronze-2/dream-badge/dream-badge.md) - **Nginx 웹 캐시 기만(Web Cache Deception) 설계 결함 및 Dockerfile 노출을 이용한 배포 환경 정보 유출 파훼**

* [Login Filtering](./dreamhack/web/bronze/bronze-2/login-filtering/login-filtering.md) - **MySQL과 PHP의 대소문자 처리 방식(Case Sensitivity) 차이를 악용한 계정 검증 필터링 우회**

* [StrCmp](./dreamhack/web/bronze/bronze-2/strcmp/strcmp.md) - **PHP strcmp 함수의 배열 반환 결함과 느슨한 비교(Type Juggling)를 악용한 패스워드 검증 우회**

* [XSS-1](./dreamhack/web/bronze/bronze-2/xss-1/xss-1.md) - **입력값 필터링 누락에 의한 Reflected XSS 취약점과 관리자 봇(Bot) 조종을 이용한 세션 탈취**

</details>

<details>
<summary><h4>Bronze 3</h4></summary>

* [Already Got](./dreamhack/web/bronze/bronze-3/already-got/already-got.md) - **HTTP 응답 헤더(Response Header) 내 중요 정보 평문 노출 취약점을 이용한 플래그 탈취**

* [AmoCafe](./dreamhack/web/bronze/bronze-3/amocafe/amocafe.md) - **비트 시프트 및 마스킹 연산을 이용한 암호화 로직 분석 및 16진수 역산을 통한 플래그 획득**

* [Apache htaccess](./dreamhack/web/bronze/bronze-3/apache-htaccess/apache-htaccess.md) - **AllowOverride 설정 결함과 확장자 필터링 우회를 이용한 .htaccess 변조 및 웹 셸 RCE 공격**

* [Baby AI](./dreamhack/web/bronze/bronze-3/baby-ai/baby-ai.md) - **단순 문자열 기반 금지어 필터링 결함과 간접적 지시어를 이용한 LLM 프롬프트 인젝션(Prompt Injection) 공격**

* [Base64 based](./dreamhack/web/bronze/bronze-3/base64-based/base64-based.md) - **Base64 인코딩 특성을 활용한 블랙리스트 필터링 우회 및 LFI 취약점을 이용한 플래그 획득**

* [BypassIF](./dreamhack/web/bronze/bronze-3/bypassif/bypassif.md) - **입력값 필터링 제약 우회 및 서브프로세스 Timeout 예외 처리 결함을 이용한 비밀 키 유출 및 인증 로직 우회**

* [Copy And Paste](./dreamhack/web/bronze/bronze-3/copy-and-paste/copy-and-paste.md) - **서버 측 Font Obfuscation(폰트 난독화) 기법 식별 및 OCR(광학 문자 인식) 기반 시각 데이터 추출을 이용한 플래그 획득**

* [Disgusting Ads](./dreamhack/web/bronze/bronze-3/disgusting-ads/disgusting-ads.md) - **Client-side Session의 구조적 결함과 Session Replay 공격을 이용한 시간 검증 로직 우회**

* [Dream Hospital (드림 병원 🌱)](./dreamhack/web/bronze/bronze-3/dream-hospital/dream-hospital.md) - **인가(Authorization) 검증 누락으로 인한 IDOR(안전하지 않은 직접 객체 참조) 취약점과 해시값 변조를 이용한 관리자 데이터 열람 및 플래그 탈취**

* [DreamDocs](./dreamhack/web/bronze/bronze-3/dreamdocs/dreamdocs.md) - **클라이언트 기반 권한 검증 결함과 HTTP 헤더(X-User, Referer) 변조를 이용한 인가 우회 및 기밀문서 열람**

* [Eval (이발)](./dreamhack/web/bronze/bronze-3/eval/eval.md) - **블랙리스트 기반 확장자 필터링 우회와 파이썬 eval() 함수의 동적 실행 취약점을 이용한 플래그 획득**

* [File Vulnerability Advanced for Linux](./dreamhack/web/bronze/bronze-3/file-vulnerability-advanced-for-linux/file-vulnerability-advanced-for-linux.md) - **LFI를 이용한 환경변수 유출 및 RCE 취약점 연계를 통한 플래그 획득**

* [Logical](./dreamhack/web/bronze/bronze-3/logical/logical.md) - **파이썬 논리 연산자(and) 검증 누락과 삼항 연산자 반환 결함을 이용한 인증 로직 우회**

* [Makchang (막창 좋아하세요? 🌱)](./dreamhack/web/bronze/bronze-3/makchang/makchang.md) - **PHP 문자열 형변환 결함과 지수 표기법(Scientific Notation)을 이용한 검증 로직 우회 및 플래그 획득**

* [MD5 Password](./dreamhack/web/bronze/bronze-3/md5-password/md5-password.md) - **PHP md5() 함수의 raw_output 특성과 MySQL 자동 형변환을 이용한 SQL Injection 및 인증 우회**

* [MisconFlag](./dreamhack/web/bronze/bronze-3/misconflag/misconflag.md) - **Dockerfile 웹 루트 설정 결함(Misconfiguration)을 이용한 민감 파일 직접 접근 및 검증 로직 우회**

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

* [403 Forbidden](./dreamhack/web/bronze/bronze-4/403-forbbiden/403-forbbiden.md) - **클라이언트 전송 데이터 검증 미흡을 이용한 403 Forbidden 우회 및 플래그 탈취**

* [Broken Buffalo Wings](./dreamhack/web/bronze/bronze-4/broken-buffalo-wings/broken-buffalo-wings.md) - **PHP 출력 버퍼링(Output Buffering) 취약점을 이용한 CSP 우회 및 XSS 공격**

* [Click me!](./dreamhack/web/bronze/bronze-4/click-me/click-me.md) - **자바스크립트 클라이언트 사이드 이벤트 우회 및 DOM 조작을 통한 강제 클릭 트리거**

* [Command Injection Chatgpt](./dreamhack/web/bronze/bronze-4/command-injection-chatgpt/command-injection-chatgpt.md) - **f-string 기반의 OS 명령어 주입 필터링 우회 및 subprocess 취약점 분석**

* [CSRF-2](./dreamhack/web/bronze/bronze-4/csrf-2/csrf-2.md) - **CSRF 취약점을 이용한 관리자 비밀번호 변경 및 계정 탈취**

* [Ctrl-C](./dreamhack/web/bronze/bronze-4/ctrl-c/ctrl-c.md) - **프록시를 이용한 클라이언트 사이드 복사 제한 우회 및 XOR 암호문 복호화**

* [Dalgona (달고나)](./dreamhack/web/bronze/bronze-4/dalgona/dalgona.md) - **HTTP 메소드 조작 및 서버사이드 상태 검증 부재를 이용한 게임 로직 우회 및 플래그 탈취**

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

* [Space (공백)](./dreamhack/web/bronze/bronze-4/space/space.md) - **비가시적 유니코드 제어 문자(LRM) 식별 및 시각적 기만 취약점 우회**

* [Test Your Luck](./dreamhack/web/bronze/bronze-4/test-your-luck/test-your-luck.md) - **검증 로직의 횟수 제한(Rate Limiting) 부재를 이용한 자동화 브루트 포스 공격**

* [Whoami](./dreamhack/web/bronze/bronze-4/whoami/whoami.md) - **HTTP X-Forwarded-For 헤더 변조 및 Express 내부 IP 검증 로직 우회를 통한 관리자 권한 및 플래그 획득**

</details>
</ul>
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

</ul>
</details>

<details>
<summary><h2>🏆 Dreamhack CTF (시즌 대회)</h2></summary>
<ul style="list-style-type: none;">

<details>
<summary><h3>📅 2026년 시즌</h3></summary>
<ul>

<details>
<summary><h4>Season 8 Round #5 (All-Round)</h4></summary>

* `[Pwnable]` `[Gold 2]` [Product Manager](./dreamhack/ctf/season8-round5/pwnable/product-manager/product-manager.md) - **Off-by-One 취약점을 이용한 GOT Overwrite 및 셸 획득**

* `[Reversing]` `[Gold 1]` [Sticks](./dreamhack/ctf/season8-round5/reversing/sticks/sticks.md) - **바이너리 역공학을 통한 하노이의 탑 알고리즘 분석 및 자동화 스크립트 구현**

* `[Web]` `[Silver 1]` [Suggestion Box](./dreamhack/ctf/season8-round5/web/suggestion-box/suggestion-box.md) - **Object Injection을 이용한 DB 검증 로직 우회 및 비공개 데이터 탈취**

</details>

</ul>
</details>

</ul>
</details>
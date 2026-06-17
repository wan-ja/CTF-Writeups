# [Dreamhack] R-XOR-T - Reversing

## 1. 문제 개요

* **문제 링크:** [Dreamhack - r-xor-t](https://dreamhack.io/wargame/challenges/901)

* **분야:** Reversing

* **목표:** 제공된 ELF 바이너리의 다중 암호화(비트 마스킹, 배열 역순, XOR) 로직을 정적 분석하고, 도출한 알고리즘을 바탕으로 역연산 파이썬 스크립트를 작성하여 원본 입력값(FLAG) 복구.

## 2. 취약점 분석
제공된 ELF 바이너리 파일(`chall`)을 Ghidra로 디컴파일하여 분석한 결과, 64바이트의 사용자 입력값을 받은 후 3단계에 걸친 연산을 수행하고 데이터 영역의 값과 비교하는 구조 파악.

```c
// ... (중략) ...

  if (sVar2 == 0x40) {
    for (local_c = 0; local_c < 0x40; local_c = local_c + 1) {
      (&rot)[local_c] = input[local_c] + 0xd & 0x7f;
    }
    result[0] = DAT_001040df;
    for (local_10 = 1; local_10 < 0x3f; local_10 = local_10 + 1) {
      result[local_10] = (&rot)[0x3f - local_10];
    }
    result[0x3f] = rot;
    for (local_14 = 0; local_14 < 0x41; local_14 = local_14 + 1) {
      result2[local_14] = result[local_14] ^ 3;
    }
  }
  iVar1 = strncmp(result2,"C@qpl==Bppl@<=pG<>@l>@Blsp<@l@AArqmGr=B@A>q@@B=GEsmC@ArBmAGlA=@q",0x40);

// ... (중략) ...
```

* **분석 결론:** 64바이트 고정 길이의 입력값에 대해 덧셈 및 비트 마스킹, 배열 인덱스 역순 배치, XOR 연산을 순차적으로 수행. 연산에 사용되는 기댓값 및 최종 비교 대상 문자열이 메모리 영역에 평문으로 하드코딩되어 있으므로, 연산의 역순을 취해 파이썬 복호화 스크립트 작성 가능.

## 3. 공격 수행

1. Ghidra를 통한 `main` 함수의 전체적인 3단계 암호화 흐름 및 최종 타겟 데이터 문자열(`C@qpl...`) 확인.

![main 함수 흐름 확인](./images/01-main.png)

2. 64바이트 입력값에 대한 암호화 로직(덧셈 연산 후 마스킹 -> 인덱스 기반 배열 뒤집기 -> XOR 3 연산) 구조 파악.

3. 파이썬을 활용하여 분석한 정방향 암호화 함수의 연산 순서를 거꾸로 뒤집어(XOR -> 배열 원상복구 -> 뺄셈 연산) 복호화 로직을 수행하는 익스플로잇 스크립트 작성.

```python
result2_str = "C@qpl==Bppl@<=pG<>@l>@Blsp<@l@AArqmGr=B@A>q@@B=GEsmC@ArBmAGlA=@q"

result2 = []
for i in result2_str:
    result2.append(ord(i))

result = []
for i in range(64):
    result.append(result2[i] ^ 3)

rot = []
for i in range(64):
    rot.append(result[63 - i])

flag = []
for i in range(64):
    flag.append((rot[i] - 0xd) & 0x7f)

flag_str = ""
for i in range(64):
    flag_str += chr(flag[i])

print(flag_str)
```

4. 작성한 파이썬 스크립트 실행 후 터미널 콘솔을 통해 정상적으로 암호화가 해제된 플래그 문자열 출력 확인.

![터미널 실행 및 플래그 획득](./images/02-flag.png)

## 4. 획득 결과
도출된 역연산 스크립트를 통해 생성된 바이트 값을 문자열로 디코딩하여 최종 플래그 식별 성공.

* **FLAG:** `e615b75a4d563ac971466e05641d7aed556b62fcb460b6027f126bff411bfe63`

## 5. 대응 방안
프로그램 내에서 중요한 인증 키나 라이선스 데이터를 검증할 때, 데이터가 손쉽게 리버싱되어 역추적되는 것을 방지하기 위해 프로그램 소스코드 단에 다음과 같은 시큐어 코딩 조치 적용.

* **하드코딩된 타겟 문자열 지양:** 비교 대상이 되는 최종 암호문 데이터를 바이너리의 데이터 영역에 평문 형태로 하드코딩하는 것을 금지. 사용자 입력값을 검증할 때 SHA-256과 같은 단방향 해시 함수를 통해 원본 노출을 막고 해시값 자체를 비교하는 구조로 설계.

* **강력한 표준 암호화 알고리즘 도입:** 단순한 1바이트 덧셈, 비트 마스킹, XOR, 배열 뒤집기의 조합은 정적 분석 및 파이썬을 통한 솔버(Solver)를 이용해 역추적이 매우 쉬움. 검증 로직 구현 시 AES-256과 같이 보안성이 검증된 산업 표준 대칭키 암호화 알고리즘(OpenSSL 라이브러리 등) 활용 권장.

## 6. 블루팀 관점 요약

### 6.1. 탐지 및 분석 한계
* **네트워크 행위 없음:** 해당 프로그램은 오프라인에서 검증 로직을 수행하는 단독 실행형 바이너리로 동작하므로, 외부 C2(명령 및 제어) 서버와의 통신이 일절 발생하지 않음. 따라서 기존의 네트워크 관제 장비(NTA/IPS)로는 침해 시도 및 행위 탐지 불가.

* **대응 방향:** EDR 및 호스트 엔드포인트 보안 모니터링 체계를 통해 의심스러운 실행 파일의 덤프 행위나 디버깅 툴(Ghidra, x64dbg) 프로세스 접근 이력 모니터링 필요. 또한 역공학 분석을 통해 확보된 정적 정보(시그니처, 문자열)를 바탕으로 파일 기반의 패턴 매칭 탐지 규칙 생성 요구.

### 6.2. YARA 탐지 룰 (IoC)
바이너리 정적 분석 과정에서 식별된 하드코딩 타겟 문자열 및 성공/실패 시 출력되는 주요 문자열을 활용한 정적 탐지 룰 제안.

```yara
rule Detect_rxort {
    strings:
        // 하드코딩된 비교 타겟 문자열
        $target_str = "C@qpl==Bppl@<=pG<>@l>@Blsp<@l@AArqmGr=B@A>q@@B=GEsmC@ArBmAGlA=@q" ascii
        
        // 대상 파일의 주요 출력 문자열
        $s1 = "Input: " ascii
        $s2 = "Nice!" ascii
        $s3 = "Flag is DH{%s}" ascii
        
    condition:
        // 타겟 문자열이 존재하거나 텍스트 조합 시 탐지
        $target_str or 2 of ($s*)
}
```
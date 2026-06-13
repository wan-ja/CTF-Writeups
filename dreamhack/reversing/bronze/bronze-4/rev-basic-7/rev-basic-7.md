# [DreamHack] Rev-Basic-7 - Reversing

## 1. 문제 개요

* **문제 링크:** [DreamHack - rev-basic-7](https://dreamhack.io/wargame/challenges/21)

* **분야:** Reversing

* **목표:** 프로그램의 입력값 검증 로직(비트 순환 시프트 및 XOR 연산)을 역산하여 'Correct'를 출력하게 만드는 올바른 플래그 문자열 도출.

## 2. 취약점 분석
제공된 PE 바이너리(`chall7.exe`)를 Ghidra로 디컴파일하여 분석한 결과, 사용자 입력값에 대해 인덱스 기반의 왼쪽 비트 순환 시프트(ROL) 및 XOR 연산을 수행한 후 하드코딩된 타겟 배열과 비교하는 검증 로직 파악.

```c
// ... (중략) ...
undefined8 check_flag(longlong param_1)
{
  byte bVar1;
  uint local_18;

  local_18 = 0;
  while( true ) {
    if (0x1e < local_18) {
      return 1;
    }
    bVar1 = (byte)local_18 & 7;
    if (((byte)(*(byte *)(param_1 + (int)local_18) << bVar1 |
           *(byte *)(param_1 + (int)local_18) >> 8 - bVar1) ^ local_18) !=
        (uint)(byte)(&DAT_140003000)[(int)local_18]) break;
    local_18 = local_18 + 1;
  }
  return 0;
}
// ... (중략) ...
```

* **분석 결론:** 사용자의 입력값 각 문자에 대해 `i & 7` 횟수만큼 왼쪽 순환 시프트(ROL)를 수행하고 인덱스 값 `i`와 XOR 연산 수행. 이후 메모리에 하드코딩된 타겟 배열(`DAT_140003000`)의 데이터와 비교. 연산의 역과정(XOR 및 오른쪽 순환 시프트 ROR)을 순차적으로 적용하여 원본 플래그 복원 가능.

## 3. 공격 수행

1. Ghidra를 통해 `main` 함수 로직 파악 및 내부 주요 함수로의 데이터 흐름 분석 진행.

![main 함수 로직 파악](./images/01-main.png)

2. 검증 로직인 `check_flag` 함수에서 입력값을 활용하여 연산을 수행하고 메모리 배열의 값을 참조하는 주요 원리 확인.

![check_flag 검증 로직 확인](./images/02-check_flag.png)

3. 메모리에 하드코딩된 31바이트 길이의 16진수 타겟 데이터(`DAT_140003000`) 추적 및 기록.

![메모리 확인](./images/03-memory.png)

4. 파이썬을 활용하여 타겟 데이터에 XOR 역연산 및 ROR(오른쪽 순환 시프트) 역연산을 수행하는 익스플로잇 스크립트 작성 및 실행.

```python
hex_code = "52dfb360f18b1cb557d19f384b29d9267fc9a3e953184fb86acb87585b391e"
target_bytes = bytes.fromhex(hex_code)

flag_bytes = bytearray()

for i in range(len(target_bytes)):
    bVar1 = i & 7
    X = target_bytes[i] ^ i
    
    flag = (X >> bVar1) | ((X << (8 - bVar1)) & 0xFF)
    flag_bytes.append(flag)

result = flag_bytes.decode()
print(f"DH{{{result}}}")
```

## 4. 획득 결과
도출된 로직을 바탕으로 파이썬 스크립트를 실행하여 플래그 복원 성공 및 검증 통과 확인.

![플래그 획득](./images/04-flag.png)

* **FLAG:** `DH{Roll_the_left!_Roll_the_right!}`

## 5. 대응 방안
프로그램 검증 로직의 주요 타겟 데이터 노출 및 가역적인 단순 비트 연산 취약점을 방지하기 위해 프로그램 소스코드 단에 대한 시큐어 코딩 조치 적용.

* **단방향 해시 알고리즘 적용:** 검증 로직에 역추적이 쉬운 단순 비트 연산(ROL, XOR) 대신, PBKDF2나 SHA-256과 같은 단방향 해시 알고리즘을 사용하여 입력값 검증.

* **데이터 난독화 및 패킹 적용:** 하드코딩된 비교 배열 데이터를 디스어셈블러에서 쉽게 식별 및 추출하지 못하도록 데이터 난독화 기법을 적용하거나, 실행 압축을 통해 정적 분석 난이도 상승 유도.

## 6. 블루팀 관점 요약

### 6.1. 탐지 및 분석 한계
* **네트워크 행위 없음:** 외부 C2 통신이 없는 단독 실행형 파일이므로 네트워크 장비(IPS/WAF)로는 탐지 불가.

* **대응 방향:** EDR이나 백신 등 엔드포인트(호스트) 단에서 내부 시그니처를 기반으로 탐지 수행.

### 6.2. YARA 탐지 룰 (IoC)
분석으로 확보한 고유 16진수 바이트 배열(타겟 데이터) 및 성공 문자열을 활용한 탐지 룰 제안.

```yara
rule Detect_Rev_Basic_7 {
    strings:
        // 하드코딩된 검증 타겟 배열의 앞부분 16바이트 시그니처
        $hex_target = { 52 DF B3 60 F1 8B 1C B5 57 D1 9F 38 4B 29 D9 26 }
        $success_str = "Correct"
    condition:
        any of them
}
```
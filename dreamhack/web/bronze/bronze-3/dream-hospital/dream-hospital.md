# [DreamHack] Dream Hospital (드림 병원 🌱) - Web Hacking

## 1. 문제 개요

* **문제 링크:** [Dreamhack - 드림 병원 🌱](https://dreamhack.io/wargame/challenges/2814)

* **분야:** Web

* **목표:** IDOR(안전하지 않은 직접 객체 참조) 취약점을 이용하여 `admin` 계정의 객체(리포트)에 접근하고 플래그 획득.

## 2. 취약점 분석
제공된 `app.py` 소스 코드를 분석한 결과, 리포트를 조회하는 라우트와 다운로드하는 라우트 간의 권한 검증 로직에 차이가 있음을 확인.

```python
health_records = {
    1: {"name": "김깃발", ...(중략)...,"summary": "DH{This_is_fake_flag}", "owner": "admin"},
    125: {"name": "김드림", ...(중략)... "owner": "guest"}
}

@app.route('/auth/login', methods=['POST']) 
def login():
    if request.form.get('username') == 'guest' and request.form.get('password') == 'guest': # guest 로그인
        session['user'] = 'guest'
        return redirect(url_for('dashboard'))

def get_hash(uid):
    return hashlib.md5(str(uid).encode()).hexdigest() # uid가 hashlib.md5로 해시화되는 구조라 예측 가능한 정수 입력값이면 로컬에서 직접 계산 가능

@app.route('/dashboard')
def dashboard():
    # ... (중략) ...
    return render_template('dashboard.html', user_hash=get_hash(125), name=user_data['name'])

@app.route('/report/view/<user_hash>')
def view_report(user_hash):
    # ... (중략) ...
    for uid, data in health_records.items():
        if get_hash(uid) == user_hash:
            # 조회 페이지: 소유자와 현재 로그인 세션 비교 검증 존재
            if data['owner'] != session['user']:
                return "<h1>Access Denied</h1>", 403
            return render_template('report.html', data=data, user_hash=user_hash)
    # ... (중략) ...

@app.route('/report/download/<user_hash>')
def download_report(user_hash):
    if 'user' not in session:
        return redirect(url_for('index'))

    for uid, data in health_records.items():
        if get_hash(uid) == user_hash:
            # [!] 취약점 발생: 다운로드 페이지는 본인 데이터인지 확인하는 인가 로직 누락
            return render_template('print.html', data=data)
    # ... (중략) ...
```

* **분석 결론:** `/report/view` 라우트에는 타인의 데이터 접근을 막는 검증(`data['owner'] != session['user']`)이 존재하지만, `/report/download` 라우트에는 해당 로직이 누락됨. 이를 통해 타인의 해시값만 알아내면 권한 없이 데이터를 열람할 수 있는 **IDOR(Insecure Direct Object Reference)** 취약점 존재 확인.

## 3. 공격 수행
Burp Suite를 활용하여 세션 획득부터 취약점이 존재하는 엔드포인트에 페이로드를 전송하기까지의 과정을 순차적으로 진행.

1. `guest` 계정(`username=guest`, `password=guest`)을 사용하여 로그인 요청 전송 및 세션 쿠키 획득.

![로그인 요청 및 302 리다이렉트](./images/01-login.png)

2. 획득한 세션을 바탕으로 `/dashboard` 로 이동하여 정상적으로 계정에 접속된 상태 확인 후, 하단의 '최신 건강검진 리포트 확인'버튼 클릭

![대시보드 접속 화면](./images/02-dashboard.png)

3. 대시보드에서 본인의 상세 리포트 페이지(`/report/view/<guest_hash>`)로 이동 후, 하단의 '결과표 인쇄/다운로드' 버튼 클릭.

![상세 리포트 페이지](./images/03-report.png)

4. 버튼 클릭 시 이동하는 `/report/download/<guest_hash>` 경로로 요청 전송. 서버 응답을 통해 검진 결과표 인쇄 페이지가 정상 출력됨을 확인.

![다운로드 라우트 정상 접근](./images/04-download.png)

5. 해당 경로(`/report/download/`)에 권한 검증이 누락된 취약점을 악용. 타겟인 `admin`(uid: 1)의 해시값인 `get_hash(1)`의 결과(`c4ca4238a0b923820dcc509a6f75849b`)를 파라미터에 삽입하여 요청 전송. 타인의 객체 참조에 성공하여 결과 화면에 플래그 노출.
```python
import hashlib
print(hashlib.md5(str(1).encode()).hexdigest())
# c4ca4238a0b923820dcc509a6f75849b
```

![해시값 변조 및 플래그 획득](./images/05-exploit_flag.png)

## 4. 획득 결과
Burp Suite의 Response 탭 확인 결과, IDOR 취약점을 통해 `admin` 소유의 데이터를 조회하여 숨겨진 플래그 획득.

* **FLAG:** `DH{1f8c49b31d252c952a8538b4af4d7c38c3c81ce0bc64d72d0c01faee70516a0b}`

## 5. 대응 방안
웹 애플리케이션에서 사용자의 입력값(해시, ID 등)을 통해 직접 객체를 참조할 때는 반드시 해당 객체에 대한 사용자의 접근 권한을 확인하는 과정을 거쳐야 함.

* **인가 검증 추가:** `/report/download` 라우트 내부에도 `/report/view` 라우트와 동일하게 `if data['owner'] != session['user']:` 와 같은 검증 코드를 삽입하여, 요청한 세션의 주인과 데이터의 소유자가 일치할 때만 렌더링되도록 로직 수정.

* **난수화된 식별자 사용:** 순차적인 숫자나 단순 문자열의 MD5 해시 등 유추가 가능한 값 대신, UUID와 같은 강력하고 예측 불가능한 식별자를 사용하여 브루트포스나 유추를 통한 접근 방지.

## 6. 블루팀 관점 요약

보안관제 및 침해사고 대응(IR) 관점에서 IDOR 취약점을 이용한 타 계정 데이터 접근 시도 탐지.

* **WAF 및 웹 서버 로그 분석:** `/report/download/` 엔드포인트에 대한 Access 로그 모니터링 시, 동일 세션(쿠키)이 짧은 시간 내에 서로 다른 다수의 `user_hash` 값으로 반복 요청을 보내는 패턴 식별. 특히 `/report/view` 요청에서 403 응답을 받은 직후 동일한 해시로 `/report/download` 요청이 성공(200)하는 비대칭적 흐름은 검증 우회 시도의 강한 징후.

* **침해사고 대응 (IR) 시나리오:** 특정 세션이 자신의 소유가 아닌 것으로 추정되는 해시값(순차 증가, 사전 유추 등)으로 다운로드 라우트에 반복 접근할 경우 IDOR 시도로 간주. 해당 세션을 즉시 만료 조치하고, 접근된 리포트 데이터의 소유자(`admin` 등 권한 계정 포함 여부) 및 유출 범위 확인.

* **네트워크 기반 탐지 룰 제안 (Snort):** 짧은 시간 내 동일 출발지에서 `/report/download/` 경로로 반복 요청이 발생하는 빈도 기반 패턴 탐지.

```snort
alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS $HTTP_PORTS (msg:"[Web] Possible IDOR - Repeated Report Download Access"; flow:to_server,established; http_method; content:"GET"; http_uri; content:"/report/download/"; detection_filter:track by_src, count 5, seconds 10; sid:1000006; rev:1;)
```
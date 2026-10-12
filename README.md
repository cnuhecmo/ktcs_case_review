# KTCS 중대한 과실 사례집 검토 — Google Sheet 연동본

구성은 기존과 동일하며, `index-linked.html`의 화면·사례·검색·필터 형식은 변경하지 않았습니다.

- `index-linked.html`: 기존 사례집 + 검토 의견 저장 시 Apps Script 웹 앱으로 동시 전송
- `apps-script-Code-linked.gs`: Google Sheet `의견` 시트 수신기
- 시트 소유/설정 계정: **정인석 `isjeong1201@gmail.com` 유지**

## 최초 1회 연결
1. `isjeong1201@gmail.com` 계정의 기존 Google Sheet에서 Apps Script를 엽니다.
2. `apps-script-Code-linked.gs` 내용으로 저장합니다.
3. **배포 > 배포 관리 > 편집 > 새 버전 > 배포**합니다. 실행 사용자는 '나', 액세스 권한은 '모든 사용자'로 둡니다.
4. 배포 후 나온 `https://script.google.com/macros/s/.../exec` 주소를 복사합니다.
5. `index-linked.html`에서 `PASTE_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE` 문자열만 그 주소로 교체합니다.

이후 검토자가 '저장'을 누르면 기존 브라우저/Claude 저장 동작을 유지하면서 Google Sheet의 `의견` 시트에도 한 행이 추가됩니다.


## 최종 저장 시트
- Google Sheet ID: `1iT57TZKFCVzVVfkNHGx7XXCpoecpfAdJ3JIgzK1AoEQ`
- Apps Script는 `SpreadsheetApp.openById(SPREADSHEET_ID)`로 이 시트에 직접 기록합니다.
- 시트 안에 `의견` 탭이 없으면 첫 저장 시 자동으로 생성하고 헤더도 자동 생성합니다.
- HTML 화면/사례/필터 형식은 변경하지 않습니다.

## 남은 1단계
정인석 교수님 Google 계정에서 `apps-script-Code-final.gs`를 Apps Script에 붙여 넣고 웹 앱으로 배포한 뒤, 생성된 `/exec` URL을 `index-final.html`의 `ENDPOINT` 값에 넣습니다.

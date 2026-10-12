/**
 * 중대한 과실 사례집 검토자 의견 수신기 (구글 시트에 기록)
 *
 * 설정
 * 1) isjeong1201@gmail.com 계정으로 구글 시트를 새로 만든다. (이름 예: 사례집 의견)
 * 2) 시트 메뉴 확장 프로그램 > Apps Script 에 이 코드를 붙여 넣고 저장한다.
 * 3) 배포 > 새 배포 > 유형 "웹 앱"
 *      - 다음 사용자로 실행: 나
 *      - 액세스 권한: 모든 사용자
 *    처음 배포할 때 시트 접근 권한을 승인한다.
 * 4) 나오는 URL(…/exec)을 사례집 HTML의 ENDPOINT 값에 붙여 넣는다.
 * 코드를 고친 뒤에는 "배포 관리 > 편집 > 새 버전"으로 다시 배포해야 반영된다.
 */
var SHEET_NAME = '의견';
var HEADERS = ['전송 시각', '사례 번호', '제목', '호', '분과 학회', '결론', '의견', '의견 내용'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var clip = function (v, n) { return String(v == null ? '' : v).slice(0, n); };
    var rec = {
      caseNo: clip(d.caseNo, 10), title: clip(d.title, 200), ho: clip(d.ho, 40),
      society: clip(d.society, 40), conclusion: clip(d.conclusion, 20),
      verdict: clip(d.verdict, 20), comment: clip(d.comment, 4000), at: clip(d.at, 40)
    };
    if (!rec.caseNo || (rec.verdict !== '판단에 동의' && rec.verdict !== '수정 필요')) throw new Error('bad payload');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    // 수식으로 해석되지 않도록 앞에 ' 를 붙여 텍스트로 저장
    var safe = function (v) { return /^[=+\-@]/.test(v) ? "'" + v : v; };
    sh.appendRow([rec.at, rec.caseNo, safe(rec.title), rec.ho, rec.society, rec.conclusion, rec.verdict, safe(rec.comment)]);

    return out({ ok: true });
  } catch (err) {
    return out({ ok: false });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

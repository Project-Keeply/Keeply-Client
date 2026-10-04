# 작업 명세와 로컬 상태 기록

공통 작업 정책은 [AI Development Workflow](../rules/ai-workflow.md)를 따른다.
아래 템플릿을 에이전트가 읽고 명세를 작성한다. 별도 대화 감시·자동 생성
프로그램과 PR 검사기는 아직 없다. 작업 복원은 아래 읽기 전용 명령을 사용한다.

## 작업 복원

```bash
pnpm workflow:resume
pnpm workflow:resume --issue 114
pnpm workflow:resume --json
```

기본적으로 현재 브랜치 끝의 `#{번호}`로 이슈를 찾는다. 번호가 없으면
`--issue`로 지정한다. 현재 저장소 내부에서 직접 `node tools/ai-workflow/resume.mjs`로도
실행할 수 있다. 명세와 상태는 저장소 루트의 정해진 경로에서 읽는다.

결과에는 HEAD·기준 ref/SHA, 명세 목적·완료 조건·미결정 사항, staged/unstaged/untracked
변경, 기준 브랜치 대비 커밋된 변경, 상태의 다음 작업·막힌 사항·검증·리뷰 기록이 포함된다.
JSON 출력에는 명세 본문도 담는다. GitHub API는 조회하지 않으며 저장된 이슈 번호를
찾는 것이므로 이슈의 원격 상태·최신 요구사항은 에이전트가 별도로 확인한다.

상태 부재, 잘못된 JSON/지원하지 않는 형식, 브랜치·이슈·명세 버전 불일치는
경고로 표시하고 실제 Git/명세 정보를 계속 보여준다. 기록을 자동 생성·수정하거나
검증을 실행하지 않는다. 다음 작업이 없으면 명세와 실제 변경을 확인하라고 안내하며
단계나 완료 상태를 추정하지 않는다.

검증·리뷰의 기록상 유효성과 복원 시 판단을 분리한다. HEAD/기준 SHA/명세 버전/
작업 트리 지문/기록된 환경이 모두 같으면 `current`, 다르면 `needs-recheck`,
필수 대상 정보가 없으면 `unknown`으로 표시한다. 유효성은 검사 성공과 별개다.
`current`인 실패도 실패이며, 복원 명령 자체는 PR 준비 완료를 판정하지 않는다.
누락된 기준 ref는 경고하며 fetch나 다른 ref로의 자동 대체는 수행하지 않는다.
정상 복원(경고 포함)은 종료 코드 0, 잘못된 인자·저장소 접근 실패는 1이다.

기능 검증: `pnpm workflow:test` (임시 Git 저장소에서 상태 부재·불일치·변경·읽기 전용 확인).

## 저장 위치

| 파일 | 위치 | 관리 방법 |
|---|---|---|
| 명세 템플릿 | `docs/ai-workflow/templates/spec.md` | Git으로 공유 |
| 상태 템플릿 | `docs/ai-workflow/templates/status.json` | Git으로 공유, 빈 초기값만 포함 |
| 작업 명세 | `docs/ai-workflow/tasks/{issue}/spec.md` | Git으로 공유 |
| 실제 상태 | `.tmp/ai-workflow/tasks/{issue}/status.json` | 로컬 전용, 기존 `.tmp` ignore 규칙 적용 |

[명세 템플릿](templates/spec.md)을 복사하고 이슈별로 채운다.
[상태 템플릿](templates/status.json)은 로컬 경로에 복사한 후 실제 값으로 채운다.
로컬 상태 파일이 없으면 새 기록을 만들되 이전 검증을 통과로 추정하지 않는다.
다른 컴퓨터에서는 명세·GitHub 기록·실제 코드를 읽고 필요한 검증을 다시 한다.
최종 검증·리뷰 결과는 PR에 공유한다. 토큰·비밀값·질문 원문 덤프는 기록하지 않는다.

## 명세 작성과 업데이트

- 메인 에이전트가 사용자와 합의한 현재 설계를 정리한다. 대화 전체를 복사하지 않는다.
- 목적, 포함/제외 범위, 완료 조건, 검증 방법은 필수다. 해당하지 않는 항목은 이유와 함께 N/A로 표시한다.
- 미정인 내용은 추측으로 확정하지 않고 미결정 사항에 둔다. 구현을 막는 사항은 먼저 확인한다.
- 설계 결정에는 로직 배치, 상태·데이터 흐름, 선택 이유를 적는다. 필요한 작업만 API·UI·예외 처리 항목을 확장한다.
- 완료 조건에는 `AC-1`처럼 고정 ID를 부여하고 검증 방법과 연결한다.
  명세의 완료 조건은 요구사항 목록이며 실행 완료 상태는 로컬 기록에서 관리한다.
- 첫 명세의 `specRevision`은 1이다. 범위·설계·완료 조건·검증 방법이 실질적으로 바뀌면
  숫자를 올리고 주요 설계 변경에 이유를 남긴다. 오타·표현 수정만으로 올리지 않는다.
- 이전 설계는 본문에서 정리하고 중요한 변경 이유만 남긴다. Git 커밋 이력도 변경 추적에 사용한다.
- 서브에이전트가 필요성을 발견하면 변경안을 메인 에이전트에 보고한다.
  합의되지 않은 설계와 완료 조건을 임의로 바꾸지 않는다.
- 설계가 바뀌면 관련 검증·리뷰의 재확인 필요 여부도 갱신한다.

## 모든 작업에서 명세를 유지하는 절차

1. 메인 에이전트는 작업 시작·재개 시 연결된 이슈의 명세가 있는지 확인하고 읽는다.
   브랜치에서 이슈를 찾을 수 없으면 대화에서 지정한 이슈를 사용한다.
2. 최초 설계는 `logic-design`으로 정리할 수 있다. 이후 갱신은 특정 스킬 실행을
   요구하지 않는다. 구현·검증·리뷰 중 합의가 바뀌어도 같은 규칙을 적용한다.
3. 사용자와 합의한 변경을 해당 섹션에 반영하고 `specRevision`을 올린다.
   명세 갱신도 요청된 범위에서 수행하며 읽기 전용 요청은 파일을 수정하지 않는다.
4. 미확정 아이디어는 확정된 설계와 구분한다. 기존 결정과 모순되고 결정을
   확정할 수 없으면 질문한다. 단순 개념 질문은 작업 명세에 옮기지 않는다.
5. 로컬 상태가 있으면 최상위 `specRevision`에 새 명세 버전을 반영하고 영향받는 완료 조건·검증·리뷰를
   `needs-recheck`로 표시한다. 검사 결과를 통과로 조작하거나 사용자 기록을 덮어쓰지 않는다.
   기존 검사·리뷰의 `subject.specRevision`은 검사 당시 값으로 보존한다.
   상태가 없으면 영향과 남은 검증을 대화에 보고하고 자동 갱신을 주장하지 않는다.
6. 수정한 명세 경로와 결정, 재확인이 필요한 항목을 짧게 보고한다.

명세가 없으면 연결 이슈와 합의 범위가 있는 설계 작업에서 템플릿으로 생성한다.
이슈 없는 설계는 대화에 정리하고 저장 경로가 정해질 때까지 임의 이슈 번호나
`tasks/null`을 만들지 않는다. 템플릿 원본이나 다른 이슈 명세를 작업 문서로 사용하지 않는다.
큰 책임·상태 구조 변경은 [클라이언트 로직 설계](../rules/logic-architecture.md)를 참조한다.

## 상태 형식

`schemaVersion: 1`은 이 문서에서 정한 기록 형식의 버전이다. 현재 JSON 스키마
파일은 없으며 명령에서 기본 구조를 검사한다. 형식을 바꾸면 코드·문서·템플릿도 함께 갱신한다.
모든 경로는 저장소 기준 상대 경로, 시간은 시간대가 포함된 ISO 8601 문자열이다.
`null`은 미확인/미설정 값이며 성공이나 일치로 인정하지 않는다.

| 필드 | 의미 |
|---|---|
| `issue`, `branch`, `specPath`, `specRevision` | 작업과 읽은 명세 연결 |
| `phase` | `design`, `implementation`, `verification`, `review`, `pr-ready`, `done` 중 현재 단계 |
| `updatedAt` | 마지막 기록 시각, 초기값은 null |
| `nextActions`, `blockers` | 다음 작업과 진행을 막는 사항 |
| `acceptance` | 완료 조건별 상태와 실제 근거 |
| `checks` | 개별 검사 명령·결과·범위·시각·대상 코드 |
| `review` | 리뷰 결과·범위·지적사항·미확인 항목·대상 코드 |
| `reviewHistory` | 이전 리뷰 기록 배열 (기존 상태에서는 생략 가능) |

`acceptance` 항목은 `id`, `status`, `evidence`를 갖는다.
상태는 `pending`, `met`, `not-met`, `needs-recheck`다. 완료 조건을 수정하거나
관련 구현이 바뀌면 `met`를 그대로 유지하지 말고 `needs-recheck`로 바꾼다.

`checks` 항목은 아래 구조를 사용한다. 실행하지 않은 검사에는 실행 결과나
시각을 만들지 않는다. N/A에는 적용되지 않는 이유를 적는다.

```json
{
  "id": "typecheck",
  "command": "pnpm check-types",
  "result": "not-run",
  "freshness": "unknown",
  "scope": ["애플리케이션 타입"],
  "checkedAt": null,
  "subject": null,
  "reason": "아직 실행하지 않음",
  "evidence": []
}
```

검사 결과는 `passed`, `failed`, `not-run`, `not-applicable`이고,
유효성은 `current`, `needs-recheck`, `unknown`이다.
재검증 시 이전 검사 결과를 덮어써 성공으로 바꾸지 말고 새 실행 항목을 추가한다.

검사·리뷰 시점의 `subject`는 다음 구조다. 기준 ref뿐 아니라 실제 기준 SHA,
HEAD, 추적/비추적 파일 내용의 상태를 구분해야 한다.

```json
{
  "headSha": null,
  "baseRef": "origin/develop",
  "baseSha": null,
  "worktreeFingerprint": null,
  "specRevision": 1,
  "environment": null
}
```

`worktreeFingerprint`는 Git 추적 파일과 ignore되지 않은 새 파일의 경로·내용·
실행 권한·심볼릭 링크 대상, index의 staged 상태로 계산한 SHA-256 값이다.
ignored 파일은 제외하며 외부 심볼릭 링크의 내용은 읽지 않는다.
Git submodule은 이 구현에서 지원하지 않으며 증적 수집을 중단한다.
파일 수와 이름만 같아도 내용이 바뀌면 지문이 달라진다. 삭제·stage·새 파일도 반영된다.
`environment`는 Node 버전·OS/아키텍처·pnpm 버전·설치 상태 파일의 해시를 기록한다.
환경변수·외부 API·DB 상태·ignored 파일 변화는 감지하지 않으므로 실행 환경에
의존하는 검증은 별도 확인한다. 그 한계를 근거로 자동 실행 성공을 보장하지 않는다.

## 검사와 리뷰 증적 기록

```bash
pnpm workflow:check --script lint
pnpm workflow:check --script check-types
pnpm workflow:check --script build
pnpm workflow:check --script workflow:test
pnpm workflow:review --start
pnpm workflow:review --input .tmp/ai-workflow/tasks/114/reviews/{세션}/input.json
```

각 명령은 현재 브랜치 이슈를 사용한다. `--issue {번호}`, `--base {ref}`로 지정할 수
있지만 브랜치 이슈와 충돌하면 기록을 중단한다. 명세·기준 ref가 없거나 상태가
손상/다른 작업에 연결됐으면 덮어쓰지 않고 오류를 알린다. 상태가 없으면 빈 초기
기록으로 만들며 기존 완료 조건을 통과로 추정하지 않는다. 리뷰 시작만으로는
상태 파일을 저장하지 않으며 실제 결과 저장 시 생성한다. `.tmp`는 Git ignore되어야 한다.

검사 명령은 `lint`, `check-types`, `build`, `workflow:test`만 실행한다.
실제 종료 코드·출력 로그·검사 전후 코드 상태를 저장한다. 실행 실패도 기록하고
실패 종료 코드를 반환한다. 실행 중 코드가 바뀌면 성공해도 재확인 대상으로 남긴다.
새 검사 실행은 이전 기록에 추가하며 실패 로그는 지우지 않는다.
검사 로그에는 프로그램 출력이 그대로 들어가므로 민감값 출력은 검사 코드에서 피한다.

리뷰 시작은 diff·staged/unstaged·새 파일 목록 및 patch와 대상 스냅샷을 저장하고
입력 파일 경로를 출력한다. AI가 실제 리뷰 후 입력 파일의 `result`, `focusPoints`,
`findings`, `unverified`, `nextActions`를 작성하고 저장 명령을 실행한다.
초기 result는 `not-run`이므로 그대로 저장하면 오류다. `subject`와 `scope`는 시작
시점의 값으로 유지한다. 입력은 생성한 세션 경로에서만 받는다.

리뷰 파일은 `no-blocking-findings` 또는 `changes-required`를 사용한다.
High/Medium의 open/accepted 결함이 있으면 결과는 `changes-required`여야 한다.
지적에는 고정 ID, 심각도, 파일·줄, 설명, 상태, 해결 근거를 포함한다.
수정 후 새 세션에서 재리뷰하고 같은 ID의 해결 여부와 근거를 기록한다.
미확인 범위는 숨기지 않는다. 명령은 AI 판단을 저장하며 자동으로 코드를 리뷰하지 않는다.

리뷰 저장 시 코드가 바뀌었으면 당시 결과는 보존하되 현재 유효성은 재확인으로
기록한다. 이전 리뷰는 `reviewHistory`에 보관하고 `review`는 최신 결과다.
기록 명령은 state 파일 충돌을 막는 로컬 lock과 임시 파일 rename을 사용한다.
중단으로 lock이 남으면 다른 기록 작업이 끝났는지 확인한 뒤 수동 정리한다.
복원은 lock을 만들거나 유효성 필드를 파일에 덮어쓰지 않고 실제 상태와 비교한다.
완료 조건 자동 판정과 PR 준비 검사기는 아직 없다.

`review.result`는 `not-run`, `changes-required`, `no-blocking-findings` 중 하나다.
`review.scope`는 수집한 대상 경로 목록이며 제외·미확인 범위는 `unverified`에 적는다.
`focusPoints`가 비어 있으면 기본 기준을 쓴다.
지적사항은 `id`, `severity`(High/Medium/Low), `file`, `line`, `description`,
`status`(open/resolved/accepted), `resolution`을 기록한다.
High/Medium이 남거나 미확인 범위가 필요한 완료 조건에 영향을 주면 준비 완료로 표시하지 않는다.
예외 수용은 해결이나 검증 통과가 아니며 승인 범위와 이유를 `resolution`에 남긴다.

## 갱신 책임과 단계 전환

메인 에이전트가 서브에이전트의 근거를 확인하고 상태 파일을 갱신한다.
여러 에이전트가 같은 상태 파일을 동시에 수정하지 않는다.

1. 명세 합의 후 `implementation`으로 진행한다.
2. 구현 후 실제 검사 결과를 기록한다. 필요한 검사 실패·미실행은 남은 작업으로 둔다.
3. 리뷰 결과와 수정 필요 사항을 기록하고 수정 시 관련 결과를 재확인한다.
4. 필요한 검사·완료 조건·리뷰가 현재 변경에 유효할 때 `pr-ready`로 표시한다.
5. `phase` 값만으로 PR 준비를 증명하지 않는다. 향후 검사기는 실제 Git 상태와 기록을 함께 확인해야 한다.
6. `done`은 PR 생성 시점이 아니라 이슈 완료 조건과 팀의 완료 처리를 확인한 뒤 사용한다.

로컬 파일은 작업이 끝나도 자동 삭제하지 않는다. 필요할 때 직접 정리할 수 있으며,
삭제하면 로컬 증적은 사라진다. 미구현 기능을 수행한 것으로 기록하지 않는다.

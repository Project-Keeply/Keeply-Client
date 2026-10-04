# 작업 명세와 로컬 상태 기록

공통 작업 정책은 [AI Development Workflow](../rules/ai-workflow.md)를 따른다.
아래 템플릿은 기록 형식이며 자동 생성·복원·PR 검사기는 아직 없다.

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

## 상태 형식

`schemaVersion: 1`은 이 문서에서 정한 기록 형식의 버전이다. 현재 JSON 스키마
검증기는 없으므로 형식을 바꾸면 문서와 템플릿도 함께 갱신한다.
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

`worktreeFingerprint`의 계산은 후속 증적 연결 단계에서 구현한다.
현재는 대상 파일·내용을 직접 확인하며 지문을 지어내지 않는다.
지문이 없거나 대상 일치를 확인할 수 없으면 자동 PR 준비 판정에 사용할 수 없다.
환경 변경도 관련 검증의 유효성에 영향을 준다. `environment`는 사용한 런타임·
환경의 비밀값 없는 요약이며 자동 수집 형식은 후속 단계에서 정한다.

`review.result`는 `not-run`, `changes-required`, `no-blocking-findings` 중 하나다.
`review.scope`는 포함한 경로와 제외 범위를 설명하고, `focusPoints`가 비어 있으면 기본 기준을 쓴다.
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

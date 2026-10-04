---
name: create-pr
description: 현재 브랜치를 푸시하고 gh CLI로 diff를 분석해 한국어 PR 설명을 자동 생성/업데이트하는 스킬. "PR 만들어줘", "PR 설명 작성", "PR description 써줘", "PR 올려야 하는데", "create-pr" 등의 요청에 반드시 이 스킬을 사용한다.
---

# create-pr 스킬

실제 로컬 diff에서 한국어 PR 제목·본문을 준비하고 승인된 게시를 수행한다.

**읽기 전용 초안 요청:** “PR 설명 써줘”처럼 본문 초안만 요청했다면
기준/대상 diff를 확인하고 Step 3~4까지만 수행한다. 기본 브랜치나 명세·상태
부재도 초안 작성을 막지 않으며 준비 검사 결과와 확인 못 한 항목을 표시한다.
원격 인증/조회·push·PR create/edit를 초안 요청의 권한으로 추정하지 않는다.
아래 브랜치/준비 상태 조건은 실제 게시 준비에 적용한다.

Apply [AI Development Workflow](../../../docs/rules/ai-workflow.md) for task-specific
entry conditions, approval scope, and revalidation. Use information and authorization
already provided; ask only for missing decisions. Conditional preview steps below
apply when the exact action and scope have not already been approved.

---

## Step 1: 로컬 작업과 기준 확인

[Preflight](../../checklists/preflight.md)를 적용하고 `pnpm workflow:resume`으로
명세·실제 Git 상태·기존 권한을 읽는다. 현재 작업 브랜치와 이슈를 확인한다.
`main`/`develop`/detached HEAD에서 게시 준비를 진행하지 않는다.
읽기 전용 초안은 요청된 변경과 기준을 확인하고 제한을 표시해 작성할 수 있다.
기능 작업의 기본 기준 ref는 `origin/develop`이다. 실제 존재를 확인하고
없으면 대상 기준을 확인한다. `main`/`master`로 임의 대체하지 않는다.
사용자가 명시한 다른 기준이 있으면 해당 ref를 사용한다.
로컬 ref의 원격 최신 여부를 확인하지 못하면 한계에 남긴다.
`BASE_REF`는 로컬 비교용 명시 ref, `BASE_BRANCH`는 그 ref에 대응하는 실제
GitHub 대상 브랜치다. 대응 관계를 추측하지 않는다.

## Step 2: 읽기 전용 PR 준비 검사

```bash
pnpm workflow:pr-check --issue {ISSUE_NUMBER} --base {BASE_REF} --json
```

모든 PR은 `workflow:harness-check`의 현재 성공/실제 로그를 요구한다.
누락 시 `pnpm workflow:check --script workflow:harness-check`로 실행·기록한다.
문서 전용 앱 검사 N/A도 이 공통 검사를 대체하지 않는다.

[Task Records](../../../docs/ai-workflow/README.md)의 규칙과 출력된 이유/다음
조치를 확인한다. ready는 기술 준비이며 게시 권한을 뜻하지 않는다.
blocked면 이미 승인된 범위의 보완·검증·리뷰를 수행한다. 미커밋 변경은
자동 stage/commit하지 않는다. 상태 phase나 성공 표시를 조작하지 않는다.
해결하지 못한 항목을 예외로 게시하려면 공통 정책에 따라 구체적 차단 이유,
미확인 범위, 필요한 다음 확인과 사용자 게시 권한을 별도로 기록하고
본문에 공개한다. 예외를 검사 통과나 검증 완료로 표현하지 않는다.

## Step 3: 로컬 diff 분석과 제목 준비

push보다 먼저 실제 로컬 변경으로 내용을 작성한다.

```bash
git log {BASE_REF}..HEAD --oneline
git diff {BASE_REF}...HEAD --name-status
git diff {BASE_REF}...HEAD
```

전체 diff를 읽는다. 파일 30개 이상 등 큰 변경은 stat·파일·커밋 목록과 핵심
부분 diff를 조합하고 요약한 범위·읽지 못한 부분을 본문에 명시한다.
사용자가 정한 제목·중점 내용을 재사용한다. 없으면 diff와 이슈에서 제목을
작성한다. 제목은 Git Convention의 `[Type] description` 또는
`Type(scope): description`을 따른다. 반드시 필요한 결정만 질문한다.

## Step 4: PR 본문 초안 준비

아래 Step 7의 본문 규칙을 먼저 적용해 `/tmp/pr-body.md`에 실제 내용을 저장한다.
실제 검증 명령/성공·실패·N/A/대상, 리뷰 기준·범위·결과, 미확인 환경과
예외 승인 내용을 포함한다. 추측으로 검증 완료를 표시하지 않는다.

## Step 5: 게시 단계 메타데이터 확인

로컬 내용이 준비된 뒤 `gh --version`, `gh auth status`로 게시 환경을 확인한다.
설치/인증이 없으면 초안을 보존하고 필요한 설치/로그인을 안내한다.

```bash
gh pr list --head {CURRENT_BRANCH} --json number,url,state
```

기존 PR이 있으면 번호/URL과 본문을 읽고 이번 변경 범위를 초안에 반영한다.
기존 본문 전체 교체 권한은 별도 범위로 확인하며 이전 승인을 재사용한다.
아직 push하지 않는다.

## Step 6: 외부 작업 직전 구체적 프리뷰와 권한

Step 8의 프리뷰를 **push 전에** 보여준다. 대상 저장소·head/base·실제 제목/본문,
push 및 PR 생성/수정 범위, 준비 검사 결과와 예외를 함께 확인한다.
구체적 권한이 이미 있으면 같은 승인을 반복 요청하지 않는다.
미승인 외부 작업은 이 구체적 프리뷰를 준비한 뒤에만 권한을 확인한다.
그 뒤 Step 9의 push와 생성/수정을 진행한다.

---

## Step 7: PR 본문 생성

`.github/pull_request_template.md`의 구조를 그대로 사용한다.

**작성 원칙:**
- **Summary:** `PR_TITLE`의 목적을 기반으로 한 줄 요약. `ISSUE_NUMBER`가 있으면 첫 줄에 `Closes #{ISSUE_NUMBER}` 추가. **`ISSUE_NUMBER=null`이면 `Closes #...` 줄 전체를 제거하여 `Closes #null` 같은 잘못된 이슈 참조가 생기지 않게 한다.**
- **Tasks:** `PR_TITLE`의 목적을 달성하기 위한 항목을 기능/의도 단위로 나열. 파일/함수 단위 금지.
- **To Reviewer:** `PR_FOCUS`가 있으면 최우선으로 상세 기술. diff에서 추론한 설계 결정, 리뷰어가 집중할 부분과 실제 검증·리뷰·한계 포함. PR_FOCUS가 없어도 이 정보가 있으면 섹션을 유지한다.
- **Screenshot:** diff에서 UI 변경(컴포넌트, 스타일, 레이아웃) 감지 시 섹션 유지 + 사용자에게 요청. 감지 안 되면 섹션 삭제.
- **추론 불가 항목:** diff에서 확인하기 어려운 내용은 `[작성 필요]` 플레이스홀더 사용.
- **모노레포:** `apps/`, `packages/`에 걸친 변경이면 영향 범위를 Tasks에 명시.
- **문체 (가독성):** 아래 규칙을 지킨다.
  - **em대시(`—`) 구분선 금지.** "제목 — 설명" 형태 대신 콜론(`:`)을 사용한다. 예) `목록 조회: getNoticeList 연동` (O) / `목록 조회 — getNoticeList 연동` (X)
  - **괄호 안 영어 병기 자제.** `(presigned)`, `(OWNER)`, `(raw axios)`처럼 괄호로 영어를 덧붙이지 않는다. 가독성이 크게 떨어진다. 꼭 필요한 영문 식별자(함수명·타입명 등)는 백틱 코드(`getNoticeList`)로 문장에 자연스럽게 녹여 쓴다.

템플릿 구조를 유지하면서 Tasks/To Reviewer에 실제 검증·리뷰·한계도 기록한다.
아래 템플릿을 채워서 `/tmp/pr-body.md`에 저장한다.

```markdown
## 📌 Summary

Closes #{ISSUE_NUMBER}   <!-- ISSUE_NUMBER가 null이면 이 줄 전체를 제거할 것 -->

{PR_TITLE 기반 한 줄 요약}

## 📚 Tasks

- {완료된 작업 1}
- {완료된 작업 2}

## 👀 To Reviewer

{PR_FOCUS 기반 중점 설명 및 리뷰 포인트}

## 📸 Screenshot

| As-is | To-be |
|-------|-------|
|       |       |

```

**스크린샷 섹션 처리:**
- UI 변경 감지 안 되면 → `## 📸 Screenshot` 섹션 전체 제거
- UI 변경 감지되면 → 테이블 빈 채로 유지 후 사용자에게 요청:
  "UI 변경이 감지됐어요. 스크린샷을 첨부해주시면 PR에 추가해드릴게요 📸"
  → 사용자가 이미지 첨부하면 테이블에 삽입 후 `gh pr edit`으로 본문 업데이트

---

## Step 8: push 전 프리뷰 확인

미승인 상태라면 실제 PR 제목·본문·대상 브랜치를 프리뷰하고 승인받는다.
같은 push 및 PR 게시 범위가 이미 승인됐으면 재확인하지 않는다.
준비 검사 결과·실제 검증·리뷰·한계와 예외도 함께 표시한다.

```
---
📋 PR 프리뷰

제목: {PR_TITLE}
베이스 브랜치: {BASE_BRANCH} ← {CURRENT_BRANCH}
이슈 연결: {Closes #ISSUE_NUMBER | 없음}

본문:
{생성된 PR 본문 전체}
---

이 내용으로 PR을 생성할까요? (승인 / 수정 요청)
```

- **승인** → Step 9로
- **수정 요청** → 사용자 피드백 반영 후 Step 7부터 다시 실행

---

## Step 9: 승인된 push와 PR 생성 또는 업데이트

외부 행동 직전에 코드가 바뀌었으면 준비 검사를 다시 실행하고 초안을 갱신한다.
blocked 항목은 보완 또는 구체적으로 승인된 게시 예외가 필요하다.

```bash
git ls-remote --heads origin {CURRENT_BRANCH}
```

원격 브랜치가 없으면 `git push -u origin {CURRENT_BRANCH}`, 있으면 필요한
새 커밋만 `git push origin {CURRENT_BRANCH}`로 올린다. 실패하면 중단하고
오류를 보고한다. force push, 자동 stage/commit, merge는 수행하지 않는다.


### 9.1 PR이 없는 경우
```bash
gh pr create \
  --base ${BASE_BRANCH} \
  --head ${CURRENT_BRANCH} \
  --title "${PR_TITLE}" \
  --body-file /tmp/pr-body.md
```

### 9.2 PR이 이미 있는 경우

Step 5에서 읽은 기존 본문과 Step 6/8에서 확인한 교체 권한을 사용한다.
승인된 내용을 다시 묻지 않는다. 교체가 승인되지 않았다면 본문 수정은 수행하지 않는다.

```bash
gh pr edit ${EXISTING_PR_NUMBER} \
  --title "${PR_TITLE}" \
  --body-file /tmp/pr-body.md
```

- 성공 시: "✅ PR 생성/업데이트됨: {URL}" 출력
- 실패 시: 에러 메시지 표시 후 수동 생성 안내

---

## 중요 규칙

1. **커밋되지 않은 변경사항은 절대 커밋하거나 스테이징하지 않는다**
2. **PR 본문은 항상 한국어로 작성**
3. **PR 머지는 절대 하지 않는다**
4. **PR 생성/수정 권한과 범위를 확인한다** — 기존 승인은 공통 워크플로우 규칙에 따라 재사용한다
5. **`gh pr diff --name-only`는 사용하지 않는다 — 파일 목록은 항상 `git diff --name-status`로 조회한다**

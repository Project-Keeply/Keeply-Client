# Postflight Checklist

작업 완료 후(착륙 후) 아래 검증을 순서대로 실행합니다.

변경 유형별 검증과 재검증 조건은
[AI Development Workflow](../../docs/rules/ai-workflow.md)를 따른다.
문서·스킬만 변경하면 링크·지침 일관성·diff를 확인하고 앱 검증은 N/A로 표시한다.
하네스 도구 변경은 해당 도구의 정상/실패 동작을 확인한다.

## 1. 코드 품질 검증 (코드 변경 시)

- 명세가 연결된 작업은 `pnpm workflow:check --script lint`,
  `pnpm workflow:check --script check-types`, `pnpm workflow:check --script build`로 실행·기록
- 하네스 스크립트 변경은 `pnpm workflow:check --script workflow:test`로 정상/실패 시나리오 확인
- 미연결 작업이나 명시적 읽기 전용 요청은 일반 `pnpm lint`, `pnpm check-types`,
  `pnpm build` 등을 실행하고 결과를 대화로 보고 (상태 파일 기록 금지)
- 실패 시 원인 파악 후 재시도 (에러 무시 금지)

## 2. 변경 범위 검증

- `git diff --stat`로 변경 규모 확인
- 의도한 파일만 변경됐는지 확인
- 삭제된 코드에 실제 사용처가 없는지 확인

## 3. 컨벤션 준수

- 코딩 컨벤션: docs/rules/coding-convention.md
- Git 컨벤션: docs/rules/git-convention.md

## 4. 문서 영향

- 코드 구조/규칙 변경 시 docs/ 업데이트 필요 여부 확인
- 새 스킬/규칙 추가 시 AGENTS.md 라우팅 업데이트 필요 여부 확인

## 5. UI 변경 관측 (UI 코드 변경 시)

- 브라우저에서 실제 동작 확인
- 골든 패스 + 엣지 케이스 확인
- 확인 못 하면 "확인 못 함"이라고 명시 (성공 주장 금지)

## 원칙

- 변경에 필요한 검증을 임의로 생략하지 않는다. 적용되지 않는 검증은 N/A와 이유를 표시한다.
- 검증 결과는 명확히 (성공/실패/N/A 중 하나)
- 미실행은 성공으로 처리하지 않는다. 명령·대상 코드 상태·미확인 항목을 보고한다.
- 검사 후 코드·의존성·설정·기준 ref가 바뀌면 영향을 받는 검사와 리뷰를 재확인한다.
- 리뷰 수정은 해결 여부와 관련 검증을 다시 확인한다. 승인된 예외도 검증 통과와 구분한다.

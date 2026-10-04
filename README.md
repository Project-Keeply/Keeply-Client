# Keeply-client
알바 공지사항 및 물류 관리를 한 곳에서, Keeply

<img width="1920" height="918" alt="Image" src="https://github.com/user-attachments/assets/cbf6bd7e-b970-4e34-b088-cc1d2bad1cfd" />

<img width="1920" height="454" alt="Image" src="https://github.com/user-attachments/assets/a5a31d94-711f-498e-b5b1-60ec533b0e93" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/a90947df-ca04-425f-8c8a-d0460f73ddaf" />

<img width="1920" height="1407" alt="Image" src="https://github.com/user-attachments/assets/19382afa-8f54-4226-ae50-354807b7c191" />

<img width="1920" height="918" alt="Image" src="https://github.com/user-attachments/assets/50cf8133-1e54-401f-8c83-083c9f779286" />

## AI 작업 하네스

처음 사용할 때는 [AI 워크플로우 사용 안내](docs/ai-workflow/user-guide.md)를 읽는다.

공통 진입점은 [AGENTS.md](AGENTS.md), 작업 정책과 명령은
[AI 워크플로우](docs/rules/ai-workflow.md) 및 [작업 기록](docs/ai-workflow/README.md)을 따른다.
`pnpm workflow:harness-check`는 공유 문서/스킬/명령/템플릿/CI 연결을 읽기 전용으로
검사한다. `pnpm workflow:test`는 정상·오류 시나리오를 검증한다. CI는 의존성 설치 후
두 명령과 lint/check-types/build를 실행한다. 로컬 상태 증적은 CI에서 요구하지 않는다.

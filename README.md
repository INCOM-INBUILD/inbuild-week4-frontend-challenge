# IN:BUILD 프론트엔드 4주차 보완 과제

## 목표

제공된 **Sprint Board**의 기존 코드를 읽고, 실제 사용 중 발생하는 문제를 재현·수정한 뒤 변경 요구사항을 반영하세요. 화면을 새로 만드는 과제가 아니라, **기존 구조를 이해하고 안전하게 고치는 과제**입니다.

## 시작하기

Node.js 20 이상이 필요합니다.

```bash
npm install
npm run dev
```

PowerShell에서 `npm` 실행 정책 오류가 나면 `npm.cmd install`과 `npm.cmd run dev`를 사용하세요.

완성 전 확인:

```bash
npm run build
npm run test:run
```

처음 받은 코드에서는 일부 자동 검사가 실패하는 것이 정상입니다. 과제의 요구사항을 모두 구현하면 통과해야 합니다.

## 1. 기존 코드 디버깅

아래 현상을 모두 재현하고 수정하세요. 단순히 기능을 제거하거나 페이지를 새로 고치는 방식은 인정하지 않습니다.

1. 검색·필터가 적용된 상태에서 작업을 삭제하면, 의도하지 않은 작업이 사라질 수 있습니다.
2. 검색어를 빠르게 바꾸면 최신 입력과 다른 결과가 잠시 표시될 수 있습니다.
3. 새 작업 작성 창을 닫았다가 다시 열면, 이전에 입력하다 만 내용이 남아 있습니다.

## 2. 요구사항 변경 대응

현재 단일 선택 UI를 아래 요구사항으로 바꾸세요.

1. 작업을 여러 개 선택할 수 있어야 합니다.
2. 선택 상태는 새로고침 뒤에도 유지되어야 합니다.
3. 선택된 작업을 삭제하면 선택 목록에서도 즉시 제거되어야 합니다.
4. 상단 안내 영역에는 선택 개수와 선택된 작업 제목을 최대 2개까지 보여주세요. 3개 이상이면 `외 N개` 형식으로 표시합니다.
5. `선택 작업 보기` 버튼을 누르면 선택된 작업만 보이도록 토글하세요. 토글 중에도 검색·상태 필터는 함께 적용됩니다.

## 확인 시나리오

1. `UI`로 검색한 뒤, 가운데 카드만 삭제해 보세요.
2. 검색어를 서로 다른 단어로 빠르게 연속 입력한 뒤 결과를 확인하세요.
3. 새 작업 창에 내용을 입력하고 닫은 뒤 다시 열어 보세요.
4. 서로 다른 상태의 작업 3개를 선택하고 새로고침하세요.
5. 선택한 작업 하나를 삭제하고, 선택 작업 보기와 검색·상태 필터를 함께 사용하세요.

## 제출 방법 — 처음이라면 이 순서대로

제출은 **본인 GitHub 계정의 비공개 저장소**에서 합니다. 이 스타터 저장소를 직접 수정하거나, 다른 사람의 저장소에 코드를 올리지 마세요.

### 1. 내 제출 저장소 만들기

1. GitHub에 로그인한 상태에서 [이 링크](https://github.com/INCOM-INBUILD/inbuild-week4-frontend-challenge/generate)를 엽니다.
2. 화면에서 **Create a new repository**를 선택합니다.
3. `Owner`는 **본인 계정**으로 둡니다.
4. `Repository name`에는 아래처럼 본인 아이디가 포함되게 작성합니다.

   ```text
   inbuild-week4-frontend-challenge-내GitHub아이디
   ```

5. `Visibility`는 반드시 **Private**을 선택합니다.
6. **Create repository**를 누릅니다.

`Use this template` 버튼이 보이지 않는다면, 이 저장소의 **Fork** 버튼을 누른 뒤에도 같은 이름·Private 설정으로 만드세요.

### 2. 담당자를 내 저장소에 초대하기

방금 만든 **내 저장소**에서 다음을 진행합니다.

1. 상단의 **Settings** 탭을 누릅니다.
2. 왼쪽 메뉴의 **Collaborators**를 누릅니다.
3. **Add people**을 누르고 `JoonyoungSeo`를 검색합니다.
4. 초대 대상을 확인한 뒤 초대합니다.

### 3. 내 컴퓨터에 코드 내려받기

처음 한 번만 Git을 설치합니다. Windows 사용자는 **Git for Windows** 설치 후 새 PowerShell 또는 Git Bash 창을 열어 주세요.

1. 내 저장소 화면에서 초록색 **Code** 버튼을 누릅니다.
2. **HTTPS** 주소를 복사합니다.
3. 원하는 폴더에서 아래 명령을 실행합니다. `<내 저장소 주소>`는 방금 복사한 주소로 바꿉니다.

   ```bash
   git clone <내 저장소 주소>
   cd inbuild-week4-frontend-challenge-내GitHub아이디
   ```

4. 프로젝트를 설치하고 실행합니다.

   ```bash
   npm install
   npm run dev
   ```

   PowerShell에서 `npm.ps1` 실행 정책 오류가 나면 아래처럼 실행합니다.

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

### 4. 작업 내용을 GitHub에 올리기

코드를 수정한 뒤, 프로젝트 폴더에서 아래 명령을 순서대로 실행합니다.

```bash
git status
git add .
git commit -m "Fix task board bugs and selection"
git push origin main
```

`git status`는 바뀐 파일을 보여주는 명령입니다. 파일을 수정할 때마다 위의 `add → commit → push` 과정을 반복해도 됩니다. 커밋 메시지는 무엇을 고쳤는지 알 수 있게 작성하세요.

처음 커밋할 때 이름과 이메일을 묻는 오류가 나면, 본인 정보로 한 번만 설정합니다.

```bash
git config --global user.name "본인 이름"
git config --global user.email "GitHub 가입 이메일"
```

### 5. 최종 제출 확인

1. [SUBMISSION.md](./SUBMISSION.md)를 작성하고 반드시 `git add`, `git commit`, `git push`까지 합니다.
2. 내 GitHub 저장소의 **Actions** 탭을 엽니다.
3. 가장 최근 **Verify assignment** 실행 결과가 초록색 체크 표시인지 확인합니다.
4. 초록색 체크가 확인되면 제출 완료입니다. 별도의 Pull Request나 영상 제출은 필요하지 않습니다.

## 제출 기준

- `npm run build`와 `npm run test:run`이 모두 통과해야 합니다.
- `SUBMISSION.md`에는 버그별 재현 절차, 원인, 수정 내용, 확인 방법을 작성해야 합니다.
- 변경 기록이 이해 가능한 단위로 남아 있어야 합니다.
- `.github/workflows/verify.yml`과 `src/App.test.tsx`를 삭제하거나 자동 검사를 우회하면 제출로 인정하지 않습니다.

## 디자인 원칙

모든 아이콘은 `lucide-react`를 사용합니다. 카드·필터·폼의 간격과 계층은 Figma Community의 Simple Design System을 참고해 직접 구현했습니다. UI kit은 Figma Community에서 추가·사용할 수 있는 공식 리소스입니다: [Figma UI kits 안내](https://help.figma.com/hc/en-us/articles/24037724065943-Start-designing-with-UI-kits).

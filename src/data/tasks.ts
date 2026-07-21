export type TaskStatus = 'todo' | 'doing' | 'done'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate: string
  tag: 'UI' | 'API' | 'QA'
}

export const seedTasks: Task[] = [
  { id: 'task-1', title: '검색 결과 Empty state 점검', description: '검색어가 없을 때의 안내 문구를 확인합니다.', status: 'todo', dueDate: '2026-07-23', tag: 'UI' },
  { id: 'task-2', title: '프로필 API 연결', description: '로딩과 실패 상태를 화면에 반영합니다.', status: 'doing', dueDate: '2026-07-22', tag: 'API' },
  { id: 'task-3', title: '온보딩 카드 반응형 확인', description: '768px 이하에서 카드가 한 열로 바뀌는지 확인합니다.', status: 'doing', dueDate: '2026-07-24', tag: 'UI' },
  { id: 'task-4', title: '주문 취소 회귀 테스트', description: '취소 뒤 목록과 카운트가 일치하는지 확인합니다.', status: 'done', dueDate: '2026-07-21', tag: 'QA' },
  { id: 'task-5', title: '에러 배너 문구 검수', description: '네트워크 오류 상황의 안내 문구를 다듬습니다.', status: 'todo', dueDate: '2026-07-25', tag: 'QA' },
]

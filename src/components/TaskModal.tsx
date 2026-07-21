import { useState } from 'react'
import { X } from 'lucide-react'
import type { Task, TaskStatus } from '../data/tasks'

type Props = { isOpen: boolean; onClose: () => void; onSubmit: (task: Omit<Task, 'id'>) => void }

export function TaskModal({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState<Task['tag']>('UI')
  const [status, setStatus] = useState<TaskStatus>('todo')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim() || '설명이 없습니다.', tag, status, dueDate: '2026-07-28' })
    onClose()
  }

  return (
    <div className={`modal-layer ${isOpen ? 'modal-layer--open' : ''}`} aria-hidden={!isOpen}>
      <form className="task-modal" onSubmit={submit}>
        <div className="modal-title"><div><span>NEW TASK</span><h2>새 작업 추가</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="닫기"><X size={20} /></button></div>
        <label>작업 제목<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="예: 결제 모달 예외 처리" /></label>
        <label>설명<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="작업의 맥락을 짧게 적어주세요." /></label>
        <div className="form-row"><label>태그<select value={tag} onChange={(event) => setTag(event.target.value as Task['tag'])}><option>UI</option><option>API</option><option>QA</option></select></label><label>상태<select value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)}><option value="todo">할 일</option><option value="doing">진행 중</option><option value="done">완료</option></select></label></div>
        <button className="primary-button" type="submit">작업 추가</button>
      </form>
    </div>
  )
}

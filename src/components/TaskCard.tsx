import { CalendarDays, CheckCircle2, Circle, LoaderCircle, Trash2 } from 'lucide-react'
import type { Task, TaskStatus } from '../data/tasks'

type Props = {
  task: Task
  position: number
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (position: number) => void
  onStatusChange: (id: string, status: TaskStatus) => void
}

const statusMeta = {
  todo: { label: '할 일', icon: Circle },
  doing: { label: '진행 중', icon: LoaderCircle },
  done: { label: '완료', icon: CheckCircle2 },
}

export function TaskCard({ task, position, isSelected, onSelect, onDelete, onStatusChange }: Props) {
  const meta = statusMeta[task.status]
  const StatusIcon = meta.icon

  return (
    <article className={`task-card ${isSelected ? 'task-card--selected' : ''}`}>
      <div className="task-card__topline">
        <button className="selection-dot" aria-label={`${task.title} 선택`} onClick={() => onSelect(task.id)}>
          {isSelected ? <CheckCircle2 size={19} /> : <Circle size={19} />}
        </button>
        <span className={`tag tag--${task.tag.toLowerCase()}`}>{task.tag}</span>
        <button className="icon-button" aria-label={`${task.title} 삭제`} onClick={() => onDelete(position)}>
          <Trash2 size={17} />
        </button>
      </div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-card__footer">
        <label className="status-select">
          <StatusIcon size={15} />
          <select value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)} aria-label={`${task.title} 상태`}>
            {Object.entries(statusMeta).map(([value, info]) => <option value={value} key={value}>{info.label}</option>)}
          </select>
        </label>
        <span className="due-date"><CalendarDays size={15} /> {task.dueDate.slice(5).replace('-', '.')}</span>
      </div>
    </article>
  )
}

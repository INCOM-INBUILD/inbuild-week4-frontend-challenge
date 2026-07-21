import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Bell, CircleHelp, LayoutDashboard, ListTodo, Plus, Search, Settings, Sparkles } from 'lucide-react'
import { TaskCard } from './components/TaskCard'
import { TaskModal } from './components/TaskModal'
import type { TaskStatus } from './data/tasks'
import { useTaskStore } from './hooks/useTaskStore'

type Filter = 'all' | TaskStatus

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' }, { value: 'todo', label: '할 일' }, { value: 'doing', label: '진행 중' }, { value: 'done', label: '완료' },
]

export default function App() {
  const { tasks, addTask, updateStatus, deleteTask } = useTaskStore()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setAppliedQuery(query), 350)
  }, [query])

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const isInFilter = filter === 'all' || task.status === filter
    const text = `${task.title} ${task.description} ${task.tag}`.toLowerCase()
    return isInFilter && text.includes(appliedQuery.toLowerCase())
  }), [tasks, filter, appliedQuery])

  const progress = Math.round((tasks.filter((task) => task.status === 'done').length / tasks.length) * 100) || 0

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand-mark"><Sparkles size={21} /><span>IN:BUILD</span></div>
      <p className="workspace-label">WORKSPACE</p>
      <nav><a className="nav-item nav-item--active" href="#board"><LayoutDashboard size={18} />스프린트 보드</a><a className="nav-item" href="#tasks"><ListTodo size={18} />내 작업 <span>6</span></a><a className="nav-item" href="#help"><CircleHelp size={18} />도움말</a></nav>
      <div className="sidebar-bottom"><a className="nav-item" href="#settings"><Settings size={18} />설정</a><div className="profile"><div className="avatar">JB</div><div><strong>Jin Build</strong><small>Frontend Learner</small></div><ArrowUpRight size={16} /></div></div>
    </aside>
    <main>
      <header className="topbar"><div><p className="eyebrow">WEEK 04 · FRONTEND</p><h1>스프린트 보드</h1></div><div className="topbar-actions"><button className="notification" aria-label="알림"><Bell size={20} /><i /></button><button className="primary-button" onClick={() => setIsModalOpen(true)}><Plus size={18} />새 작업</button></div></header>
      <section className="hero-card"><div><p>이번 주 진행률</p><strong>{progress}%</strong><span>완료한 작업을 확인하고 다음 우선순위를 정리해요.</span></div><div className="progress-wrap"><div className="progress-track"><div className="progress-bar" style={{ width: `${progress}%` }} /></div><div><b>{tasks.filter((task) => task.status === 'done').length}개 완료</b><span> / 총 {tasks.length}개</span></div></div></section>
      <section className="board-controls" id="board"><div className="filter-list">{filters.map((item) => <button key={item.value} onClick={() => setFilter(item.value)} className={filter === item.value ? 'filter filter--active' : 'filter'}>{item.label}</button>)}</div><label className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="작업 검색" /></label></section>
      <section className="selection-note"><span>{selectedTaskId ? '1개의 작업을 선택했습니다.' : '작업을 선택해 빠르게 비교해보세요.'}</span><button type="button">선택 작업 보기</button></section>
      <section className="task-grid" id="tasks">{visibleTasks.map((task, position) => <TaskCard key={task.id} task={task} position={position} isSelected={selectedTaskId === task.id} onSelect={setSelectedTaskId} onDelete={deleteTask} onStatusChange={updateStatus} />)}</section>
      {!visibleTasks.length && <div className="empty-state"><Search size={28} /><h2>표시할 작업이 없어요</h2><p>검색어나 필터를 다시 확인해 주세요.</p></div>}
    </main>
    <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addTask} />
  </div>
}

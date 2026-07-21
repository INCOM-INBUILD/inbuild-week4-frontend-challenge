import { useEffect, useState } from 'react'
import { seedTasks, type Task, type TaskStatus } from '../data/tasks'

const STORAGE_KEY = 'inbuild-sprint-tasks'

function readTasks(): Task[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : seedTasks
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(readTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks((current) => [{ ...task, id: crypto.randomUUID() }, ...current])
  }

  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task))
  }

  const deleteTask = (position: number) => {
    setTasks((current) => current.filter((_, index) => index !== position))
  }

  return { tasks, addTask, updateStatus, deleteTask }
}

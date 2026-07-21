import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { seedTasks } from './data/tasks'

describe('Sprint Board acceptance checks', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.useRealTimers())

  it('deletes the task that the user clicked, even from a filtered result', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '진행 중' }))

    fireEvent.click(screen.getByRole('button', { name: '프로필 API 연결 삭제' }))

    expect(screen.queryByText('프로필 API 연결')).toBeNull()
    expect(screen.getByText('검색 결과 Empty state 점검')).toBeTruthy()
  })

  it('does not apply an older search timer after the user has typed a newer query', () => {
    vi.useFakeTimers()
    render(<App />)
    const input = screen.getByPlaceholderText('작업 검색')

    fireEvent.change(input, { target: { value: 'api' } })
    act(() => vi.advanceTimersByTime(100))
    fireEvent.change(input, { target: { value: 'ui' } })
    act(() => vi.advanceTimersByTime(250))

    expect(screen.getAllByRole('article')).toHaveLength(seedTasks.length)
  })

  it('clears a cancelled new-task form before it is opened again', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /새 작업/i }))
    const input = screen.getByPlaceholderText('예: 결제 모달 예외 처리')
    fireEvent.change(input, { target: { value: '남아 있으면 안 되는 값' } })
    fireEvent.click(screen.getByRole('button', { name: '닫기' }))
    fireEvent.click(screen.getByRole('button', { name: /새 작업/i }))

    expect((screen.getByPlaceholderText('예: 결제 모달 예외 처리') as HTMLInputElement).value).toBe('')
  })

  it('allows more than one task to be selected', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '검색 결과 Empty state 점검 선택' }))
    fireEvent.click(screen.getByRole('button', { name: '프로필 API 연결 선택' }))

    expect(screen.getByText(/2개의 작업/)).toBeTruthy()
  })

  it('restores selected tasks after a refresh', () => {
    const view = render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '검색 결과 Empty state 점검 선택' }))
    view.unmount()

    render(<App />)

    expect(screen.getByText(/1개의 작업을 선택했습니다/)).toBeTruthy()
  })

  it('removes a deleted task from the selected-task summary', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '검색 결과 Empty state 점검 선택' }))
    fireEvent.click(screen.getByRole('button', { name: '검색 결과 Empty state 점검 삭제' }))

    expect(screen.getByText('작업을 선택해 빠르게 비교해보세요.')).toBeTruthy()
  })
})

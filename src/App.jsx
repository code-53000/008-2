import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import SearchFilter from './components/SearchFilter'
import KeyList from './components/KeyList'
import KeyDetail from './components/KeyDetail'
import KeyForm from './components/KeyForm'
import SecurityTip from './components/SecurityTip'
import SettingsPanel from './components/SettingsPanel'
import { useKeyStore } from './store/useKeyStore'

const UNDO_DELAY = 5000

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const selectedKeyId = useKeyStore((s) => s.selectedKeyId)
  const pendingDelete = useKeyStore((s) => s.pendingDelete)
  const undoDelete = useKeyStore((s) => s.undoDelete)
  const confirmDelete = useKeyStore((s) => s.confirmDelete)
  const flushPendingDelete = useKeyStore((s) => s.flushPendingDelete)

  const [countdown, setCountdown] = useState(5)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const tickRef = useRef(null)

  useEffect(() => {
    if (pendingDelete) {
      setCountdown(5)
      startTimeRef.current = Date.now()

      if (timerRef.current) clearTimeout(timerRef.current)
      if (tickRef.current) clearInterval(tickRef.current)

      tickRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        const remaining = Math.max(0, Math.ceil((UNDO_DELAY - elapsed) / 1000))
        setCountdown(remaining)
      }, 100)

      timerRef.current = setTimeout(() => {
        confirmDelete()
      }, UNDO_DELAY)
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (tickRef.current) clearInterval(tickRef.current)
      timerRef.current = null
      tickRef.current = null
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (tickRef.current) clearInterval(tickRef.current)
    }
  }, [pendingDelete, confirmDelete])

  useEffect(() => {
    const handleBeforeUnload = () => {
      flushPendingDelete()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [flushPendingDelete])

  const handleUndo = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (tickRef.current) clearInterval(tickRef.current)
    timerRef.current = null
    tickRef.current = null
    undoDelete()
  }

  const progressPercent = pendingDelete ? (countdown / 5) * 100 : 0

  return (
    <div className="app">
      <Header onSettingsClick={() => setSettingsOpen(true)} />

      <main className="app-main">
        <div className="app-layout">
          <section className={`list-section ${selectedKeyId ? 'hidden-on-mobile' : ''}`}>
            <SearchFilter />
            <SecurityTip />
            <KeyList />
          </section>

          <section className={`detail-section ${selectedKeyId ? 'visible-on-mobile' : ''}`}>
            <KeyDetail />
          </section>
        </div>
      </main>

      <KeyForm />
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {pendingDelete && (
        <div className="toast-container">
          <div className="toast">
            <div className="toast-content">
              <span className="toast-message">
                已删除「{pendingDelete.key.name || '未命名钥匙'}」
              </span>
              <button className="toast-undo-btn" onClick={handleUndo}>
                撤销
              </button>
              <span className="toast-countdown">{countdown}s</span>
            </div>
            <div className="toast-progress-bar">
              <div
                className="toast-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

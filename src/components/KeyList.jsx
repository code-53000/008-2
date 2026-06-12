import { useKeyStore } from '../store/useKeyStore'
import { useSearchStore } from '../store/useSearchStore'
import KeyCard from './KeyCard'

export default function KeyList() {
  const keys = useKeyStore((s) => s.keys)
  const openAddForm = useKeyStore((s) => s.openAddForm)
  useSearchStore((s) => s.keyword)
  useSearchStore((s) => s.filterPurpose)
  useSearchStore((s) => s.onlyLent)
  const filterKeys = useSearchStore((s) => s.filterKeys)

  const filteredKeys = filterKeys(keys)

  return (
    <div className="key-list">
      <div className="list-header">
      <h2 className="list-title">
        钥匙列表
        <span className="count">{filteredKeys.length} / {keys.length}</span>
      </h2>
      <button className="add-btn" onClick={openAddForm}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>添加</span>
      </button>
    </div>

      {filteredKeys.length === 0 ? (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="16" r="2" />
          <circle cx="16" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
          <path d="M20.75 8.5V5a2 2 0 0 0-2-2H7V6.001 2 2 0 0 0-2 2v6v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
        </svg>
        <p>{keys.length === 0 ? '还没有钥匙记录' : '没有匹配的钥匙'}</p>
        {keys.length === 0 && (
          <button className="empty-add-btn" onClick={openAddForm}>
            添加第一把钥匙
          </button>
        )}
      </div>
    ) : (
      <div className="key-cards">
        {filteredKeys.map((k) => (
          <KeyCard key={k.id} item={k} />
        ))}
      </div>
    )}
    </div>
  )
}

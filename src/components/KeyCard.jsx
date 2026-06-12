import { formatDate, daysSince } from '../utils/helpers'
import { useKeyStore } from '../store/useKeyStore'

export default function KeyCard({ item }) {
  const selectKey = useKeyStore((s) => s.selectKey)
  const selectedKeyId = useKeyStore((s) => s.selectedKeyId)
  const isSelected = selectedKeyId === item.id

  const days = daysSince(item.lastReturnedAt)

  return (
    <div
      className={`key-card ${isSelected ? 'selected' : ''} ${item.lentTo ? 'lent' : ''}`}
      onClick={() => selectKey(item.id)}
    >
      <div className="key-card-header">
        <h3 className="key-name">{item.name || '未命名钥匙'}</h3>
        {item.purpose && <span className="key-purpose-tag">{item.purpose}</span>}
      </div>

      {item.appearance && (
        <p className="key-appearance">外观：{item.appearance}</p>
      )}

      {item.backupLocation && (
        <p className="key-location">
          <span className="label">备用：</span>
          {item.backupLocation}
        </p>
      )}

      <div className="key-card-footer">
        {item.lentTo ? (
          <span className="status-lent">
            <span className="dot" />
            借给 {item.lentTo}
          </span>
        ) : (
          <span className="status-available">
            <span className="dot" />
            在库
          </span>
        )}
        {item.lastReturnedAt && (
          <span className="last-return">
            上次归还：{formatDate(item.lastReturnedAt)}
            {days !== null && `（${days}天前）`}
          </span>
        )}
      </div>
    </div>
  )
}

import { useKeyStore } from '../store/useKeyStore'
import { formatDate } from '../utils/helpers'

export default function KeyDetail() {
  const selectedKey = useKeyStore((s) => s.getSelectedKey())
  const selectKey = useKeyStore((s) => s.selectKey)
  const openEditForm = useKeyStore((s) => s.openEditForm)
  const deleteKey = useKeyStore((s) => s.deleteKey)
  const markReturned = useKeyStore((s) => s.markReturned)

  if (!selectedKey) {
    return (
      <div className="key-detail empty-detail">
        <p>选择一把钥匙查看详情</p>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`确定删除"${selectedKey.name || '未命名钥匙'}"吗？`)) {
      deleteKey(selectedKey.id)
    }
  }

  return (
    <div className="key-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => selectKey(null)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          返回
        </button>
        <div className="detail-actions">
          <button className="action-btn edit" onClick={() => openEditForm(selectedKey)}>
            编辑
          </button>
          <button className="action-btn delete" onClick={handleDelete}>
            删除
          </button>
        </div>
      </div>

      <div className="detail-content">
        <h2 className="detail-name">{selectedKey.name || '未命名钥匙'}</h2>

        {selectedKey.purpose && (
          <div className="detail-item">
            <span className="detail-label">用途</span>
            <span className="detail-value">{selectedKey.purpose}</span>
          </div>
        )}

        {selectedKey.appearance && (
          <div className="detail-item">
            <span className="detail-label">外观描述</span>
            <span className="detail-value">{selectedKey.appearance}</span>
          </div>
        )}

        {selectedKey.backupLocation && (
          <div className="detail-item">
            <span className="detail-label">备用存放点</span>
            <span className="detail-value sensitive">{selectedKey.backupLocation}</span>
          </div>
        )}

        {selectedKey.lentTo && (
          <div className="detail-item lent-item">
            <span className="detail-label">当前借给</span>
            <span className="detail-value">{selectedKey.lentTo}</span>
            <button
              className="mark-returned-btn"
              onClick={() => markReturned(selectedKey.id)}
            >
              标记已归还
            </button>
          </div>
        )}

        {selectedKey.lastReturnedAt && (
          <div className="detail-item">
            <span className="detail-label">最近归还时间</span>
            <span className="detail-value">{formatDate(selectedKey.lastReturnedAt)}</span>
          </div>
        )}

        {selectedKey.notes && (
          <div className="detail-item">
            <span className="detail-label">注意事项</span>
            <span className="detail-value notes">{selectedKey.notes}</span>
          </div>
        )}

        <div className="detail-meta">
          <span>创建于 {formatDate(selectedKey.createdAt)}</span>
          <span>更新于 {formatDate(selectedKey.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}

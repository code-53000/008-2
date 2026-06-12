import { useRef, useState } from 'react'
import { useKeyStore } from '../store/useKeyStore'
import { exportToJson, importFromJson } from '../utils/importExport'

export default function SettingsPanel({ isOpen, onClose }) {
  const keys = useKeyStore((s) => s.keys)
  const addKey = useKeyStore((s) => s.addKey)
  const fileInputRef = useRef(null)
  const [importMsg, setImportMsg] = useState(null)

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleExport = () => {
    exportToJson(keys)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const importedKeys = await importFromJson(file)
      const existingIds = new Set(keys.map((k) => k.id))
      let added = 0
      importedKeys.forEach((k) => {
        if (!existingIds.has(k.id)) {
          addKey(k)
          added++
        }
      })
      setImportMsg({
        type: 'success',
        text: `导入成功：新增 ${added} 把钥匙，跳过 ${importedKeys.length - added} 把重复的`,
      })
    } catch (err) {
      setImportMsg({ type: 'error', text: err.message })
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-modal settings-modal">
        <div className="form-header">
          <h2>设置与数据</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          <section className="settings-section">
            <h3>数据管理</h3>
            <p className="section-desc">
              当前共有 <strong>{keys.length}</strong> 把钥匙记录
            </p>

            <div className="action-buttons">
              <button className="btn-secondary" onClick={handleExport}>
                导出 JSON 备份
              </button>
              <button className="btn-secondary" onClick={handleImportClick}>
                从 JSON 导入
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="visually-hidden"
              />
            </div>

            {importMsg && (
              <div className={`import-msg ${importMsg.type}`}>
                {importMsg.text}
              </div>
            )}
          </section>

          <section className="settings-section">
            <h3>关于本地存储</h3>
            <p className="section-desc">
              所有数据仅保存在当前浏览器的 localStorage 中，不会上传到任何服务器。
              清除浏览器数据、卸载浏览器或更换设备都会导致数据丢失。
            </p>
            <p className="section-desc">
              建议定期导出备份文件，存放在安全的地方。
            </p>
          </section>

          <section className="settings-section">
            <h3>使用建议</h3>
            <ul className="suggestion-list">
              <li>敏感位置信息建议使用暗语描述</li>
              <li>设置手机锁屏密码保护数据安全</li>
              <li>借出和归还钥匙时及时更新记录</li>
              <li>定期导出备份以防数据丢失</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

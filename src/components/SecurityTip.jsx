import { useState } from 'react'

const tips = [
  {
    id: 1,
    type: 'warning',
    title: '数据仅保存在本设备',
    content: '所有钥匙数据只存储在当前浏览器的 localStorage 中，不会上传到任何服务器。清除浏览器数据会导致数据丢失，请定期备份。',
  },
  {
    id: 2,
    type: 'tip',
    title: '敏感内容请写暗语',
    content: '备用存放点等敏感信息，建议只有你自己看得懂的方式描述。比如"老地方"、"书架第三层"等，不要直接写具体地址。',
  },
  {
    id: 3,
    type: 'tip',
    title: '借给他人时及时记录',
    content: '钥匙借出时立即记录借用人和时间，归还后及时标记。避免时间长了忘记钥匙在谁那里。',
  },
  {
    id: 4,
    type: 'warning',
    title: '注意手机锁屏安全',
    content: '由于数据在本地存储，任何人拿到你解锁的手机都能看到钥匙信息。请设置手机锁屏密码，不要借给不信任的人使用。',
  },
  {
    id: 5,
    type: 'info',
    title: '定期导出备份',
    content: '可以在设置中导出数据文件，存放在安全的地方作为备份。换手机或清理浏览器数据后可以导入恢复。',
  },
]

export default function SecurityTip() {
  const [expanded, setExpanded] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return (
      <button
        className="security-tip-collapsed"
        onClick={() => setDismissed(false)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>安全提示</span>
      </button>
    )
  }

  return (
    <div className={`security-tip ${expanded ? 'expanded' : 'collapsed'}`}>
      <div
        className="security-tip-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="tip-header-left">
          <svg
            className="shield-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="tip-title">安全提示</span>
          <span className="tip-count">{tips.length} 条</span>
        </div>
        <div className="tip-header-right">
          <button
            className="dismiss-btn"
            onClick={(e) => {
              e.stopPropagation()
              setDismissed(true)
            }}
            title="暂时隐藏"
          >
            ×
          </button>
          <svg
            className={`chevron ${expanded ? 'up' : 'down'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {expanded && (
        <ul className="tip-list">
          {tips.map((tip) => (
            <li key={tip.id} className={`tip-item tip-${tip.type}`}>
              <div className="tip-item-header">
                <span className="tip-dot" />
                <span className="tip-item-title">{tip.title}</span>
              </div>
              <p className="tip-item-content">{tip.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

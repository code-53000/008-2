import { useState, useEffect } from 'react'
import { useKeyStore } from '../store/useKeyStore'

const emptyForm = {
  name: '',
  purpose: '',
  appearance: '',
  backupLocation: '',
  lentTo: '',
  lastReturnedAt: '',
  notes: '',
}

export default function KeyForm() {
  const isFormOpen = useKeyStore((s) => s.isFormOpen)
  const editingKey = useKeyStore((s) => s.editingKey)
  const addKey = useKeyStore((s) => s.addKey)
  const updateKey = useKeyStore((s) => s.updateKey)
  const closeForm = useKeyStore((s) => s.closeForm)

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isFormOpen) {
      if (editingKey) {
        setForm({
          name: editingKey.name || '',
          purpose: editingKey.purpose || '',
          appearance: editingKey.appearance || '',
          backupLocation: editingKey.backupLocation || '',
          lentTo: editingKey.lentTo || '',
          lastReturnedAt: editingKey.lastReturnedAt
            ? editingKey.lastReturnedAt.slice(0, 10)
            : '',
          notes: editingKey.notes || '',
        })
      } else {
        setForm(emptyForm)
      }
      setErrors({})
    }
  }, [isFormOpen, editingKey])

  if (!isFormOpen) return null

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) {
      newErrors.name = '请输入钥匙名称'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const data = {
      ...form,
      name: form.name.trim(),
      purpose: form.purpose.trim(),
      appearance: form.appearance.trim(),
      backupLocation: form.backupLocation.trim(),
      lentTo: form.lentTo.trim(),
      notes: form.notes.trim(),
    }

    if (form.lastReturnedAt) {
      data.lastReturnedAt = new Date(form.lastReturnedAt).toISOString()
    }

    if (editingKey) {
      updateKey(editingKey.id, data)
    } else {
      addKey(data)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeForm()
    }
  }

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-modal">
        <div className="form-header">
          <h2>{editingKey ? '编辑钥匙' : '添加钥匙'}</h2>
          <button className="close-btn" onClick={closeForm}>
            ×
          </button>
        </div>

        <form className="key-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              钥匙名称 <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="如：防盗门、车库门..."
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="purpose">用途</label>
            <input
              id="purpose"
              type="text"
              value={form.purpose}
              onChange={handleChange('purpose')}
              placeholder="如：家门、公司、亲戚家备用..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="appearance">外观描述</label>
            <input
              id="appearance"
              type="text"
              value={form.appearance}
              onChange={handleChange('appearance')}
              placeholder="颜色、形状、特征..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="backupLocation">备用存放点</label>
            <input
              id="backupLocation"
              type="text"
              value={form.backupLocation}
              onChange={handleChange('backupLocation')}
              placeholder="可以写暗语，只有自己看得懂"
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="lentTo">借给谁了</label>
              <input
                id="lentTo"
                type="text"
                value={form.lentTo}
                onChange={handleChange('lentTo')}
                placeholder="未借出留空"
              />
            </div>

            <div className="form-group half">
              <label htmlFor="lastReturnedAt">最近归还时间</label>
              <input
                id="lastReturnedAt"
                type="date"
                value={form.lastReturnedAt}
                onChange={handleChange('lastReturnedAt')}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">注意事项</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={handleChange('notes')}
              placeholder="使用说明、特殊提醒..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={closeForm}>
              取消
            </button>
            <button type="submit" className="btn-primary">
              {editingKey ? '保存修改' : '添加钥匙'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

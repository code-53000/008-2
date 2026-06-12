const STORAGE_PREFIX = 'key-keeper:'

export const storageKeys = {
  KEYS: STORAGE_PREFIX + 'keys',
  SETTINGS: STORAGE_PREFIX + 'settings',
  ENCRYPTION_ENABLED: STORAGE_PREFIX + 'encryption_enabled',
}

export function saveToLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error('保存到本地存储失败:', e)
    return false
  }
}

export function loadFromLocal(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultValue
  } catch (e) {
    console.error('从本地存储读取失败:', e)
    return defaultValue
  }
}

export function removeFromLocal(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error('删除本地存储失败:', e)
    return false
  }
}

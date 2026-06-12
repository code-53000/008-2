export function exportToJson(keys) {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    count: keys.length,
    keys,
  }
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `keys-backup-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (!data.keys || !Array.isArray(data.keys)) {
          reject(new Error('文件格式不正确：缺少 keys 数组'))
          return
        }
        resolve(data.keys)
      } catch (err) {
        reject(new Error('JSON 解析失败：' + err.message))
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsText(file)
  })
}

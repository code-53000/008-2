import { useSearchStore } from '../store/useSearchStore'
import { useKeyStore } from '../store/useKeyStore'

export default function SearchFilter() {
  const keyword = useSearchStore((s) => s.keyword)
  const filterPurpose = useSearchStore((s) => s.filterPurpose)
  const onlyLent = useSearchStore((s) => s.onlyLent)
  const setKeyword = useSearchStore((s) => s.setKeyword)
  const setFilterPurpose = useSearchStore((s) => s.setFilterPurpose)
  const toggleOnlyLent = useSearchStore((s) => s.toggleOnlyLent)
  const resetFilters = useSearchStore((s) => s.resetFilters)
  const getPurposeOptions = useSearchStore((s) => s.getPurposeOptions)

  const keys = useKeyStore((s) => s.keys)
  const purposeOptions = getPurposeOptions(keys)

  const hasActiveFilter = keyword || filterPurpose || onlyLent

  return (
    <div className="search-filter">
      <div className="search-input-wrap">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="搜索钥匙名称、用途、位置..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        {keyword && (
          <button
            className="clear-btn"
            onClick={() => setKeyword('')}
            aria-label="清除搜索"
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-row">
        <select
          value={filterPurpose}
          onChange={(e) => setFilterPurpose(e.target.value)}
          className="filter-select"
        >
          <option value="">全部用途</option>
          {purposeOptions.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <label className={`filter-tag ${onlyLent ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={onlyLent}
            onChange={toggleOnlyLent}
            className="visually-hidden"
          />
          <span className="tag-text">借出中</span>
        </label>

        {hasActiveFilter && (
          <button className="reset-btn" onClick={resetFilters}>
            重置
          </button>
        )}
      </div>
    </div>
  )
}

import { create } from 'zustand'

export const useSearchStore = create((set, get) => ({
  keyword: '',
  filterPurpose: '',
  onlyLent: false,

  setKeyword: (keyword) => set({ keyword }),
  setFilterPurpose: (filterPurpose) => set({ filterPurpose }),
  toggleOnlyLent: () => set((s) => ({ onlyLent: !s.onlyLent })),
  resetFilters: () => set({ keyword: '', filterPurpose: '', onlyLent: false }),

  filterKeys: (keys) => {
    const { keyword, filterPurpose, onlyLent } = get()
    const kw = keyword.trim().toLowerCase()

    return keys.filter((key) => {
      if (filterPurpose && key.purpose !== filterPurpose) return false
      if (onlyLent && !key.lentTo) return false

      if (kw) {
        const haystack = [
          key.name,
          key.purpose,
          key.appearance,
          key.backupLocation,
          key.lentTo,
          key.notes,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(kw)) return false
      }

      return true
    })
  },

  getPurposeOptions: (keys) => {
    const purposes = [...new Set(keys.map((k) => k.purpose).filter(Boolean))]
    return purposes.sort()
  },
}))

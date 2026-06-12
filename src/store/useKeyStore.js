import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId, nowISO } from '../utils/helpers'

const emptyKey = {
  id: '',
  name: '',
  purpose: '',
  appearance: '',
  backupLocation: '',
  lentTo: '',
  lastReturnedAt: '',
  notes: '',
  createdAt: '',
  updatedAt: '',
}

export const useKeyStore = create(
  persist(
    (set, get) => ({
      keys: [],
      selectedKeyId: null,
      isFormOpen: false,
      editingKey: null,

      addKey: (data) => {
        const now = nowISO()
        const newKey = {
          ...emptyKey,
          ...data,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          keys: [newKey, ...state.keys],
          isFormOpen: false,
        }))
      },

      updateKey: (id, data) => {
        const now = nowISO()
        set((state) => ({
          keys: state.keys.map((k) =>
            k.id === id ? { ...k, ...data, updatedAt: now } : k
          ),
          isFormOpen: false,
          editingKey: null,
        }))
      },

      deleteKey: (id) => {
        set((state) => ({
          keys: state.keys.filter((k) => k.id !== id),
          selectedKeyId: state.selectedKeyId === id ? null : state.selectedKeyId,
        }))
      },

      selectKey: (id) => set({ selectedKeyId: id }),

      getSelectedKey: () => {
        const { keys, selectedKeyId } = get()
        return keys.find((k) => k.id === selectedKeyId) || null
      },

      openAddForm: () => set({ isFormOpen: true, editingKey: null }),

      openEditForm: (key) => set({ isFormOpen: true, editingKey: key }),

      closeForm: () => set({ isFormOpen: false, editingKey: null }),

      markReturned: (id) => {
        const now = nowISO()
        set((state) => ({
          keys: state.keys.map((k) =>
            k.id === id
              ? { ...k, lastReturnedAt: now, lentTo: '', updatedAt: now }
              : k
          ),
        }))
      },
    }),
    {
      name: 'key-keeper-store',
      partialize: (state) => ({ keys: state.keys }),
    }
  )
)

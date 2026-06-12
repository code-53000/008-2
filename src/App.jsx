import { useState } from 'react'
import Header from './components/Header'
import SearchFilter from './components/SearchFilter'
import KeyList from './components/KeyList'
import KeyDetail from './components/KeyDetail'
import KeyForm from './components/KeyForm'
import SecurityTip from './components/SecurityTip'
import SettingsPanel from './components/SettingsPanel'
import { useKeyStore } from './store/useKeyStore'

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const selectedKeyId = useKeyStore((s) => s.selectedKeyId)

  return (
    <div className="app">
      <Header onSettingsClick={() => setSettingsOpen(true)} />

      <main className="app-main">
        <div className="app-layout">
          <section className={`list-section ${selectedKeyId ? 'hidden-on-mobile' : ''}`}>
            <SearchFilter />
            <SecurityTip />
            <KeyList />
          </section>

          <section className={`detail-section ${selectedKeyId ? 'visible-on-mobile' : ''}`}>
            <KeyDetail />
          </section>
        </div>
      </main>

      <KeyForm />
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

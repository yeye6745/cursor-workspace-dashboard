import { useState } from 'react'
import HeaderBar from './components/HeaderBar'
import Sidebar from './components/Sidebar'
import EditMode from './components/EditMode'
import ViewModeWidget from './components/ViewModeWidget'
import { DEFAULT_VIEW_SETTINGS } from './constants/viewSettings'
import './App.css'

function App() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [savedViewSettings, setSavedViewSettings] = useState(DEFAULT_VIEW_SETTINGS)
  const [draftViewSettings, setDraftViewSettings] = useState(DEFAULT_VIEW_SETTINGS)
  const [savedWidgets, setSavedWidgets] = useState([])
  const [draftWidgets, setDraftWidgets] = useState([])

  const handleEditClick = () => {
    setDraftViewSettings(savedViewSettings)
    setDraftWidgets(savedWidgets)
    setIsEditMode(true)
  }

  const handleCloseEdit = () => {
    setDraftViewSettings(savedViewSettings)
    setDraftWidgets(savedWidgets)
    setIsEditMode(false)
  }

  const handleSaveEdit = () => {
    setSavedViewSettings(draftViewSettings)
    setSavedWidgets(draftWidgets)
    setIsEditMode(false)
  }

  // 편집 모드일 때는 완전히 다른 화면으로 전환
  if (isEditMode) {
    return (
      <div className="dashboard-container edit-mode-container">
        <Sidebar />
        <EditMode
          onCancel={handleCloseEdit}
          onSave={handleSaveEdit}
          settings={draftViewSettings}
          onSettingsChange={setDraftViewSettings}
          widgets={draftWidgets}
          onWidgetsChange={setDraftWidgets}
        />
      </div>
    )
  }

  // 뷰 모드
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main-area">
        <HeaderBar onEditClick={handleEditClick} viewSettings={savedViewSettings} />
        <div className="dashboard-content">
          <div className="viewmode-workboard">
            {savedWidgets.map((widget) => (
              <ViewModeWidget
                key={widget.id}
                widget={widget}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

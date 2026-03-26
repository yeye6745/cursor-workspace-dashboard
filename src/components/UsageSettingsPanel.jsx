import filterListContextIcon from '../assets/figma/contextMenu/filter-list.svg'
import realTimeIcon from '../assets/figma/contextMenu/real-time.svg'
import labelIcon from '../assets/figma/contextMenu/label.svg'
import addPhotoAlternateIcon from '../assets/figma/contextMenu/add_photo_alternate.svg'
import helpIcon from '../assets/figma/icon/help.svg'

export function UsageSettingsPanel({ settings, onToggleSetting }) {
  return (
    <div className="usage-settings-panel">
      <div className="settings-modal">
        <div className="settings-menu-container">
          <div className="settings-sub-title">
            <div className="settings-list-name">
              <span>뷰모드 사용 여부</span>
            </div>
          </div>

          <div className="settings-list-item">
            <div className="settings-list-name">
              <img src={filterListContextIcon} alt="filter" width="16" height="16" />
              <span>변수 필터</span>
            </div>
            <div className={`settings-toggle ${settings.variableFilter ? 'on' : 'off'}`} onClick={() => onToggleSetting('variableFilter')}>
              <div className="settings-toggle-handle"></div>
            </div>
          </div>

          <div className="settings-list-item">
            <div className="settings-list-name">
              <img src={realTimeIcon} alt="time" width="16" height="16" />
              <span>타임 컨트롤러</span>
            </div>
            <div className={`settings-toggle ${settings.timeController ? 'on' : 'off'}`} onClick={() => onToggleSetting('timeController')}>
              <div className="settings-toggle-handle"></div>
            </div>
          </div>

          <div className="settings-list-item">
            <div className="settings-list-name">
              <img src={labelIcon} alt="label" width="16" height="16" />
              <span>범례</span>
            </div>
            <div className={`settings-toggle ${settings.legend ? 'on' : 'off'}`} onClick={() => onToggleSetting('legend')}>
              <div className="settings-toggle-handle"></div>
            </div>
          </div>

          <div className="settings-sub-title">
            <div className="settings-list-name">
              <span>대시보드 목록</span>
            </div>
          </div>

          <div className="settings-list-item">
            <div className="settings-list-name">
              <img src={addPhotoAlternateIcon} alt="photo" width="16" height="16" />
              <div className="settings-list-text-wrapper">
                <span>미리보기 섬네일 저장</span>
                <button className="settings-help-icon">
                  <img src={helpIcon} alt="help" width="16" height="16" />
                </button>
              </div>
            </div>
            <div className={`settings-toggle ${settings.thumbnailSave ? 'on' : 'off'}`} onClick={() => onToggleSetting('thumbnailSave')}>
              <div className="settings-toggle-handle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


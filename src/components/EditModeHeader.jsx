import filterListIcon from '../assets/figma/icon/filter-list.svg'
import chevronDoubleLeftIcon from '../assets/figma/icon/chevron-double-left.svg'
import pauseIcon from '../assets/figma/icon/pause.svg'
import chevronDoubleRightIcon from '../assets/figma/icon/chevron-double-right.svg'
import chevronDownIcon from '../assets/figma/icon/chevron-down.svg'
import optionIcon from '../assets/figma/icon/option.svg'
import settingIcon from '../assets/figma/icon/setting.svg'
import AddIconAsset from '../assets/figma/icon/Add_24px.svg'

export function EditModeHeader({
  settings,
  variableFilterButtonRef,
  onToggleVariableFilterPanel,
  onToggleUsageSettingsPanel,
  onOpenAddDashboardPanel,
}) {
  return (
    <div className="edit-header">
      <div className="edit-header-left">
        <div className="dashboard-group-select">
          <span>{'{대시보드 그룹}'}</span>
          <img src={chevronDownIcon} alt="chevron down" width="12" height="12" />
        </div>
        <div className="dashboard-name-input">
          <span>{'{UX1팀 Test 대시보드}'}</span>
        </div>
      </div>
      <div className="edit-header-right">
        {settings.variableFilter && (
          <>
            <div className="variable-filter-wrapper">
              <button
                ref={variableFilterButtonRef}
                className="btn-outlined"
                onClick={onToggleVariableFilterPanel}
              >
                <img src={filterListIcon} alt="filter" width="16" height="16" />
                <span>변수 필터</span>
              </button>
            </div>
            <div className="header-divider"></div>
          </>
        )}
        {settings.timeController && (
          <>
            <div className="time-controls">
              <div className="time-picker">
                <div className="time-badge">10m</div>
                <div className="live-badge">Live</div>
                <div className="time-text">2026.01.29 16:12:36</div>
                <img src={chevronDownIcon} alt="chevron down" width="12" height="12" />
              </div>
              <div className="playback-controls">
                <button className="icon-btn">
                  <img src={chevronDoubleLeftIcon} alt="previous" width="20" height="20" />
                </button>
                <button className="icon-btn">
                  <img src={pauseIcon} alt="pause" width="20" height="20" />
                </button>
                <button className="icon-btn">
                  <img src={chevronDoubleRightIcon} alt="next" width="20" height="20" />
                </button>
              </div>
              <button className="icon-btn-transparent">
                <img src={settingIcon} alt="setting" width="20" height="20" />
              </button>
            </div>
            <div className="header-divider"></div>
          </>
        )}
        <button className="btn-outlined" onClick={onToggleUsageSettingsPanel}>
          <img src={optionIcon} alt="option" width="16" height="16" />
          <span>사용 설정</span>
        </button>
        <button className="btn-add-viewpack" onClick={onOpenAddDashboardPanel}>
          <img src={AddIconAsset} alt="add" width="16" height="16" />
          <span>뷰팩 추가</span>
        </button>
      </div>
    </div>
  )
}


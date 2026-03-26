import './HeaderBar.css'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { VariableFilterDrawer } from './VariableFilterDrawer'
// 아이콘 import
import copyIcon from '../assets/figma/icon/content_copy_black_24dp.svg'
import filterListIcon from '../assets/figma/icon/filter-list.svg'
import chevronDoubleLeftIcon from '../assets/figma/icon/chevron-double-left.svg'
import pauseIcon from '../assets/figma/icon/pause.svg'
import chevronDoubleRightIcon from '../assets/figma/icon/chevron-double-right.svg'
import helpIcon from '../assets/figma/icon/help.svg'
import alertIcon from '../assets/figma/icon/alert.svg'
import kebabIcon from '../assets/figma/icon/kebab.svg'
// Context Menu 아이콘 import
import filterListContextIcon from '../assets/figma/contextMenu/filter-list.svg'
import textSelectIcon from '../assets/figma/contextMenu/text_select_jump_to_end_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 1.svg'
import notificationIcon from '../assets/figma/contextMenu/notification_important_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 1.svg'
import tableIcon from '../assets/figma/contextMenu/table.svg'
import listAltIcon from '../assets/figma/contextMenu/list_alt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 1.svg'
import compressIcon from '../assets/figma/contextMenu/compress_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 1.svg'
import expandIcon from '../assets/figma/contextMenu/expand_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1) 1.svg'
import alertOffIcon from '../assets/figma/contextMenu/alert-off.svg'
import alertActiveIcon from '../assets/figma/icon/alert-active.svg'
import iconsResponsiveIcon from '../assets/figma/contextMenu/icons-reponsive.svg'
import alarmDisableTooltipImg from '../assets/figma/contextMenu/alarm disable tooltip img.svg'

function HeaderBar({ onEditClick, viewSettings }) {
  const [showKebabMenu, setShowKebabMenu] = useState(false)
  const [showVariableFilterPanel, setShowVariableFilterPanel] = useState(false)
  const [toggleStates, setToggleStates] = useState({
    variableFilter: true,
    showOnlyLowest: false,
    alarmHighlight: false,
  })
  const [alarmDisabled, setAlarmDisabled] = useState(false)
  const [showAlarmTooltip, setShowAlarmTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0 })
  const kebabMenuRef = useRef(null)
  const kebabButtonRef = useRef(null)
  const variableFilterButtonRef = useRef(null)
  const variableFilterPanelRef = useRef(null)
  const alarmHighlightButtonRef = useRef(null)
  const isVariableFilterEnabled = viewSettings?.variableFilter ?? true
  const isTimeControllerEnabled = viewSettings?.timeController ?? true

  // 툴팁 위치 계산
  useEffect(() => {
    if (showAlarmTooltip && alarmHighlightButtonRef.current && kebabMenuRef.current) {
      const buttonRect = alarmHighlightButtonRef.current.getBoundingClientRect()
      const menuRect = kebabMenuRef.current.getBoundingClientRect()
      
      setTooltipPosition({
        top: buttonRect.top + buttonRect.height / 2,
        right: window.innerWidth - menuRect.left + 4
      })
    }
  }, [showAlarmTooltip])

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        kebabMenuRef.current &&
        !kebabMenuRef.current.contains(event.target) &&
        kebabButtonRef.current &&
        !kebabButtonRef.current.contains(event.target)
      ) {
        setShowKebabMenu(false)
      }
      // 변수 필터 패널 외부 클릭 시 닫기
      if (
        variableFilterPanelRef.current &&
        !variableFilterPanelRef.current.contains(event.target) &&
        variableFilterButtonRef.current &&
        !variableFilterButtonRef.current.contains(event.target)
      ) {
        setShowVariableFilterPanel(false)
      }
    }

    if (showKebabMenu || showVariableFilterPanel) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showKebabMenu, showVariableFilterPanel])

  const toggleKebabMenu = () => {
    setShowKebabMenu(!showKebabMenu)
  }

  const handleToggle = (key) => {
    if (key === 'alarmHighlight' && alarmDisabled) return
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <>
      <div className="header-bar">
      <div className="header-left">
        <div className="breadcrumb">
          <div className="breadcrumb-item menu">대시보드</div>
          <div className="breadcrumb-separator">/</div>
          <div className="breadcrumb-item enabled">
            <span>{'{UX1팀 Test 대시보드}'}</span>
            <ChevronDownIcon />
          </div>
        </div>
        <button className="btn-solid-blue" onClick={onEditClick}>
          편집
        </button>
        <button className="btn-outlined-icon">
          <img src={copyIcon} alt="copy" width="16" height="16" />
        </button>
      </div>
      <div className="header-right">
        {isVariableFilterEnabled && toggleStates.variableFilter && (
          <>
            <div className="variable-filter-wrapper">
              <button 
                ref={variableFilterButtonRef}
                className="btn-outlined"
                onClick={() => setShowVariableFilterPanel(!showVariableFilterPanel)}
              >
                <img src={filterListIcon} alt="filter" width="16" height="16" />
                <span>변수 필터</span>
              </button>
              {showVariableFilterPanel && (
                <div ref={variableFilterPanelRef} className="variable-filter-panel">
                  <VariableFilterDrawer onClose={() => setShowVariableFilterPanel(false)}>
                    <div className="variable-filter-list-container">
                      <div className="variable-filter-empty-state">
                        <div className="variable-filter-empty-icon-wrapper">
                          <div className="variable-filter-empty-icon-bg"></div>
                          <div className="variable-filter-empty-icon-border"></div>
                          <div className="variable-filter-empty-icon">
                            <img src={filterListContextIcon} alt="filter" width="24" height="24" />
                          </div>
                        </div>
                        <div className="variable-filter-empty-text">
                          <div className="variable-filter-empty-title-wrapper">
                            <div className="variable-filter-empty-title">설정된 변수 필터가 없습니다.</div>
                          </div>
                          <div className="variable-filter-empty-description-wrapper">
                            <div className="variable-filter-empty-description">편집 모드에서 변수 필터를 설정할 수 있습니다.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </VariableFilterDrawer>
                </div>
              )}
            </div>
            <div className="header-divider"></div>
          </>
        )}
        {isTimeControllerEnabled && (
          <div className="time-controls">
            <div className="time-picker">
              <div className="time-badge">10m</div>
              <div className="live-badge">Live</div>
              <div className="time-text">2026.01.29 16:12:36</div>
              <ChevronDownIcon size={12} />
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
          </div>
        )}
        <div className="header-actions">
          <button className="icon-btn-no-stroke">
              <img src={helpIcon} alt="help" width="20" height="20" />
          </button>
          {!alarmDisabled && (
            <button className="icon-btn-no-stroke">
              <img src={alertIcon} alt="alert" width="20" height="20" />
            </button>
          )}
          <div className="kebab-menu-wrapper">
            <button
              ref={kebabButtonRef}
              className="icon-btn-no-stroke"
              onClick={toggleKebabMenu}
            >
              <img src={kebabIcon} alt="more" width="20" height="20" />
            </button>
            {showKebabMenu && (
              <div ref={kebabMenuRef} className="kebab-menu">
                {/* 그룹 위젯 제어 */}
                <div className="kebab-menu-section">
                  <div className="kebab-menu-subtitle">그룹 위젯 제어</div>
                  <button className="kebab-menu-list-item">
                    <div className="kebab-menu-list-name">
                      <img src={compressIcon} alt="compress" width="16" height="16" />
                      <span>모든 그룹 위젯 접기</span>
                    </div>
                  </button>
                  <button className="kebab-menu-list-item">
                    <div className="kebab-menu-list-name">
                      <img src={expandIcon} alt="expand" width="16" height="16" />
                      <span>모든 그룹 위젯 펼치기</span>
                    </div>
                  </button>
                {/* </div> */}

                {/* 대시보드 추출 */}
                {/* <div className="kebab-menu-section"> */}
                  <div className="kebab-menu-subtitle">대시보드 추출</div>
                  <button className="kebab-menu-list-item">
                    <div className="kebab-menu-list-name">
                      <img src={tableIcon} alt="table" width="16" height="16" />
                      <span>엑셀 추출</span>
                    </div>
                  </button>
                  <button className="kebab-menu-list-item">
                    <div className="kebab-menu-list-name">
                      <img src={iconsResponsiveIcon} alt="image" width="16" height="16" />
                      <span>이미지 추출</span>
                    </div>
                  </button>
                  <button className="kebab-menu-list-item">
                    <div className="kebab-menu-list-name">
                      <img src={listAltIcon} alt="list" width="16" height="16" />
                      <span>JSON 추출</span>
                    </div>
                  </button>
                {/* </div> */}
                {/* 화면 표시 설정 */}
                {/* <div className="kebab-menu-section"> */}
                  <div className="kebab-menu-subtitle">화면 표시 설정</div>
                  <button className="kebab-menu-list-item" onClick={() => handleToggle('variableFilter')}>
                    <div className="kebab-menu-list-name">
                      <img src={filterListContextIcon} alt="filter" width="16" height="16" />
                      <span>변수 필터 표시</span>
                    </div>
                    <div className={`kebab-menu-toggle ${toggleStates.variableFilter ? 'active' : ''}`}>
                      <div className="kebab-menu-toggle-circle"></div>
                    </div>
                  </button>
                  <button className="kebab-menu-list-item" onClick={() => handleToggle('showOnlyLowest')}>
                    <div className="kebab-menu-list-name">
                      <img src={textSelectIcon} alt="text select" width="16" height="16" />
                      <span>최하위 이름만 표시</span>
                    </div>
                    <div className={`kebab-menu-toggle ${toggleStates.showOnlyLowest ? 'active' : ''}`}>
                      <div className="kebab-menu-toggle-circle"></div>
                    </div>
                  </button>
                  <button
                    ref={alarmHighlightButtonRef}
                    className={`kebab-menu-list-item ${alarmDisabled ? 'disabled alarm-disabled' : ''}`}
                    onClick={() => handleToggle('alarmHighlight')}
                    onMouseEnter={() => alarmDisabled && setShowAlarmTooltip(true)}
                    onMouseLeave={() => setShowAlarmTooltip(false)}
                  >
                    <div className="kebab-menu-list-name">
                      <img
                        src={notificationIcon}
                        alt="notification"
                        width="16"
                        height="16"
                        className={alarmDisabled ? 'kebab-menu-disabled-icon' : ''}
                      />
                      <span>알람 강조 표시</span>
                    </div>
                    <div className={`kebab-menu-toggle ${toggleStates.alarmHighlight ? 'active' : ''}`}>
                      <div className="kebab-menu-toggle-circle"></div>
                    </div>
                  </button>
                </div>
                {/* Module Ver. */}
                <div className="kebab-menu-module">
                  <div className="kebab-menu-module-divider"></div>
                  <button
                    className={`kebab-menu-list-item ${alarmDisabled ? 'kebab-menu-enable' : 'kebab-menu-danger'}`}
                    onClick={() => {
                      if (alarmDisabled) {
                        setAlarmDisabled(false)
                      } else {
                        setAlarmDisabled(true)
                        setToggleStates(prev => ({ ...prev, alarmHighlight: false }))
                      }
                    }}
                  >
                    <div className="kebab-menu-list-name">
                      <img
                        src={alarmDisabled ? alertActiveIcon : alertOffIcon}
                        alt={alarmDisabled ? 'alert active' : 'alert off'}
                        width="16"
                        height="16"
                      />
                      <span>{alarmDisabled ? '알람 활성화하기' : '알람 비활성화하기'}</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      <AlarmDisabledTooltip 
        show={alarmDisabled && showAlarmTooltip} 
        position={tooltipPosition} 
      />
    </>
  )
}

function AlarmDisabledTooltip({ show, position }) {
  if (!show) return null
  
  return createPortal(
    <div 
      className="alarm-disabled-tooltip-portal"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        right: `${position.right}px`,
        transform: 'translateY(-50%)',
        zIndex: 10000
      }}
    >
      <div className="alarm-disabled-tooltip">
        <div className="alarm-disabled-tooltip-title">
          <span>알람 비활성화 상태</span>
        </div>
        <div className="alarm-disabled-tooltip-content">
          <div className="alarm-disabled-tooltip-description">
            대시보드 알람 옵션이 비활성화 되어 기능을 사용할 수 없습니다. 알람 옵션을 사용하려면 대시보드 옵션에서 알람을 활성화 해주세요.
          </div>
          <div className="alarm-disabled-tooltip-image">
            <img src={alarmDisableTooltipImg} alt="alarm disabled" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// chevron-down 아이콘은 파일이 없으므로 간단한 SVG로 구현
function ChevronDownIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.13L6 7.13L9 4.13" stroke="#626872" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default HeaderBar

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import './EditMode.css'
import hitAreaIcon from '../assets/figma/widgets/hit-area.svg'
import kebabIcon from '../assets/figma/icon/kebab.svg'
import monitorTargetIcon from '../assets/figma/icon/add.svg'
import monitorTargetIconSelected from '../assets/figma/icon/Add_24px.svg'
import contentContainer from '../assets/figma/widgets/Content Container.svg'
import closeIcon from '../assets/figma/icon/close.svg'
import scrollbar100CenterDefault from '../assets/figma/scrollBar/percent=100, position=Center, state=Default.svg?url'
import scrollbar100CenterHovered from '../assets/figma/scrollBar/percent=100, position=Center, state=hovered.svg?url'
import scrollbar100CenterPressed from '../assets/figma/scrollBar/percent=100, position=Center, state=pressed.svg?url'
import infrastructureIcon from '../assets/figma/icon/infrastructure.svg'
import kubernetesIcon from '../assets/figma/icon/kubernetes-k8s.svg'
import applicationIcon from '../assets/figma/icon/application.svg'
import databaseIcon from '../assets/figma/icon/database.svg'
import WidgetChart from './WidgetChart'

export function Widget({
  id,
  col,
  row,
  cols,
  rows,
  colWidth,
  rowHeight,
  type,
  icon,
  onDragStart,
  onDrag,
  onDragStop,
  onResizeStart,
  onResize,
  onResizeStop,
  isActive,
  padL = 0,
  padT = 0,
  onTargetApply,
  allWidgets = [],
}) {
  const nodeRef = useRef(null)
  const startDimRef = useRef({ w: 0, h: 0 })
  const [isTargetOpen, setIsTargetOpen] = useState(false)
  const [showSelectedTargets, setShowSelectedTargets] = useState(false) // TODO: 추후 "그룹 위젯에 선택된 대상" 체크박스 재추가 시 사용
  const [selectedCategory, setSelectedCategory] = useState(3) // 데이터베이스가 기본 선택 (Figma 참조)
  const [selectedTargets, setSelectedTargets] = useState([])
  const buttonRef = useRef(null)
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 })
  const targetListRef = useRef(null)
  const [isTargetApplied, setIsTargetApplied] = useState(false)

  // 다른 위젯들에서 선택된 대상 계산 (중복 제거)
  const otherWidgetsTargets = useMemo(() => {
    const allTargets = allWidgets
      .filter(widget => widget.id !== id) // 현재 위젯 제외
      .flatMap(widget => widget.selectedTargets || []) // 모든 selectedTargets 수집
    
    // 중복 제거
    const uniqueTargets = [...new Set(allTargets)]
    return uniqueTargets
  }, [allWidgets, id])

  const otherWidgetsTargetCount = otherWidgetsTargets.length

  // 위젯 padding (상하좌우 4px씩)
  const WIDGET_PADDING = 4

  // 그리드 단위를 픽셀로 변환 (padding 고려)
  const width = cols * colWidth - WIDGET_PADDING * 2  // 좌우 padding 제외
  const height = rows * rowHeight - WIDGET_PADDING * 2  // 상하 padding 제외
  const currentX = padL + col * colWidth + WIDGET_PADDING  // 좌측 padding 추가
  const currentY = padT + row * rowHeight + WIDGET_PADDING  // 상단 padding 추가

  const headerRef = useRef(null)

  // 버튼 위치 기반으로 패널 위치 계산 (useLayoutEffect로 페인트 전에 실행)
  useLayoutEffect(() => {
    if (isTargetOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const panelWidth = 680
      const panelHeight = 480
      const SIDEBAR_WIDTH = 60
      const SIDEBAR_GAP = 8
      
      // 버튼 하단 중앙에 패널 배치
      let top = buttonRect.bottom + 4
      let left = buttonRect.left + buttonRect.width / 2 - panelWidth / 2
      
      // 화면 경계 확인 및 조정
      if (left + panelWidth > window.innerWidth - 16) {
        left = window.innerWidth - panelWidth - 16
      }
      // 사이드바 영역(60px) + 여백 8px을 침범하지 않도록 최소 left 보장
      const minLeft = SIDEBAR_WIDTH + SIDEBAR_GAP
      if (left < minLeft) {
        left = minLeft
      }
      if (top + panelHeight > window.innerHeight - 16) {
        top = buttonRect.top - panelHeight - 4 // 버튼 위에 표시
      }
      
      setPanelPosition({ top, left })
    }
  }, [isTargetOpen])

  const categories = [
    { name: '인프라스트럭쳐', icon: infrastructureIcon },
    { name: '쿠버네티스', icon: kubernetesIcon },
    { name: '애플리케이션', icon: applicationIcon },
    { name: '데이터베이스', icon: databaseIcon },
  ]

  const targetData = {
    PostgreSQL: ['*', 'postgresql-2', 'postgresql-repository', 'pg_tpcc_Alias', 'qs-pg-aurora', 'postgresql_apm'],
    MySQL: ['*', '58 MySQL 8.026_Alias', '70 MariaDB 10.6.10', 'Mysql_208', 'mysql 8.0.21', 'mysql-1', 'mysql-2', 'mysql-8032', 'mysql-8032-instance-1'],
    Oracle: ['*', 'IMXtest', 'PROD11P', 'PROD12P', 'RAC1_19210_O_252Q', 'RAC2_19210_O_252Q', 'oracle-aws'],
  }

  const makeTargetId = (categoryName, item) => `${categoryName}::${item}`

  const toggleTarget = (categoryName, item) => {
    const id = makeTargetId(categoryName, item)
    if (selectedTargets.includes(id)) {
      const next = selectedTargets.filter(t => t !== id)
      setSelectedTargets(next)
    } else {
      setSelectedTargets([...selectedTargets, id])
    }
  }

  const removeTarget = (id) => {
    const newTargets = selectedTargets.filter(t => t !== id)
    setSelectedTargets(newTargets)
    if (newTargets.length === 0) {
      setShowSelectedTargets(false)
    }
  }

  return (
    <>
    <Draggable
      nodeRef={nodeRef}
      handle=".widget-header"
      grid={[colWidth, rowHeight]}
      cancel=".resize-handle, .widget-header-more-btn"
      position={{ x: currentX, y: currentY }}
      onStart={() => {
        if (onDragStart) onDragStart(id)
      }}
      onDrag={(e, data) => {
        // 위젯 padding을 빼서 그리드 좌표 계산
        const relativeX = data.x - padL - WIDGET_PADDING
        const relativeY = data.y - padT - WIDGET_PADDING
        const newCol = Math.round(relativeX / colWidth)
        const newRow = Math.round(relativeY / rowHeight)
        
        // 그리드 단위가 변경된 경우에만 업데이트
        if (newCol !== col || newRow !== row) {
          if (onDrag) onDrag(id, newCol, newRow)
        }
      }}
      onStop={(e, data) => {
        // 위젯 padding을 빼서 그리드 좌표 계산
        const relativeX = data.x
        const relativeY = data.y
        const newCol = Math.round(relativeX / colWidth)
        const newRow = Math.round(relativeY / rowHeight)
        if (onDragStop) onDragStop(id, newCol, newRow)
      }}
    >
      <div
        ref={nodeRef}
        className="widget-item-wrapper"
        style={{
          position: 'absolute',
          width,
          height,
        }}
      >
        <Resizable
          size={{ width, height }}
          minWidth={colWidth * 4}
          minHeight={rowHeight * 9}
          grid={[colWidth, rowHeight]}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
          handleComponent={{
            bottomRight: (
              <div className="resize-handle">
                <img src={hitAreaIcon} alt="resize" className="resize-handle-icon" />
              </div>
            ),
          }}

          onResizeStart={() => {
            startDimRef.current = { w: width, h: height }
            if (onResizeStart) onResizeStart(id)
          }}
          onResize={(e, direction, ref, d) => {
            // 위젯 padding을 고려한 크기 계산
            const newWidth = startDimRef.current.w + d.width + WIDGET_PADDING * 2
            const newHeight = startDimRef.current.h + d.height + WIDGET_PADDING * 2
            
            const newCols = Math.round(newWidth / colWidth)
            const newRows = Math.round(newHeight / rowHeight)
            
            // 그리드 단위가 변경된 경우에만 업데이트
            if (newCols !== cols || newRows !== rows) {
              if (onResize) onResize(id, newCols, newRows)
            }
          }}
          onResizeStop={(e, direction, ref, d) => {
            // 위젯 padding을 고려한 크기 계산
            const newWidth = startDimRef.current.w + d.width + WIDGET_PADDING * 2
            const newHeight = startDimRef.current.h + d.height + WIDGET_PADDING * 2
            
            const newCols = Math.round(newWidth / colWidth)
            const newRows = Math.round(newHeight / rowHeight)
            
            if (onResizeStop) onResizeStop(id, newCols, newRows)
          }}
          className="widget-resizable"
        >
          <div className="widget-item">
            <div className="widget-content">
              <div className="widget-header">
                <span className="widget-title">{type}</span>
                <button className="widget-header-more-btn" type="button">
                  <img src={kebabIcon} alt="more" width="16" height="16" />
                </button>
              </div>
              <div className="widget-body">
                <div className={`widget-inner ${isTargetApplied ? 'has-content' : ''}`}>
                  {isTargetApplied ? (
                    // 적용 후: ECharts 렌더링 (icon에 따라 다른 차트 표시)
                    <WidgetChart icon={icon} selectedTargets={selectedTargets} />
                  ) : (
                    <button
                      ref={buttonRef}
                      className={`widget-inner-cta ${isTargetOpen ? 'selected' : ''}`}
                      type="button"
                      onClick={() => setIsTargetOpen(prev => !prev)}
                    >
                      <img
                        src={isTargetOpen ? monitorTargetIconSelected : monitorTargetIcon}
                        alt=""
                        width="16"
                        height="16"
                      />
                      <span>모니터링 대상</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
    {isTargetOpen && createPortal(
      <>
        {/* 모니터링 대상 설정 패널 (배경 dim 없음) */}
        <div 
          className="widget-target-panel-overlay"
          style={{
            top: `${panelPosition.top}px`,
            left: `${panelPosition.left}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더: 검색 */}
          <div className="widget-target-panel-header">
            <div className="widget-target-search-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="#80868F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L10.5 10.5" stroke="#80868F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="검색" 
              className="widget-target-search-input"
            />
          </div>
          
          {/* 바디 */}
          <div className="widget-target-panel-body">
            <div className="widget-target-container">
              {/* 좌측: 카테고리 리스트 */}
              <div className="widget-target-categories">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`widget-target-category-item ${selectedCategory === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(idx)}
                  >
                    <div className="widget-target-category-item-content">
                      <img src={cat.icon} alt={cat.name} className="widget-target-category-icon" />
                      <span>{cat.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 중앙: 대상 리스트 */}
              <div className="widget-target-list-wrapper">
                <div className="widget-target-list-header">
                  <span className="widget-target-list-title">모니터링 대상</span>
                </div>
                
                <div
                  ref={targetListRef}
                  className="widget-target-list-items"
                  style={{
                    '--scrollbar-default': `url("${scrollbar100CenterDefault}")`,
                    '--scrollbar-hovered': `url("${scrollbar100CenterHovered}")`,
                    '--scrollbar-pressed': `url("${scrollbar100CenterPressed}")`,
                  }}
                >
                  {Object.entries(targetData).map(([categoryName, items]) => (
                    <div key={categoryName} className="widget-target-db-section">
                      <div className="widget-target-db-header">
                        <div className="widget-target-db-name">
                          <span>{categoryName}</span>
                        </div>
                      </div>
                      <div className="widget-target-db-list">
                        {items.map((item, idx) => {
                          const id = makeTargetId(categoryName, item)
                          return (
                          <label key={id} className="widget-target-list-item">
                            <div className="widget-target-list-item-content">
                              <input
                                type="checkbox"
                                checked={selectedTargets.includes(id)}
                                onChange={() => toggleTarget(categoryName, item)}
                                className="widget-target-checkbox-input"
                              />
                              <span>{item}</span>
                            </div>
                          </label>
                        )})}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 우측: 선택된 대상 (모니터링 대상 체크 시 표시) */}
              {selectedTargets.length > 0 && (
                <div className="widget-target-selected-wrapper">
                  <div className="widget-target-selected-header">
                    <span className="widget-target-selected-title">선택된 대상</span>
                  </div>
                  <div className="widget-target-selected-list">
                    {selectedTargets.map((id, idx) => {
                      const [categoryName, item] = id.split('::')
                      const label = item === '*' ? `${categoryName}:*` : item
                      return (
                      <div key={idx} className="widget-target-selected-chip">
                        <span className="widget-target-chip-text">{label}</span>
                        <button
                          type="button"
                          className="widget-target-chip-remove"
                          onClick={() => removeTarget(id)}
                        >
                          <img src={closeIcon} alt="remove" width="16" height="16" />
                        </button>
                      </div>
                    )})}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 푸터: 버튼 */}
          <div className="widget-target-panel-footer">
            {otherWidgetsTargetCount > 0 && (
              <button 
                type="button" 
                className="widget-target-footer-link"
                onClick={() => {
                  // 다른 위젯들의 대상을 현재 선택된 대상에 추가 (중복 제거)
                  const mergedTargets = [...new Set([...selectedTargets, ...otherWidgetsTargets])]
                  setSelectedTargets(mergedTargets)
                  setShowSelectedTargets(true)
                }}
              >
                <span>다른 위젯에서 선택한 대상 ({otherWidgetsTargetCount})</span>
              </button>
            )}
            <div className="widget-target-footer-actions">
              <button 
                type="button" 
                className="widget-target-footer-btn secondary"
                onClick={() => setIsTargetOpen(false)}
              >
                <span>취소</span>
              </button>
              <button 
                type="button" 
                className="widget-target-footer-btn primary"
                onClick={() => {
                  // ECharts를 표시하도록 상태 변경
                  if (selectedTargets.length > 0) {
                    setIsTargetApplied(true)
                    setIsTargetOpen(false)
                    // 상위 컴포넌트에 선택된 대상 정보 전달
                    if (onTargetApply) {
                      onTargetApply(id, selectedTargets)
                    }
                  }
                }}
              >
                <span>적용</span>
              </button>
            </div>
          </div>
        </div>
      </>,
      document.body
    )}
    </>
  )
}

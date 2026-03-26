import React, { useState, useEffect, useRef } from 'react'
import kebabIcon from '../assets/figma/icon/kebab.svg'
import WidgetChart from './WidgetChart'
import './EditMode.css'

export default function ViewModeWidget({ widget }) {
  const widgetRef = useRef(null)
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0 })

  useEffect(() => {
    // 편집모드와 동일한 그리드 설정
    const COLS = 32
    const GAP = 8
    const ROW_REAL_STEP = 16
    const WIDGET_PADDING = 4
    
    // ViewMode에서의 그리드 계산 (EditMode와 동일)
    const gridContainer = document.querySelector('.viewmode-workboard')
    if (!gridContainer) return
    
    const cs = getComputedStyle(gridContainer)
    const padL = parseFloat(cs.paddingLeft) || 0
    const padT = parseFloat(cs.paddingTop) || 0
    const padR = parseFloat(cs.paddingRight) || 0
    
    const contentW = gridContainer.clientWidth - padL - padR
    
    // EditMode와 동일한 계산
    const colWidth = (contentW - (COLS - 1) * GAP) / COLS
    const stepX = colWidth + GAP  // 컬럼 간격 포함
    const stepY = ROW_REAL_STEP    // 16px
    
    // 위젯 위치 및 크기 계산 (EditMode Widget.jsx와 동일)
    const currentX = padL + widget.col * stepX + WIDGET_PADDING
    const currentY = padT + widget.row * stepY + WIDGET_PADDING
    const width = widget.cols * stepX - WIDGET_PADDING * 2
    const height = widget.rows * stepY - WIDGET_PADDING * 2

    setPosition({ left: currentX, top: currentY, width, height })

    // 화면 크기 변경 시 재계산
    const handleResize = () => {
      const contentW = gridContainer.clientWidth - padL - padR
      const colWidth = (contentW - (COLS - 1) * GAP) / COLS
      const stepX = colWidth + GAP
      const stepY = ROW_REAL_STEP
      
      const currentX = padL + widget.col * stepX + WIDGET_PADDING
      const currentY = padT + widget.row * stepY + WIDGET_PADDING
      const width = widget.cols * stepX - WIDGET_PADDING * 2
      const height = widget.rows * stepY - WIDGET_PADDING * 2

      setPosition({ left: currentX, top: currentY, width, height })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [widget.col, widget.row, widget.cols, widget.rows])

  return (
    <div
      ref={widgetRef}
      className="viewmode-widget widget-item"
      style={{
        position: 'absolute',
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
      }}
    >
      <div className="widget-content">
        <div className="widget-header">
          <span className="widget-title">{widget.type}</span>
          <button className="widget-header-more-btn" type="button">
            <img src={kebabIcon} alt="more" width="16" height="16" />
          </button>
        </div>
        <div className="widget-body">
          <div className={`widget-inner ${widget.selectedTargets && widget.selectedTargets.length > 0 ? 'has-content' : ''}`}>
            {widget.selectedTargets && widget.selectedTargets.length > 0 ? (
              <WidgetChart icon={widget.icon} selectedTargets={widget.selectedTargets} />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#9FA5AE',
                fontSize: '12px'
              }}>
                모니터링 대상을 설정해주세요
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

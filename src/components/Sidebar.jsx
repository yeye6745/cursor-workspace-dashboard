import { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
// 아이콘 import
import logoIcon from '../assets/figma/icon/exemone-logo-official 1.svg'
import searchIcon from '../assets/figma/icon/search.svg'
import homeIcon from '../assets/figma/icon/home.svg'
import dashboardIcon from '../assets/figma/icon/dashboard.svg'
import infrastructureIcon from '../assets/figma/icon/infrastructure.svg'
import messageQueueIcon from '../assets/figma/icon/message-queue.svg'
import cloudIcon from '../assets/figma/icon/cloud.svg'
import kubernetesIcon from '../assets/figma/icon/kubernetes-k8s.svg'
import applicationIcon from '../assets/figma/icon/application.svg'
import databaseIcon from '../assets/figma/icon/database.svg'
import businessIcon from '../assets/figma/icon/business.svg'
import logIcon from '../assets/figma/icon/log.svg'
import alertOutlineIcon from '../assets/figma/icon/alert-outline.svg'
import reportIcon from '../assets/figma/icon/report.svg'
import profileIcon from '../assets/figma/icon/profile-e.svg'



// 스크롤바 SVG 경로 생성 함수
function getScrollbarSVGPath(percent, position, state = 'Default') {
    // percent를 25, 50, 75, 100 중 하나로 반올림 (% 제거)
    let percentValue = '100'
    if (percent <= 37.5) percentValue = '25'
    else if (percent <= 62.5) percentValue = '50'
    else if (percent <= 87.5) percentValue = '75'
    
    // position을 Top, Center, Bottom 중 하나로 결정
    let positionValue = 'Center'
    if (position === 'top') positionValue = 'Top'
    else if (position === 'bottom') positionValue = 'Bottom'
    
    // 파일명 생성 (% 제거)
    const fileName = `percent=${percentValue}, position=${positionValue}, state=${state}.svg`
    
    // 상대 경로 직접 반환 (Vite가 처리)
    return `../assets/figma/scroll Bar/${fileName}`
  }

const menuItems = [
  { name: 'home', label: 'Home', icon: homeIcon },
  { name: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
  { name: 'infrastructure', label: 'Infrastructure', icon: infrastructureIcon },
  { name: 'message-queue', label: 'Message Queue', icon: messageQueueIcon },
  { name: 'cloud', label: 'Cloud', icon: cloudIcon },
  { name: 'kubernetes-k8s', label: 'Kubernetes', icon: kubernetesIcon },
  { name: 'application', label: 'Application', icon: applicationIcon },
  { name: 'database', label: 'Database', icon: databaseIcon },
  { name: 'business', label: 'Business', icon: businessIcon },
  { name: 'log', label: 'Log', icon: logIcon },
  { name: 'alert', label: 'Alert', icon: alertOutlineIcon },
  { name: 'report', label: 'Report', icon: reportIcon },
]

function Sidebar() {
  const sidebarMenuRef = useRef(null)
  const [scrollbarState, setScrollbarState] = useState({
    percent: 100,
    position: 'Center',
    hoverState: 'Default'
  })

  // 스크롤바 썸 크기와 위치 감지
  useEffect(() => {
    const menuEl = sidebarMenuRef.current
    if (!menuEl) return

    const updateScrollbarState = () => {
      const scrollTop = menuEl.scrollTop
      const scrollHeight = menuEl.scrollHeight
      const clientHeight = menuEl.clientHeight
      const maxScroll = scrollHeight - clientHeight

      if (maxScroll <= 0) {
        setScrollbarState({ percent: 100, position: 'Center', hoverState: 'Default' })
        return
      }

      const thumbHeight = (clientHeight / scrollHeight) * 100
      const scrollPercent = (scrollTop / maxScroll) * 100
      let position = 'Center'
      if (scrollPercent < 10) position = 'top'
      else if (scrollPercent > 90) position = 'bottom'

      setScrollbarState(prev => ({
        percent: thumbHeight,
        position,
        hoverState: prev.hoverState
      }))
    }

    updateScrollbarState()
    menuEl.addEventListener('scroll', updateScrollbarState)
    const resizeObserver = new ResizeObserver(updateScrollbarState)
    resizeObserver.observe(menuEl)

    return () => {
      menuEl.removeEventListener('scroll', updateScrollbarState)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logoIcon} alt="logo" className="logo-img" />
        </div>
        <div className="search-container">
          <img src={searchIcon} alt="search" className="search-icon" width="20" height="20" />
        </div>
      </div>
      <div 
        ref={sidebarMenuRef}
        className="sidebar-menu"
        style={{
          '--scrollbar-default': `url(${getScrollbarSVGPath(scrollbarState.percent, scrollbarState.position, 'Default')})`,
          '--scrollbar-hovered': `url(${getScrollbarSVGPath(scrollbarState.percent, scrollbarState.position, 'hovered')})`,
          '--scrollbar-pressed': `url(${getScrollbarSVGPath(scrollbarState.percent, scrollbarState.position, 'pressed')})`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.classList.add('hovered')
          setScrollbarState(prev => ({ ...prev, hoverState: 'hovered' }))
        }}
        onMouseLeave={(e) => {
          e.currentTarget.classList.remove('hovered')
          setScrollbarState(prev => ({ ...prev, hoverState: 'Default' }))
        }}
      >
        {menuItems.map((item) => (
          <div key={item.name} className="menu-item" title={item.label}>
            <img src={item.icon} alt={item.label} width="20" height="20" />
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="footer-item" title="Help">
          <HelpIcon />
        </div>
        <div className="footer-item" title="Profile">
          <img src={profileIcon} alt="profile" width="20" height="20" />
        </div>
      </div>
    </div>
  )
}

// search 아이콘은 파일이 없으므로 간단한 SVG로 구현
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.29" stroke="#B1B7C0" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

// help 아이콘은 파일이 없으므로 간단한 SVG로 구현
function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8.33" stroke="#B1B7C0" strokeWidth="1.5" fill="none"/>
      <path d="M10 7.5V10M10 12.5H10.01" stroke="#B1B7C0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default Sidebar

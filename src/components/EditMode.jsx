import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Widget } from './Widget'
import { ViewpackTagFilter } from './ViewpackTagFilter'
import { ViewpackList, DashboardList, WidgetList } from './EditModeLists'
import { EditModeBar } from './EditModeBar'
import { EditModeHeader } from './EditModeHeader'
import { UsageSettingsPanel } from './UsageSettingsPanel'
import { VariableFilterDrawer } from './VariableFilterDrawer'
import { DEFAULT_VIEW_SETTINGS } from '../constants/viewSettings'
import './EditMode.css'

// 아이콘 import
import filterListIcon from '../assets/figma/icon/filter-list.svg'
import closeIcon from '../assets/figma/icon/close.svg'
import searchIcon from '../assets/figma/icon/search.svg'
import pathIcon from '../assets/figma/icon/Path.svg'
import widgetsIcon from '../assets/figma/icon/widgets.svg'
import kebabIcon from '../assets/figma/icon/kebab.svg'

// 스크롤바 SVG import
import scrollbar25TopDefault from '../assets/figma/scrollBar/percent=25, position=Top, state=Default.svg?url'
import scrollbar25TopHovered from '../assets/figma/scrollBar/percent=25, position=Top, state=hovered.svg?url'
import scrollbar25TopPressed from '../assets/figma/scrollBar/percent=25, position=Top, state=pressed.svg?url'
import scrollbar25CenterDefault from '../assets/figma/scrollBar/percent=25, position=Center, state=Default.svg?url'
import scrollbar25CenterHovered from '../assets/figma/scrollBar/percent=25, position=Center, state=hovered.svg?url'
import scrollbar25CenterPressed from '../assets/figma/scrollBar/percent=25, position=Center, state=pressed.svg?url'
import scrollbar25BottomDefault from '../assets/figma/scrollBar/percent=25, position=Bottom, state=Default.svg?url'
import scrollbar25BottomHovered from '../assets/figma/scrollBar/percent=25, position=Bottom, state=hovered.svg?url'
import scrollbar25BottomPressed from '../assets/figma/scrollBar/percent=25, position=Bottom, state=pressed.svg?url'
import scrollbar50TopDefault from '../assets/figma/scrollBar/percent=50, position=Top, state=Default.svg?url'
import scrollbar50TopHovered from '../assets/figma/scrollBar/percent=50, position=Top, state=hovered.svg?url'
import scrollbar50TopPressed from '../assets/figma/scrollBar/percent=50, position=Top, state=pressed.svg?url'
import scrollbar50CenterDefault from '../assets/figma/scrollBar/percent=50, position=Center, state=Default.svg?url'
import scrollbar50CenterHovered from '../assets/figma/scrollBar/percent=50, position=Center, state=hovered.svg?url'
import scrollbar50CenterPressed from '../assets/figma/scrollBar/percent=50, position=Center, state=pressed.svg?url'
import scrollbar50BottomDefault from '../assets/figma/scrollBar/percent=50, position=Bottom, state=Default.svg?url'
import scrollbar50BottomHovered from '../assets/figma/scrollBar/percent=50, position=Bottom, state=hovered.svg?url'
import scrollbar50BottomPressed from '../assets/figma/scrollBar/percent=50, position=Bottom, state=pressed.svg?url'
import scrollbar75TopDefault from '../assets/figma/scrollBar/percent=75, position=Top, state=Default.svg?url'
import scrollbar75TopHovered from '../assets/figma/scrollBar/percent=75, position=Top, state=hovered.svg?url'
import scrollbar75TopPressed from '../assets/figma/scrollBar/percent=75, position=Top, state=pressed.svg?url'
import scrollbar75CenterDefault from '../assets/figma/scrollBar/percent=75, position=Center, state=Default.svg?url'
import scrollbar75CenterHovered from '../assets/figma/scrollBar/percent=75, position=Center, state=hovered.svg?url'
import scrollbar75CenterPressed from '../assets/figma/scrollBar/percent=75, position=Center, state=pressed.svg?url'
import scrollbar75BottomDefault from '../assets/figma/scrollBar/percent=75, position=Bottom, state=Default.svg?url'
import scrollbar75BottomHovered from '../assets/figma/scrollBar/percent=75, position=Bottom, state=hovered.svg?url'
import scrollbar75BottomPressed from '../assets/figma/scrollBar/percent=75, position=Bottom, state=pressed.svg?url'
import scrollbar100TopDefault from '../assets/figma/scrollBar/percent=100, position=Top, state=Default.svg?url'
import scrollbar100TopHovered from '../assets/figma/scrollBar/percent=100, position=Top, state=hovered.svg?url'
import scrollbar100TopPressed from '../assets/figma/scrollBar/percent=100, position=Top, state=pressed.svg?url'
import scrollbar100CenterDefault from '../assets/figma/scrollBar/percent=100, position=Center, state=Default.svg?url'
import scrollbar100CenterHovered from '../assets/figma/scrollBar/percent=100, position=Center, state=hovered.svg?url'
import scrollbar100CenterPressed from '../assets/figma/scrollBar/percent=100, position=Center, state=pressed.svg?url'
import scrollbar100BottomDefault from '../assets/figma/scrollBar/percent=100, position=Bottom, state=Default.svg?url'
import scrollbar100BottomHovered from '../assets/figma/scrollBar/percent=100, position=Bottom, state=hovered.svg?url'
import scrollbar100BottomPressed from '../assets/figma/scrollBar/percent=100, position=Bottom, state=pressed.svg?url'

// 스크롤바 SVG 맵
const scrollbarSVGMap = {
  '25-Top-Default': scrollbar25TopDefault,
  '25-Top-hovered': scrollbar25TopHovered,
  '25-Top-pressed': scrollbar25TopPressed,
  '25-Center-Default': scrollbar25CenterDefault,
  '25-Center-hovered': scrollbar25CenterHovered,
  '25-Center-pressed': scrollbar25CenterPressed,
  '25-Bottom-Default': scrollbar25BottomDefault,
  '25-Bottom-hovered': scrollbar25BottomHovered,
  '25-Bottom-pressed': scrollbar25BottomPressed,
  '50-Top-Default': scrollbar50TopDefault,
  '50-Top-hovered': scrollbar50TopHovered,
  '50-Top-pressed': scrollbar50TopPressed,
  '50-Center-Default': scrollbar50CenterDefault,
  '50-Center-hovered': scrollbar50CenterHovered,
  '50-Center-pressed': scrollbar50CenterPressed,
  '50-Bottom-Default': scrollbar50BottomDefault,
  '50-Bottom-hovered': scrollbar50BottomHovered,
  '50-Bottom-pressed': scrollbar50BottomPressed,
  '75-Top-Default': scrollbar75TopDefault,
  '75-Top-hovered': scrollbar75TopHovered,
  '75-Top-pressed': scrollbar75TopPressed,
  '75-Center-Default': scrollbar75CenterDefault,
  '75-Center-hovered': scrollbar75CenterHovered,
  '75-Center-pressed': scrollbar75CenterPressed,
  '75-Bottom-Default': scrollbar75BottomDefault,
  '75-Bottom-hovered': scrollbar75BottomHovered,
  '75-Bottom-pressed': scrollbar75BottomPressed,
  '100-Top-Default': scrollbar100TopDefault,
  '100-Top-hovered': scrollbar100TopHovered,
  '100-Top-pressed': scrollbar100TopPressed,
  '100-Center-Default': scrollbar100CenterDefault,
  '100-Center-hovered': scrollbar100CenterHovered,
  '100-Center-pressed': scrollbar100CenterPressed,
  '100-Bottom-Default': scrollbar100BottomDefault,
  '100-Bottom-hovered': scrollbar100BottomHovered,
  '100-Bottom-pressed': scrollbar100BottomPressed,
}

// 스크롤바 SVG 경로 생성 함수
function getScrollbarSVGPath(percent, position, state = 'Default') {
  // percent를 25, 50, 75, 100 중 하나로 반올림
  let percentValue = '100'
  if (percent <= 37.5) percentValue = '25'
  else if (percent <= 62.5) percentValue = '50'
  else if (percent <= 87.5) percentValue = '75'
  
  // position을 Top, Center, Bottom 중 하나로 결정
  let positionValue = 'Center'
  if (position === 'top') positionValue = 'Top'
  else if (position === 'bottom') positionValue = 'Bottom'
  
  // 맵에서 SVG 가져오기
  const key = `${percentValue}-${positionValue}-${state}`
  return scrollbarSVGMap[key] || scrollbar100CenterDefault
}
// Settings / context icons
import filterListContextIcon from '../assets/figma/contextMenu/filter-list.svg'
import iconsResponsiveIcon from '../assets/figma/contextMenu/icons-reponsive.svg'
// Viewpack thumbnails: 파일명(확장자 제외) === viewpack item name 이면 사용
const viewpackThumbnailFiles = import.meta.glob('../assets/figma/viewpacks/thumbnail/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default'
})
// Dashboard thumbnails: 파일명(확장자 제외) === dashboard item name 이면 사용
const dashboardThumbnailFiles = import.meta.glob('../assets/figma/dashborad/thumbnail/*.png', {
  eager: true,
  import: 'default',
})

function normalizeKey(value) {
  if (!value) return ''
  // 공백 제거 + 대소문자 무시 + 유니코드 정규화
  return value
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, '') // 모든 공백 제거
    .toLowerCase()
}

// Viewpack 썸네일 매핑
const viewpackThumbnailMap = Object.fromEntries(
  Object.entries(viewpackThumbnailFiles).map(([filePath, url]) => {
    const fileName = filePath.split('/').pop() || ''
    const baseName = fileName.replace(/\.(png|jpg|jpeg|svg)$/i, '')
    return [normalizeKey(baseName), url]
  })
)

function getViewpackThumbnailByTitle(title) {
  const key = normalizeKey(title)
  if (!key) return null
  return viewpackThumbnailMap[key] || null
}

// Dashboard 썸네일 매핑 (기존 로직 유지하되 normalizeKey 사용)
const dashboardThumbnailMap = Object.fromEntries(
  Object.entries(dashboardThumbnailFiles).map(([filePath, url]) => {
    const fileName = filePath.split('/').pop() || ''
    const baseName = fileName.replace(/\.png$/i, '')
    // Dashboard는 기존 로직대로 공백을 유지하되 normalizeKey 사용
    return [normalizeKey(baseName), url]
  })
)

function getDashboardThumbnailByTitle(title) {
  const key = normalizeKey(title)
  if (!key) return null
  return dashboardThumbnailMap[key] || null
}


function renderWorkloadDots(gridEl, options = {}) {
  if (!gridEl) return

  const COLS = options.cols ?? 32
  const GAP = options.gap ?? 8 // px
  const ROW_STEP = options.rowStep ?? 48 // px
  const DOT_SIZE = options.dotSize ?? 10 // px
  const DOT_SRC = options.dotSrc ?? new URL('../assets/figma/icon/Path.svg', import.meta.url).href

  // 기존 점들 제거
  gridEl.querySelectorAll('.grid-dot').forEach((n) => n.remove())

  // padding을 제외한 content box 크기
  const cs = getComputedStyle(gridEl)
  const padL = parseFloat(cs.paddingLeft) || 0
  const padT = parseFloat(cs.paddingTop) || 0
  const padR = parseFloat(cs.paddingRight) || 0
  const padB = parseFloat(cs.paddingBottom) || 0

  const contentW = gridEl.clientWidth - padL - padR
  const contentH = gridEl.clientHeight - padT - padB
  if (contentW <= 0 || contentH <= 0) return

  // colWidth * 32 + GAP * 31 = contentW
  const colWidth = (contentW - (COLS - 1) * GAP) / COLS
  const stepX = colWidth + GAP
  const stepY = ROW_STEP

  // 세로 반복 개수
  const rows = Math.floor(contentH / stepY) + 1

  const frag = document.createDocumentFragment()

  for (let r = 0; r < rows; r++) {
    const y = padT + r * stepY

    for (let c = 0; c < COLS; c++) {
      const x = padL + c * stepX

      // 경계 밖은 제거 (아이콘 잘림 방지)
      if (x + DOT_SIZE > padL + contentW) continue
      if (y + DOT_SIZE > padT + contentH) continue

      const img = document.createElement('img')
      img.className = 'grid-dot'
      img.src = DOT_SRC
      img.alt = ''
      img.draggable = false

      img.style.position = 'absolute'
      img.style.left = `${x}px`
      img.style.top = `${y}px`
      img.style.width = `${DOT_SIZE}px`
      img.style.height = `${DOT_SIZE}px`
      img.style.pointerEvents = 'none'
      img.style.userSelect = 'none'
      img.style.zIndex = '0' // 점을 배경처럼

      frag.appendChild(img)
    }
  }

  gridEl.appendChild(frag)
}

function attachWorkloadGrid(gridEl, options) {
  if (!gridEl) return () => {}

  const rerender = () => renderWorkloadDots(gridEl, options)

  // 최초 1회
  rerender()

  // 컨테이너 크기 변할 때마다 재렌더
  const ro = new ResizeObserver(() => {
    requestAnimationFrame(rerender)
  })
  ro.observe(gridEl)

  // 브라우저 resize 대응(줌/스크롤바 등)
  window.addEventListener('resize', rerender)

  // cleanup
  return () => {
    ro.disconnect()
    window.removeEventListener('resize', rerender)
  }
}

// 태그 색상 매핑
const TAG_COLOR_MAP = {
  '커스텀': { background: '#edf0f2', color: '#434a54' },
  '인프라스트럭쳐': { background: '#f5f3ff', color: '#5b21b6' },
  '인프라': { background: '#f5f3ff', color: '#5b21b6' },
  '메시지큐': { background: '#eff6ff', color: '#1e40af' },
  '클라우드': { background: '#f0fdfa', color: '#115e59' },
  '쿠버네티스': { background: '#f0f9ff', color: '#075985' },
  '애플리케이션': { background: '#f0fdf4', color: '#166534' },
  '데이터베이스': { background: '#fdf4ff', color: '#86198f' },
  'dbms': { background: '#fdf4ff', color: '#86198f' },
  '비즈니스': { background: '#fff7ed', color: '#9a3412' },
  '로그': { background: '#ecfeff', color: '#155e75' },
  '알람': { background: '#fdf2f8', color: '#9d174d' },
}

const DEFAULT_TAG_STYLE = { background: '#F8F9FA', color: '#626872' }

const getTagStyle = (tagName) => {
  const tagLower = tagName.toLowerCase()
  // 정확한 매칭 우선
  if (TAG_COLOR_MAP[tagName]) {
    return TAG_COLOR_MAP[tagName]
  }
  // 부분 매칭
  for (const [key, style] of Object.entries(TAG_COLOR_MAP)) {
    if (tagLower.includes(key.toLowerCase())) {
      return style
    }
  }
  return DEFAULT_TAG_STYLE
}

function EditMode({ onCancel, onSave, settings = DEFAULT_VIEW_SETTINGS, onSettingsChange, widgets: initialWidgets = [], onWidgetsChange }) {
  const ADD_DASHBOARD_PANEL_ANIMATION_MS = 650
  const [showAddDashboardPanel, setShowAddDashboardPanel] = useState(true)
  const [isAddDashboardPanelAnimating, setIsAddDashboardPanelAnimating] = useState(false)
  const [activeTab, setActiveTab] = useState('viewpack')
  const [widgets, setWidgets] = useState(initialWidgets)
  const [activeWidgetId, setActiveWidgetId] = useState(null)
  const [showSettingsPanel, setShowSettingsPanel] = useState(false)
  const [showVariableFilterPanel, setShowVariableFilterPanel] = useState(false)
  // viewpack info hover 상태 관리
  const [hoveredItemId, setHoveredItemId] = useState(null)
  const [hoveredItemPosition, setHoveredItemPosition] = useState({ top: 0, left: -284 })
  const [hoveredItemInfo, setHoveredItemInfo] = useState(null) // { title, description }
  // dashboard info hover 상태 관리
  const [hoveredDashboardItemId, setHoveredDashboardItemId] = useState(null)
  const [hoveredDashboardItemPosition, setHoveredDashboardItemPosition] = useState({ top: 0, left: -324 })
  const [hoveredDashboardItemInfo, setHoveredDashboardItemInfo] = useState(null) // { title }
  const dashboardInfoRef = useRef(null)
  // viewpack 태그 필터 상태
  const [isViewpackTagFilterOpen, setIsViewpackTagFilterOpen] = useState(false)
  const [selectedViewpackTags, setSelectedViewpackTags] = useState([])
  const [tagFilterPosition, setTagFilterPosition] = useState({ top: 0, left: 0 })
  // 스크롤바 상태 관리
  const [scrollbarState, setScrollbarState] = useState({ percent: 100, position: 'Center', hoverState: 'Default' })
  const [widgetScrollbarState, setWidgetScrollbarState] = useState({ percent: 100, position: 'Center', hoverState: 'Default' })
  const [dashboardScrollbarState, setDashboardScrollbarState] = useState({ percent: 100, position: 'Center', hoverState: 'Default' })
  const viewpackListRef = useRef(null)
  const viewpackSearchRef = useRef(null)
  const viewpackFilterButtonRef = useRef(null)
  const widgetContainerRef = useRef(null)
  const dashboardContainerRef = useRef(null)
  const variableFilterButtonRef = useRef(null)
  const variableFilterPanelRef = useRef(null)

  const gridRef = useRef(null)
  const updateTagFilterPosition = () => {
    const btnEl = viewpackFilterButtonRef.current
    if (!btnEl) {
      // ref가 없는 경우에도 화면 내에서 확인 가능하도록 기본값 제공
      setTagFilterPosition({ top: 120, left: 120 })
      return
    }
    const rect = btnEl.getBoundingClientRect()
    const panelWidth = 400
    const margin = 8
    let left = rect.right - panelWidth
    const maxLeft = window.innerWidth - panelWidth - margin
    if (left > maxLeft) left = maxLeft
    if (left < margin) left = margin
    setTagFilterPosition({
      top: rect.bottom + 4,
      left,
    })
  }

  useLayoutEffect(() => {
    if (!(activeTab === 'viewpack' && isViewpackTagFilterOpen)) return

    updateTagFilterPosition()
    const onViewportChange = () => updateTagFilterPosition()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)

    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('scroll', onViewportChange, true)
    }
  }, [activeTab, isViewpackTagFilterOpen])

  const affordanceRef = useRef(null)
  const gridGuideRef = useRef(null)

  // 그리드 계산 유틸리티 함수
  const getGridInfo = () => {
    if (!gridRef.current) return null

    const gridEl = gridRef.current
    const COLS = 32
    const GAP = 8
    const ROW_REAL_STEP = 16
    const ROW_STEP = ROW_REAL_STEP * 3

    const cs = getComputedStyle(gridEl)
    const padL = parseFloat(cs.paddingLeft) || 0
    const padT = parseFloat(cs.paddingTop) || 0
    const padR = parseFloat(cs.paddingRight) || 0
    const padB = parseFloat(cs.paddingBottom) || 0

    const contentW = gridEl.clientWidth - padL - padR
    const contentH = gridEl.clientHeight - padT - padB

    if (contentW <= 0 || contentH <= 0) return null

    const colWidth = (contentW - (COLS - 1) * GAP) / COLS
    const stepX = colWidth + GAP
    const stepY = ROW_REAL_STEP

    return { padL, padT, padR, padB, contentW, contentH, colWidth, stepX, stepY, COLS, GAP, ROW_STEP }
  }

  // 새 위젯의 초기 배치를 계산 (좌 -> 우, 가득 차면 다음 행으로 wrap)
  const getNextWidgetPosition = (existingWidgets, widgetCols, widgetRows) => {
    const gridInfo = getGridInfo()
    if (!gridInfo) return { col: 0, row: 0 }

    const maxCols = gridInfo.COLS

    // 첫 위젯이면 (0,0)에 배치
    if (!existingWidgets || existingWidgets.length === 0) {
      return { col: 0, row: 0 }
    }

    // 현재 가장 위 행(row가 가장 작은 행)을 기준으로 배치
    const minRow = existingWidgets.reduce((acc, w) => Math.min(acc, w.row), existingWidgets[0].row)
    const sameRowWidgets = existingWidgets.filter(w => w.row === minRow)

    // 혹시 같은 행 위젯이 없다면 그냥 (0, minRow)에 배치
    if (sameRowWidgets.length === 0) {
      return { col: 0, row: minRow }
    }

    const { padL, stepX } = gridInfo
    const WIDGET_PADDING = 4

    // 기존 위젯들 중 가장 오른쪽 끝 픽셀 위치 계산
    const maxRightPx = sameRowWidgets.reduce((max, w) => {
      const leftX = padL + w.col * stepX + WIDGET_PADDING
      const widthPx = w.cols * stepX - WIDGET_PADDING * 2
      const rightX = leftX + widthPx
      return Math.max(max, rightX)
    }, 0)

    // 기존 위젯 오른쪽 + 8px 간격으로 새 위젯의 왼쪽을 맞춤
    const newLeftX = maxRightPx + 8
    const newCol = Math.round((newLeftX - padL - WIDGET_PADDING) / stepX)

    // 가로 영역을 초과하면 다음 행으로 wrap
    if (newCol + widgetCols > maxCols) {
      return { col: 0, row: minRow + widgetRows }
    }

    return { col: Math.max(0, newCol), row: minRow }
  }

  // 픽셀 좌표를 그리드 좌표로 변환 (위젯용 - padding 고려)
  const pixelToGridForWidget = (x, y, padL, padT, colWidth, rowHeight, widgetPadding = 4) => {
    // 위젯 padding을 빼서 그리드 좌표 계산
    const relativeX = x - padL - widgetPadding
    const relativeY = y - padT - widgetPadding
    const col = Math.round(relativeX / colWidth)
    const row = Math.round(relativeY / rowHeight)
    return { col: Math.max(0, col), row: Math.max(0, row) }
  }

  // 그리드 좌표를 픽셀 좌표로 변환 (위젯용 - padding 고려)
  const gridToPixelForWidget = (col, row, padL, padT, colWidth, rowHeight, widgetPadding = 4) => {
    // 그리드 좌표를 픽셀로 변환하고 위젯 padding 추가
    const x = padL + col * colWidth + widgetPadding
    const y = padT + row * rowHeight + widgetPadding
    return { x, y }
  }

  // 픽셀 좌표를 그리드 좌표로 변환 (참고 파일 방식: gap 없이 colWidth만 사용)
  const pixelToGrid = (x, y) => {
    const gridInfo = getGridInfo()
    if (!gridInfo) return { col: 0, row: 0 }

    const relativeX = x - gridInfo.padL
    const relativeY = y - gridInfo.padT

    // workload 그리드 방식: stepX = colWidth + GAP, stepY = 48px
    const col = Math.round(relativeX / gridInfo.stepX)
    const row = Math.round(relativeY / gridInfo.stepY)

    return { col: Math.max(0, Math.min(col, gridInfo.COLS - 1)), row: Math.max(0, row) }
  }

  // 그리드 좌표를 픽셀 좌표로 변환 (참고 파일 방식)
  const gridToPixel = (col, row) => {
    const gridInfo = getGridInfo()
    if (!gridInfo) return { x: 0, y: 0 }

    // workload 그리드 방식: stepX = colWidth + GAP, stepY = 48px
    const x = gridInfo.padL + col * gridInfo.stepX
    const y = gridInfo.padT + row * gridInfo.stepY

    return { x, y }
  }

  // viewpack-item hover 핸들러
  const handleItemMouseEnter = (itemId, itemInfo, event) => {
    if (isAddDashboardPanelAnimating) return
    const rect = event.currentTarget.getBoundingClientRect()
    const addDashboardPanel = document.querySelector('.add-dashboard-panel')
    if (addDashboardPanel) {
      const panelRect = addDashboardPanel.getBoundingClientRect()
      let top = rect.top - panelRect.top // viewpack-item의 y축 위치
      
      // viewpack-info의 예상 높이 계산
      // thumbnail: 160px + padding: 6px*2 + contents padding: 16px*2 + title + description(있을 경우) + tags
      const thumbnailHeight = 160
      const outerPadding = 12 // 6px * 2
      const contentsPadding = 32 // 16px * 2
      const titleHeight = 20 // 대략적인 높이
      const descriptionHeight = itemInfo.description ? 40 : 0 // description이 있을 때 대략적인 높이
      const tagsHeight = itemInfo.tags && itemInfo.tags.length > 0 ? 30 : 0 // tags가 있을 때 대략적인 높이
      const gap = 16 // contents 내부 gap
      const viewpackInfoHeight = thumbnailHeight + outerPadding + contentsPadding + titleHeight + descriptionHeight + tagsHeight + gap
      
      const viewportHeight = window.innerHeight
      const viewpackInfoBottom = rect.top + viewpackInfoHeight
      
      // viewpack-info가 화면 하단을 넘어가면 조정
      if (viewpackInfoBottom > viewportHeight - 4) {
        // 화면 하단에서 4px 떨어진 위치로 조정
        top = viewportHeight - panelRect.top - viewpackInfoHeight - 4
        // 최소값은 0 (패널 상단을 넘어가지 않도록)
        if (top < 0) top = 0
      }
      
      setHoveredItemPosition({
        top: top,
        left: -324 // width(320px) + 4px 간격
      })
    }
    setHoveredItemId(itemId)
    setHoveredItemInfo(itemInfo) // { title, description }
  }

  const handleItemMouseLeave = () => {
    setHoveredItemId(null)
    setHoveredItemInfo(null)
  }

  // Add Dashboard 패널이 애니메이션으로 열릴 때는 viewpack info를 잠시 비활성화
  useEffect(() => {
    if (!showAddDashboardPanel) {
      setIsAddDashboardPanelAnimating(false)
      return
    }

    setHoveredItemId(null)
    setHoveredItemInfo(null)
    setIsAddDashboardPanelAnimating(true)

    const timer = window.setTimeout(() => {
      setIsAddDashboardPanelAnimating(false)
    }, ADD_DASHBOARD_PANEL_ANIMATION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [showAddDashboardPanel])

  const handleDashboardItemMouseEnter = (itemId, itemInfo, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const addDashboardPanel = document.querySelector('.add-dashboard-panel')
    if (addDashboardPanel) {
      const panelRect = addDashboardPanel.getBoundingClientRect()
      setHoveredDashboardItemPosition({
        top: rect.top - panelRect.top,
        left: -324, // width(320px) + 4px gap
      })
    }
    setHoveredDashboardItemId(itemId)
    setHoveredDashboardItemInfo(itemInfo)
  }

  const handleDashboardItemMouseLeave = () => {
    setHoveredDashboardItemId(null)
    setHoveredDashboardItemInfo(null)
  }

  // dashboard-info가 viewport bottom(4px) 밖으로 나가면 clamp
  useLayoutEffect(() => {
    if (!hoveredDashboardItemId) return
    const addDashboardPanel = document.querySelector('.add-dashboard-panel')
    const infoEl = dashboardInfoRef.current
    if (!addDashboardPanel || !infoEl) return

    const panelRect = addDashboardPanel.getBoundingClientRect()
    const infoRect = infoEl.getBoundingClientRect()
    const currentTop = hoveredDashboardItemPosition.top

    const maxBottom = window.innerHeight - 4
    const bottom = panelRect.top + currentTop + infoRect.height

    if (bottom > maxBottom) {
      let nextTop = maxBottom - panelRect.top - infoRect.height
      if (nextTop < 0) nextTop = 0
      if (Math.abs(nextTop - currentTop) > 0.5) {
        setHoveredDashboardItemPosition(prev => ({ ...prev, top: nextTop }))
      }
    }
  }, [hoveredDashboardItemId, hoveredDashboardItemInfo])

  // 위젯 추가 함수
  const addWidget = (widgetType, icon = null) => {
    const gridInfo = getGridInfo()
    if (!gridInfo) return

    //기본 위젯 크기 cols: 8, rows: 18
    const defaultCols = 8
    const defaultRows = 18
    const { col: initialCol, row: initialRow } = getNextWidgetPosition(widgets, defaultCols, defaultRows)
    const newWidget = {
      id: Date.now(),
      type: widgetType,
      icon: icon, // 뷰팩/위젯의 icon 타입 (bar, equalizer, pie, timeseries 등)
      initialCol,  // 최초 위치 (위젯 생성 시 한 번만 설정)
      initialRow,  // 최초 위치 (위젯 생성 시 한 번만 설정)
      col: initialCol,  // 현재 위치 (drag 결과에 따라 갱신)
      row: initialRow,  // 현재 위치 (drag 결과에 따라 갱신)
      cols: defaultCols,
      rows: defaultRows,
    }
    setWidgets([...widgets, newWidget])
    setShowAddDashboardPanel(false)
  }

  // 위젯 드래그 시작
  const handleWidgetDragStart = (id) => {
    setActiveWidgetId(id.toString())
  }

  // 위젯 드래그 중
  const handleWidgetDrag = (id, newCol, newRow) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, col: newCol, row: newRow } : w
    ))
  }

  // 위젯 드래그 종료
  const handleWidgetDragStop = (id, newCol, newRow) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, col: newCol, row: newRow } : w
    ))
    setActiveWidgetId(null)
  }

  // 위젯 리사이징 시작
  const handleWidgetResizeStart = (id) => {
    setActiveWidgetId(id.toString())
  }

  // 위젯 리사이징 중
  const handleWidgetResize = (id, newCols, newRows) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, cols: newCols, rows: newRows } : w
    ))
  }

  // 위젯 리사이징 종료
  const handleWidgetResizeStop = (id, newCols, newRows) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, cols: newCols, rows: newRows } : w
    ))
    setActiveWidgetId(null)
  }

  // affordance 크기를 그리드에 맞춰 계산하는 함수
  const updateAffordanceSize = () => {
    if (!gridRef.current || !affordanceRef.current) return

    const gridEl = gridRef.current
    const affordanceEl = affordanceRef.current

    const COLS = 32
    const GAP = 8
    const ROW_STEP = 48

    const cs = getComputedStyle(gridEl)
    const padL = parseFloat(cs.paddingLeft) || 0
    const padR = parseFloat(cs.paddingRight) || 0

    const contentW = gridEl.clientWidth - padL - padR
    if (contentW <= 0) return

    const gridInfo = getGridInfo()
    if (!gridInfo) return

    const { stepX, stepY } = gridInfo

    // affordance 크기: 8컬럼 × 5행 (8:5 비율)
    const affordanceCols = 8
    const affordanceRows = 15
    const affordanceWidth = affordanceCols * stepX - GAP // 마지막 gap 제외
    const affordanceHeight = affordanceRows * stepY

    affordanceEl.style.width = `${affordanceWidth}px`
    affordanceEl.style.height = `${affordanceHeight}px`
  }

  // widgets 변경 시 상위 컴포넌트에 전달
  useEffect(() => {
    if (onWidgetsChange) {
      onWidgetsChange(widgets)
    }
  }, [widgets, onWidgetsChange])

  useEffect(() => {
    if (!gridRef.current) return
  
    const dotSrc = new URL('../assets/figma/icon/Path.svg', import.meta.url).href
  
    const cleanup = attachWorkloadGrid(gridRef.current, {
      cols: 32,
      gap: 8,
      rowStep: 48,
      dotSize: 10,
      dotSrc,
    })

    // affordance 크기 업데이트
    updateAffordanceSize()

    // ResizeObserver로 affordance 크기도 업데이트
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        updateAffordanceSize()
      })
    })
    ro.observe(gridRef.current)

    // window resize에도 대응
    const handleResize = () => {
      requestAnimationFrame(updateAffordanceSize)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cleanup()
      ro.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 위젯의 모니터링 대상 적용
  const handleWidgetTargetApply = (widgetId, selectedTargets) => {
    setWidgets(widgets.map(w => 
      w.id === widgetId 
        ? { ...w, selectedTargets } 
        : w
    ))
  }

  // 스크롤바 상태 업데이트 함수
  const createScrollbarStateUpdater = (ref, setState) => {
    return () => {
      const el = ref.current
      if (!el) return

      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      const clientHeight = el.clientHeight
      const maxScroll = scrollHeight - clientHeight

      if (maxScroll <= 0) {
        setState({ percent: 100, position: 'Center', hoverState: 'Default' })
        return
      }

      const thumbHeight = (clientHeight / scrollHeight) * 100
      const scrollPercent = (scrollTop / maxScroll) * 100
      let position = 'Center'
      if (scrollPercent < 10) position = 'top'
      else if (scrollPercent > 90) position = 'bottom'

      setState(prev => ({
        percent: thumbHeight,
        position,
        hoverState: prev.hoverState
      }))
    }
  }

  // viewpack-list 스크롤바 상태 업데이트
  useEffect(() => {
    const listEl = viewpackListRef.current
    if (!listEl) return

    const updateScrollbarState = createScrollbarStateUpdater(viewpackListRef, setScrollbarState)

    updateScrollbarState()
    listEl.addEventListener('scroll', updateScrollbarState)
    const resizeObserver = new ResizeObserver(updateScrollbarState)
    resizeObserver.observe(listEl)

    return () => {
      listEl.removeEventListener('scroll', updateScrollbarState)
      resizeObserver.disconnect()
    }
  }, [activeTab])

  // widget-type-container 스크롤바 상태 업데이트
  useEffect(() => {
    const containerEl = widgetContainerRef.current
    if (!containerEl) return

    const updateScrollbarState = createScrollbarStateUpdater(widgetContainerRef, setWidgetScrollbarState)

    updateScrollbarState()
    containerEl.addEventListener('scroll', updateScrollbarState)
    const resizeObserver = new ResizeObserver(updateScrollbarState)
    resizeObserver.observe(containerEl)

    return () => {
      containerEl.removeEventListener('scroll', updateScrollbarState)
      resizeObserver.disconnect()
    }
  }, [activeTab])

  // dashboard-category-items 스크롤바 상태 업데이트
  useEffect(() => {
    const containerEl = dashboardContainerRef.current
    if (!containerEl) return

    const updateScrollbarState = createScrollbarStateUpdater(dashboardContainerRef, setDashboardScrollbarState)

    updateScrollbarState()
    containerEl.addEventListener('scroll', updateScrollbarState)
    const resizeObserver = new ResizeObserver(updateScrollbarState)
    resizeObserver.observe(containerEl)

    return () => {
      containerEl.removeEventListener('scroll', updateScrollbarState)
      resizeObserver.disconnect()
    }
  }, [activeTab])

  // 변수 필터 패널 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        variableFilterPanelRef.current &&
        !variableFilterPanelRef.current.contains(event.target) &&
        variableFilterButtonRef.current &&
        !variableFilterButtonRef.current.contains(event.target)
      ) {
        setShowVariableFilterPanel(false)
      }
    }

    if (showVariableFilterPanel) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showVariableFilterPanel])

  const handleToggleSetting = (key) => {
    if (!onSettingsChange) return
    onSettingsChange((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleToggleVariableFilterPanel = () => {
    if (showAddDashboardPanel) setShowAddDashboardPanel(false)
    if (showSettingsPanel) setShowSettingsPanel(false)
    setShowVariableFilterPanel((prev) => !prev)
  }

  const handleToggleUsageSettingsPanel = () => {
    setShowSettingsPanel((prev) => {
      const next = !prev
      if (next) {
        setShowVariableFilterPanel(false)
        setShowAddDashboardPanel(false)
      }
      return next
    })
  }

  const handleOpenAddDashboardPanel = () => {
    if (showVariableFilterPanel) setShowVariableFilterPanel(false)
    if (showSettingsPanel) setShowSettingsPanel(false)
    setShowAddDashboardPanel(true)
  }

  return (
    <div className="edit-mode">
      <EditModeBar onCancel={onCancel} onSave={onSave} />
      <EditModeHeader
        settings={settings}
        variableFilterButtonRef={variableFilterButtonRef}
        onToggleVariableFilterPanel={handleToggleVariableFilterPanel}
        onToggleUsageSettingsPanel={handleToggleUsageSettingsPanel}
        onOpenAddDashboardPanel={handleOpenAddDashboardPanel}
      />

      <div className="workboard">
        <div className="grid-container" ref={gridRef}>
          {/* 그리드 가이드 - SVG 패턴 사용 (참고 파일 방식) */}
          {activeWidgetId && (() => {
            const gridInfo = getGridInfo()
            if (!gridInfo) return null

            
            // activeWidgetId에 해당하는 현재 위젯 찾기 (참고 파일 방식)
            const activeWidget = widgets.find(w => w.id.toString() === activeWidgetId)
            if (!activeWidget) return null

            // workload 그리드와 동일한 계산 방식 사용
            const stepX = gridInfo.stepX  // colWidth + GAP
            const stepY = gridInfo.stepY  // 48px
            const colWidth = gridInfo.colWidth  // (contentW - (COLS - 1) * GAP) / COLS

            // 그리드 범위를 더 좁게 설정
            const MARGIN_COLS = 2
            const MARGIN_ROWS = 6

            // Container Rect (Area where SVG exists)
            const containerX = gridInfo.padL + (activeWidget.col - MARGIN_COLS) * stepX
            const containerY = gridInfo.padT + (activeWidget.row - MARGIN_ROWS) * stepY
            const containerW = (activeWidget.cols + MARGIN_COLS * 2) * stepX
            const containerH = (activeWidget.rows + MARGIN_ROWS * 2) * stepY

            // Widget Rect (위젯 영역) - workload 그리드 stepX 사용
            const widgetX = gridInfo.padL + activeWidget.col * stepX
            const widgetY = gridInfo.padT + activeWidget.row * stepY
            const widgetW = activeWidget.cols * stepX
            const widgetH = activeWidget.rows * stepY

            // 위젯 padding (상하좌우 4px씩)
            const WIDGET_PADDING = 4

            // 위젯의 실제 그려지는 영역 (padding 고려)
            const actualWidgetX = widgetX + WIDGET_PADDING
            const actualWidgetY = widgetY + WIDGET_PADDING
            const actualWidgetW = widgetW - WIDGET_PADDING * 2
            const actualWidgetH = widgetH - WIDGET_PADDING * 2

            // 위젯 중심부 좌표 (실제 그려지는 영역 기준)
            const centerX = actualWidgetX + actualWidgetW / 2
            const centerY = actualWidgetY + actualWidgetH / 2

            // Radial gradient의 반지름 (위젯 대각선 길이의 약 1.5배)
            const radius = Math.sqrt(actualWidgetW * actualWidgetW + actualWidgetH * actualWidgetH) * 0.75

            return (
              <svg
                className="grid-guide-svg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 4, // 위젯(z-index: 5)보다 낮게 설정하여 위젯 위에 보이지 않도록
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                <pattern
                    id="guide-pattern"
                    x={gridInfo.padL}  // workload 그리드 시작점과 일치 (padL + c * stepX)
                    y={gridInfo.padT}  // workload 그리드 시작점과 일치 (padT + r * stepY)
                    width={stepX}  // colWidth + GAP
                    height={stepY}  // 48px
                    patternUnits="userSpaceOnUse"
                  >
                    {/* Vertical Pink Line - 점의 중심에 맞추기 위해 오른쪽으로 5px 이동 */}
                    <path
                      d={`M 5 0 V ${stepY}`}
                      stroke="#8B5CF6"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="1"
                    />
                    {/* Horizontal Blue Line - 점의 중심에 맞추기 위해 아래로 5px 이동 */}
                    <path
                      d={`M 0 5 H ${stepX}`}
                      stroke="#00BFFF"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="1"
                    />
                  </pattern>

                  {/* Radial Gradient - 위젯 중심부 기준 */}
                  <radialGradient
                    id="widget-radial-gradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    {/* 중심부 - 매우 진하게 */}
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="20%" stopColor="white" stopOpacity="1" />
                    <stop offset="40%" stopColor="white" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.6" />
                    <stop offset="80%" stopColor="white" stopOpacity="0.3" />
                    {/* 가장자리 - 투명 */}
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>

                  {/* Filter for additional blur effect */}
                  <filter
                    id="glow-blur"
                    x="-100%"
                    y="-100%"
                    width="300%"
                    height="300%"
                  >
                    <feGaussianBlur stdDeviation="40" result="blur" />
                  </filter>
                </defs>

                <mask
                  id="widget-outline-mask"
                  maskUnits="userSpaceOnUse"
                >
                  {/* 전체 영역을 검은색으로 채움 (기본적으로 안보이게) */}
                  <rect
                    x={containerX}
                    y={containerY}
                    width={containerW}
                    height={containerH}
                    fill="black"
                  />
                  
                  {/* 위젯 주변에 Radial Gradient 적용 (위젯 중심부 기준) - 중심부는 흰색(보임), 가장자리는 투명(안보임) */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="url(#widget-radial-gradient)"
                    filter="url(#glow-blur)"
                  />
                  
                  {/* 추가로 더 진한 중심부 */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={Math.min(actualWidgetW, actualWidgetH) * 0.3}
                    fill="white"
                    opacity="1"
                  />
                  
                  {/* 위젯의 실제 그려지는 영역을 검은색으로 채움 (완전히 가리기) - padding 고려 */}
                  <rect
                    x={actualWidgetX + 1}  // left에 가이드라인이 보이도록 1px 오프셋
                    y={actualWidgetY + 1}  // top에 가이드라인이 보이도록 1px 오프셋
                    width={actualWidgetW - 1}  // right에 가이드라인이 보이도록 1px 줄임
                    height={actualWidgetH - 1}  // bottom에 가이드라인이 보이도록 1px 줄임
                    fill="black"
                  />
                </mask>

                <rect
                  x={containerX}
                  y={containerY}
                  width={containerW}
                  height={containerH}
                  fill="url(#guide-pattern)"
                  mask="url(#widget-outline-mask)"
                />
              </svg>
            )
          })()}

          {/* 위젯들 */}
          {(() => {
            const gridInfo = getGridInfo()
            if (!gridInfo) return null

            // workload 그리드 방식: stepX, stepY 사용
            const stepX = gridInfo.stepX  // colWidth + GAP
            const stepY = gridInfo.stepY  // 48px

            return widgets.map((widget) => (
              <Widget
                key={widget.id}
                id={widget.id}
                initialCol={widget.initialCol ?? widget.col}  // 최초 위치 (fallback for backward compatibility)
                initialRow={widget.initialRow ?? widget.row}  // 최초 위치 (fallback for backward compatibility)
                col={widget.col}  // 현재 위치
                row={widget.row}  // 현재 위치
                cols={widget.cols}
                rows={widget.rows}
                colWidth={stepX}  // stepX 사용
                rowHeight={stepY}  // stepY 사용
                type={widget.type}
                icon={widget.icon}  // 뷰팩/위젯의 icon 타입 전달
                padL={gridInfo.padL}
                padT={gridInfo.padT}
                pixelToGrid={(x, y) => pixelToGridForWidget(x, y, gridInfo.padL, gridInfo.padT, stepX, stepY)}
                gridToPixel={(col, row) => gridToPixelForWidget(col, row, gridInfo.padL, gridInfo.padT, stepX, stepY)}
                onDragStart={handleWidgetDragStart}
                onDrag={handleWidgetDrag}
                onDragStop={handleWidgetDragStop}
                onResizeStart={handleWidgetResizeStart}
                onResize={handleWidgetResize}
                onResizeStop={handleWidgetResizeStop}
                onTargetApply={handleWidgetTargetApply}
                isActive={activeWidgetId === widget.id.toString()}
                allWidgets={widgets}
              />
            ))
          })()}

          {/* Affordance (위젯이 없을 때만 표시) */}
          {widgets.length === 0 && (
            <div className="affordance-container" style={{ position: 'relative', zIndex: 1 }}>
              <div
                ref={affordanceRef}
                className="affordance-item"
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (showVariableFilterPanel) {
                    setShowVariableFilterPanel(false)
                  }
                  if (showSettingsPanel) {
                    setShowSettingsPanel(false)
                  }
                  setShowAddDashboardPanel(true)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (showVariableFilterPanel) {
                      setShowVariableFilterPanel(false)
                    }
                    if (showSettingsPanel) {
                      setShowSettingsPanel(false)
                    }
                    setShowAddDashboardPanel(true)
                  }
                }}
              >
                <img src={widgetsIcon} alt="widgets" className="affordance-icon" />
                <div className="affordance-text">Add Viewpack or Widget</div>
              </div>
            </div>
          )}

          {/* Add Dashboard Panel */}
          {showAddDashboardPanel && (() => {
            const gridInfo = getGridInfo()
            const padT = gridInfo?.padT ?? 0
            return (
              <div className="add-dashboard-panel">
                {/* Viewpack Info Tooltip */}
                {!isAddDashboardPanelAnimating && hoveredItemId && (() => {
                  // 썸네일 이미지 결정: 1) 매칭되는 파일, 2) viewpack-item-icon
                  const thumbnailSrc = getViewpackThumbnailByTitle(hoveredItemInfo?.title) || hoveredItemInfo?.icon
                  
                  return (
                    <div 
                      className="viewpack-info"
                      style={{
                        top: `${hoveredItemPosition.top}px`,
                        left: `${hoveredItemPosition.left}px`
                      }}
                    >
                      <div className="viewpack-info-content-container">
                        <div className="viewpack-info-thumbnail">
                          <img src={thumbnailSrc} alt="thumbnail" />
                        </div>
                        <div className="viewpack-info-contents">
                          <div className="viewpack-info-title-description">
                            <div className="viewpack-info-title">
                              {hoveredItemInfo?.title || 'Viewpack Title'}
                            </div>
                            {hoveredItemInfo?.description && (
                              <div className="viewpack-info-description">
                                {hoveredItemInfo.description}
                              </div>
                            )}
                          </div>
                          {hoveredItemInfo?.tags && hoveredItemInfo.tags.length > 0 && (
                            <div className="viewpack-info-tags">
                              {hoveredItemInfo.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="viewpack-info-tag"
                                  style={getTagStyle(tag)}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Dashboard Info Tooltip (Figma node: 10:3663) */}
                {activeTab === 'dashboard' && hoveredDashboardItemId && (
                  <div
                    ref={dashboardInfoRef}
                    className="dashboard-info"
                    style={{
                      top: `${hoveredDashboardItemPosition.top}px`,
                      left: `${hoveredDashboardItemPosition.left}px`,
                    }}
                  >
                    <div className="dashboard-info-content-container">
                      <div className="dashboard-info-thumbnail">
                        {hoveredDashboardItemInfo?.thumbnail ? (
                          <img src={hoveredDashboardItemInfo.thumbnail} alt="thumbnail" />
                        ) : (
                          <img src={hoveredDashboardItemInfo?.icon || databaseIcon} alt="icon" width="28" height="28" />
                        )}
                      </div>
                      <div className="dashboard-info-contents">
                        <div className="dashboard-info-title">
                          {hoveredDashboardItemInfo?.title || 'Dashboard Title'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              <div className="add-dashboard-modal">
                <div className="add-dashboard-header">
                  <h3>대시보드에 추가</h3>
                  <button className="close-btn" onClick={() => setShowAddDashboardPanel(false)}>
                    <img src={closeIcon} alt="close" width="20" height="20" />
                  </button>
                </div>
                <div className="add-dashboard-tabs">
                  <button
                    className={`tab ${activeTab === 'viewpack' ? 'active' : ''}`}
                    onClick={() => setActiveTab('viewpack')}
                  >
                    뷰팩
                  </button>
                  <button
                    className={`tab ${activeTab === 'widget' ? 'active' : ''}`}
                    onClick={() => setActiveTab('widget')}
                  >
                    위젯
                  </button>
                  <button
                    className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    대시보드
                  </button>
                </div>
                <div className="viewpack-search-wrapper" ref={viewpackSearchRef}>
                  <div className="viewpack-search">
                    <div className="viewpack-search-input-wrapper">
                      <img src={searchIcon} alt="search" width="16" height="16" />
                      <input type="text" placeholder="Search" />
                    </div>
                    {activeTab === 'viewpack' && (
                      <button
                        ref={viewpackFilterButtonRef}
                        className={`icon-btn viewpack-filter-toggle ${isViewpackTagFilterOpen || selectedViewpackTags.length > 0 ? 'selected' : ''}`}
                        type="button"
                        onClick={() => {
                          setIsViewpackTagFilterOpen(prev => {
                            const next = !prev
                            if (next) {
                              // 렌더 후 정확한 위치 계산
                              requestAnimationFrame(updateTagFilterPosition)
                            }
                            return next
                          })
                        }}
                      >
                        <img src={filterListIcon} alt="filter" width="16" height="16" />
                      </button>
                    )}
                  </div>
                  {activeTab === 'viewpack' && isViewpackTagFilterOpen && typeof document !== 'undefined' && createPortal(
                    <div
                      className="viewpack-tag-filter-popover"
                      style={{
                        top: `${tagFilterPosition.top}px`,
                        left: `${tagFilterPosition.left}px`,
                      }}
                    >
                      <ViewpackTagFilter
                        selectedTags={selectedViewpackTags}
                        onToggleTag={(tag) => {
                          setSelectedViewpackTags(prev =>
                            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                          )
                        }}
                      />
                    </div>,
                    document.body
                  )}
                </div>
                <div 
                  ref={viewpackListRef}
                  className="viewpack-list"
                  style={{
                    '--scrollbar-default': `url("${getScrollbarSVGPath(scrollbarState.percent, scrollbarState.position, 'Default')}")`,
                    '--scrollbar-hovered': `url("${getScrollbarSVGPath(scrollbarState.percent, scrollbarState.position, 'hovered')}")`,
                    '--scrollbar-pressed': `url("${getScrollbarSVGPath(scrollbarState.percent, scrollbarState.position, 'pressed')}")`
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
                  {activeTab === 'viewpack' && (
                    <ViewpackList 
                      onAddWidget={addWidget}
                      onItemHover={handleItemMouseEnter}
                      onItemLeave={handleItemMouseLeave}
                      selectedTags={selectedViewpackTags}
                    />
                  )}
                  {activeTab === 'widget' && (
                    <WidgetList 
                      onAddWidget={addWidget}
                      scrollbarState={widgetScrollbarState}
                      onScrollbarStateChange={setWidgetScrollbarState}
                      getScrollbarSVGPath={getScrollbarSVGPath}
                    />
                  )}
                  {activeTab === 'dashboard' && (
                    <DashboardList 
                      scrollbarState={dashboardScrollbarState}
                      onScrollbarStateChange={setDashboardScrollbarState}
                      onItemHover={handleDashboardItemMouseEnter}
                      onItemLeave={handleDashboardItemMouseLeave}
                      getScrollbarSVGPath={getScrollbarSVGPath}
                      getDashboardThumbnailByTitle={getDashboardThumbnailByTitle}
                    />
                  )}
                </div>
              </div>
            </div>
            )
          })()}

          {/* Variable Filter Panel */}
          {showVariableFilterPanel && (() => {
            const gridInfo = getGridInfo()
            const padT = gridInfo?.padT ?? 0
            return (
              <div ref={variableFilterPanelRef} className="variable-filter-panel" style={{ top: `${padT}px` }}>
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
                        <button className="variable-filter-edit-btn">변수 편집</button>
                      </div>
                    </div>
                  </div>
                </VariableFilterDrawer>
              </div>
            )
          })()}

          {showSettingsPanel && (
            <UsageSettingsPanel settings={settings} onToggleSetting={handleToggleSetting} />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditMode
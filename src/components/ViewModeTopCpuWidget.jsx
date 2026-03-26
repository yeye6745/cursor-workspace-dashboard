import kebabIcon from '../assets/figma/icon/kebab.svg'
import contentContainer from '../assets/figma/widgets/Content Container.svg'

export default function ViewModeTopCpuWidget() {
  // 편집모드 기준: defaultCols = 8, defaultRows = 18
  // ROW_REAL_STEP = 16, GAP = 8
  // 위젯 패딩 = 4px
  // 대략적인 픽셀 크기 계산 (뷰모드용 고정값)
  const widgetWidth = 400 // 8컬럼 대략 크기
  const widgetHeight = 18 * 16 // 18 rows * 16px = 288px

  return (
    <div 
      className="viewmode-top-widget widget-item"
      style={{
        width: `${widgetWidth}px`,
        height: `${widgetHeight}px`
      }}
    >
      <div className="widget-content">
        <div className="widget-header">
          <span className="widget-title">Top 5 CPU Usage(%)</span>
          <button className="widget-header-more-btn" type="button">
            <img src={kebabIcon} alt="more" width="16" height="16" />
          </button>
        </div>
        <div className="widget-body">
          <div className="widget-inner has-content">
            <img
              src={contentContainer}
              alt="모니터링 대상 컨텐츠"
              className="widget-content-container"
              />
          </div>
        </div>
      </div>
    </div>
  )
}

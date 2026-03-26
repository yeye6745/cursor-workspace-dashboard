import { useEffect, useRef, useState } from 'react'

import chevronDownIcon from '../assets/figma/icon/chevron-down.svg'
import chevronRightIcon from '../assets/figma/icon/chevron-right.svg'

import uploadIcon from '../assets/figma/icon/upload.svg'
import editIcon from '../assets/figma/icon/edit.svg'
import deleteIcon from '../assets/figma/icon/delete.svg'

import viewpackEqualizerIcon from '../assets/figma/viewpacks/equalizer.svg'
import viewpackBarIcon from '../assets/figma/viewpacks/bar.svg'
import viewpackTableIcon from '../assets/figma/viewpacks/table.svg'
import viewpackGroupIcon from '../assets/figma/viewpacks/group.svg' 
import viewpackTimeseriesIcon from '../assets/figma/viewpacks/timeseries.svg'
import viewpackStatusSummaryIcon from '../assets/figma/viewpacks/status-summary.svg'
import viewpackLineIcon from '../assets/figma/viewpacks/line.svg'
import viewpackPieIcon from '../assets/figma/viewpacks/pie.svg'

import infrastructureIcon from '../assets/figma/icon/infrastructure-dashboard.svg'
import kubernetesIcon from '../assets/figma/icon/kubernetes-k8s-dashboard.svg'
import mysqlIcon from '../assets/figma/icon/mysql.svg'
import oracleIcon from '../assets/figma/icon/oracle.svg'
import postgreSqlIcon from '../assets/figma/icon/postgre-sql.svg'
import redisIcon from '../assets/figma/icon/redis.svg'
import databaseIcon from '../assets/figma/icon/database-dashboard.svg'

import groupIcon from '../assets/figma/widgets/group.svg'
import tapGroupIcon from '../assets/figma/widgets/tap-group.svg'
import timeseriesIcon from '../assets/figma/widgets/timeseries.svg'
import scatterIcon from '../assets/figma/widgets/scatter.svg'
import dayCompareIcon from '../assets/figma/widgets/day-compare.svg'
import equalizerIcon from '../assets/figma/widgets/equalizer.svg'
import pieIcon from '../assets/figma/widgets/pie.svg'
import stackedbarIcon from '../assets/figma/widgets/stackedbar.svg'
import gaugeCircleIcon from '../assets/figma/widgets/gauge-circle.svg'
import heatmapIcon from '../assets/figma/widgets/heatmap.svg'
import actionViewIcon from '../assets/figma/widgets/action-view.svg'
import scoreboardIcon from '../assets/figma/widgets/scoreboard.svg'
import treeGridIcon from '../assets/figma/widgets/tree-grid.svg'
import topListIcon from '../assets/figma/widgets/top-list.svg'
import exclusiveIcon from '../assets/figma/widgets/exclusive.svg'
import statusIcon from '../assets/figma/widgets/status.svg'
import statusSummaryIcon from '../assets/figma/widgets/status-summary.svg'
import topologyIcon from '../assets/figma/widgets/topology.svg'
import cardIcon from '../assets/figma/widgets/card.svg'
import severIcon from '../assets/figma/widgets/sever.svg'
import clusterIcon from '../assets/figma/widgets/cluster.svg'
import alertCardfeedIcon from '../assets/figma/widgets/alert-cardfeed.svg'

export function ViewpackList({ onAddWidget, onItemHover, onItemLeave, selectedTags = [] }) {
  const initialCategories = [
    {
      name: '커스텀 뷰팩',
      count: '3',
      expanded: true,
      items: [
        { name: 'Top 5 CPU Usage(%)', icon: 'bar', creator: '김예진', description: 'CPU 사용률 상위 5개를 보여주는 뷰팩입니다.' },
        { name: 'Top 5 Memory Usage(%)', icon: 'bar', creator: '박신영', description: '메모리 사용률 상위 5개를 보여주는 뷰팩입니다.' },
        { name: 'DB 상태 그룹 위젯', icon: 'group', creator: '마스터', description: 'DB 상태를 그룹으로 보여주는 뷰팩입니다.' },
      ],
    },
    {
      name: '인프라스트럭쳐',
      count: '3',
      expanded: true,
      items: [
        { name: 'Host 주요 성능 Top5', icon: 'group', description: 'Top 리소스 사용 Host 리스트' },
        { name: 'Host 주요 성능 지표', icon: 'group', description: 'Host의 Disk, IOPS, Network 정보' },
        { name: 'Host 주요 성능 추이 ', icon: 'timeseries', description: 'Host의 CPU, Memory, Disk 사용량' },
      ],
    },
    {
      name: '쿠버네티스',
      count: '10',
      expanded: true,
      items: [
        { name: 'Active Pod 개수', icon: 'timeseries' },
        { name: 'Cluster Fail Reason 현황', icon: 'timeseries' },
        { name: 'Cluster 리소스 현황', icon: 'timeseries' },
        { name: 'Container 종합 현황판', icon: 'statusSummary' },
        { name: 'Container 주요 지표', icon: 'pie' },
        { name: 'Node Network I/O', icon: 'table' },
        { name: 'Node 종합 현황판', icon: 'timeseries' },
        { name: 'Pod 종합 현황판', icon: 'pie' },
        { name: 'Top 리소스 Pod', icon: 'table' },
        { name: '쿠버네티스 종합 현황판', icon: 'line' }
      ],
    },
    {
      name: '애플리케이션',
      count: '8',
      expanded: true,
      items: [
        { name: 'Active Transaction 현황', icon: 'timeseries' },
        { name: 'Application 성능 지표', icon: 'timeseries' },
        { name: 'JVM CG 지표', icon: 'line' },
        { name: 'JVM Heap 지표 ', icon: 'pie' },
        { name: 'Java DB Connection 정보', icon: 'table' },
        { name: 'Python Garbage Collection 지표', icon: 'line' },
        { name: 'Python 성능 지표', icon: 'pie' },
        { name: 'Python 트랜잭션 지표', icon: 'table' },
      ],
    },
    {
      name: '데이터베이스',
      count: '29',
      expanded: true,
      items: [
        {
          name: 'Common',
          count: '2',
          expanded: true,
          subItems: [
            { name: 'DB 상태 현황', icon: 'group' },
            { name: 'DB OS 주요 성능 지표 (AWS)', icon: 'timeseries' },
          ],
        },
        {
          name: 'PostgreSQL',
          count: '6',
          expanded: true,
          subItems: [
            { name: 'PostgreSQL SQL 수행 현황', icon: 'group' },
            { name: 'PostgreSQL Temp 현황', icon: 'timeseries' },
            { name: 'PostgreSQL Vacuum & Object', icon: 'group' },
            { name: 'PostgreSQL 액티브 백엔드', icon: 'table' },
            { name: 'PostgreSQL 주요 지표', icon: 'group' },
            { name: 'PostgreSQL 주요 성능 지표 추이', icon: 'table' },
          ],
        },
        {
          name: 'MySQL',
          count: '7',
          expanded: true,
          subItems: [
            { name: 'MySQL Lock 현황', icon: 'timeseries' },
            { name: 'MySQL Sorting', icon: 'table' },
            { name: 'MySQL Top 테이블 사용리스트', icon: 'table' },
            { name: 'MySQL 주요 성능 지표 추이 1', icon: 'timeseries' },
            { name: 'MySQL 주요 성능 지표 추이 2', icon: 'timeseries' },
            { name: 'MySQL 주요 지표', icon: 'timeseries' },
            { name: 'MySQL 테이블스페이스', icon: 'table' },
          ],
        },
        {
          name: 'Oracle',
          count: '7',
          expanded: true,
          subItems: [
            { name: 'Oracle Lock 현황 1', icon: 'group' },
            { name: 'Oracle Lock 현황 2', icon: 'timeseries' },
            { name: 'Oracle SQL 수행 현황', icon: 'group' },
            { name: 'Oracle 세션 수행 현황', icon: 'group' },
            { name: 'Oracle 주요 성능 지표 추이 1', icon: 'timeseries' },
            { name: 'Oracle 테이블스페이스', icon: 'table' },
            { name: 'MySQL 테이블 최근 변경 이력', icon: 'table' },
          ],
        },
      ],
    },
  ]

  const [categories, setCategories] = useState(initialCategories)

  const viewpackIconMap = {
    equalizer: viewpackEqualizerIcon,
    bar: viewpackBarIcon,
    table: viewpackTableIcon,
    group: viewpackGroupIcon,
    timeseries: viewpackTimeseriesIcon,
    statusSummary: viewpackStatusSummaryIcon,
    pie: viewpackPieIcon,
    line: viewpackLineIcon,
  }

  const toggleCategory = (categoryIdx) => {
    setCategories((prev) =>
      prev.map((cat, idx) => (idx === categoryIdx ? { ...cat, expanded: !cat.expanded } : cat))
    )
  }

  const toggleSubCategory = (categoryIdx, itemIdx) => {
    setCategories((prev) =>
      prev.map((cat, cIdx) => {
        if (cIdx !== categoryIdx) return cat
        return {
          ...cat,
          items: cat.items.map((item, iIdx) =>
            iIdx === itemIdx && item.subItems ? { ...item, expanded: !item.expanded } : item
          ),
        }
      })
    )
  }

  const getItemId = (categoryIdx, itemIdx, subIdx = null) =>
    subIdx !== null
      ? `category-${categoryIdx}-item-${itemIdx}-sub-${subIdx}`
      : `category-${categoryIdx}-item-${itemIdx}`

  return (
    <div className="viewpack-list-container">
      {categories
        .filter((category) => !selectedTags.length || selectedTags.includes(category.name))
        .map((category, idx) => (
          <div key={idx} className="viewpack-category">
            <div className="viewpack-list-name">
              <div
                className="category-header"
                onClick={() => toggleCategory(idx)}
                style={{ cursor: 'pointer', flex: 1 }}
              >
                {category.expanded ? (
                  <img src={chevronDownIcon} alt="chevron down" width="20" height="20" />
                ) : (
                  <img src={chevronRightIcon} alt="chevron right" width="20" height="20" />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">({category.count})</span>
                </div>
              </div>
              {category.name === '커스텀 뷰팩' && (
                <button className="how-to-create-btn">어떻게 만드나요?</button>
              )}
            </div>

            {category.expanded && category.items?.length > 0 && (
              <div className="viewpack-list-items">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    {item.subItems ? (
                      <div className="sub-category">
                        <div
                          className="sub-category-header"
                          onClick={() => toggleSubCategory(idx, itemIdx)}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.expanded ? (
                            <img src={chevronDownIcon} alt="chevron down" width="20" height="20" />
                          ) : (
                            <img src={chevronRightIcon} alt="chevron right" width="20" height="20" />
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="sub-category-name">{item.name}</span>
                            {item.count && <span className="sub-category-count">({item.count})</span>}
                          </div>
                        </div>

                        {item.expanded && item.subItems && (
                          <div className="sub-category-items">
                            {item.subItems.map((subItem, subIdx) => {
                              const itemId = getItemId(idx, itemIdx, subIdx)
                              return (
                                <div
                                  key={subIdx}
                                  className="viewpack-item"
                                  onClick={() => onAddWidget && onAddWidget(subItem.name, subItem.icon)}
                                  onMouseEnter={(e) =>
                                    onItemHover &&
                                    onItemHover(
                                      itemId,
                                      {
                                        title: subItem.name,
                                        description: subItem.description,
                                        tags: [category.name, item.name],
                                        icon: viewpackIconMap[subItem.icon],
                                      },
                                      e
                                    )
                                  }
                                  onMouseLeave={() => onItemLeave && onItemLeave()}
                                >
                                  <div className="viewpack-item-icon-bg">
                                    {viewpackIconMap[subItem.icon] ? (
                                      <img src={viewpackIconMap[subItem.icon]} alt={subItem.name} width="24" height="24" />
                                    ) : (
                                      <div className="viewpack-item-icon"></div>
                                    )}
                                  </div>
                                  <div className="viewpack-item-name">
                                    <div className="viewpack-item-title">{subItem.name}</div>
                                    {subItem.description && <div className="viewpack-item-creater">{subItem.description}</div>}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      (() => {
                        const itemId = getItemId(idx, itemIdx)
                        return (
                          <div
                            key={itemIdx}
                            className={`viewpack-item ${category.name === '커스텀 뷰팩' ? 'custom-viewpack-item' : ''}`}
                            onClick={() => onAddWidget && onAddWidget(item.name, item.icon)}
                            onMouseEnter={(e) => {
                              const itemInfo = {
                                title: item.name,
                                description: item.description,
                                tags: [category.name],
                                icon: viewpackIconMap[item.icon],
                              }
                              onItemHover && onItemHover(itemId, itemInfo, e)
                            }}
                            onMouseLeave={() => onItemLeave && onItemLeave()}
                          >
                            <div className="viewpack-item-icon-bg">
                              {viewpackIconMap[item.icon] ? (
                                <img src={viewpackIconMap[item.icon]} alt={item.name} width="24" height="24" />
                              ) : (
                                <div className="viewpack-item-icon"></div>
                              )}
                            </div>
                            <div className="viewpack-item-name">
                              <div className="viewpack-item-title">{item.name}</div>
                              {category.name === '커스텀 뷰팩' && item.creator && (
                                <div className="viewpack-item-creater">{item.creator}</div>
                              )}
                            </div>
                            {category.name === '커스텀 뷰팩' && (
                              <div className="viewpack-item-actions">
                                <button
                                  className="viewpack-action-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                  }}
                                >
                                  <img src={uploadIcon} alt="upload" width="16" height="16" />
                                </button>
                                <button
                                  className="viewpack-action-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                  }}
                                >
                                  <img src={editIcon} alt="edit" width="16" height="16" />
                                </button>
                                <button
                                  className="viewpack-action-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                  }}
                                >
                                  <img src={deleteIcon} alt="delete" width="16" height="16" />
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      })()
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export function DashboardList({
  scrollbarState,
  onScrollbarStateChange,
  onItemHover,
  onItemLeave,
  getScrollbarSVGPath,
  getDashboardThumbnailByTitle,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const containerEl = containerRef.current
    if (!containerEl) return

    const updateScrollbarState = () => {
      const scrollTop = containerEl.scrollTop
      const scrollHeight = containerEl.scrollHeight
      const clientHeight = containerEl.clientHeight
      const maxScroll = scrollHeight - clientHeight

      if (maxScroll <= 0) {
        onScrollbarStateChange && onScrollbarStateChange({ percent: 100, position: 'Center', hoverState: 'Default' })
        return
      }

      const thumbHeight = (clientHeight / scrollHeight) * 100
      const scrollPercent = (scrollTop / maxScroll) * 100
      let position = 'Center'
      if (scrollPercent < 10) position = 'top'
      else if (scrollPercent > 90) position = 'bottom'

      onScrollbarStateChange &&
        onScrollbarStateChange((prev) => ({
          percent: thumbHeight,
          position,
          hoverState: prev?.hoverState || 'Default',
        }))
    }

    updateScrollbarState()
    containerEl.addEventListener('scroll', updateScrollbarState)
    const resizeObserver = new ResizeObserver(updateScrollbarState)
    resizeObserver.observe(containerEl)

    return () => {
      containerEl.removeEventListener('scroll', updateScrollbarState)
      resizeObserver.disconnect()
    }
  }, [onScrollbarStateChange])

  const categories = [
    {
      name: '인프라스트럭쳐',
      items: [
        { name: 'Kafka 통합 모니터링', icon: infrastructureIcon },
        { name: 'Host Application DB 통합 모니터링', icon: infrastructureIcon },
        { name: 'Host Stat Report - Weekly', icon: infrastructureIcon },
        { name: 'Host 성능 모니터링', icon: infrastructureIcon },
        { name: 'Host 시스템 리소스', icon: infrastructureIcon },
      ],
    },
    {
      name: '쿠버네티스',
      items: [
        { name: 'Cluster 리소스 대시보드', icon: kubernetesIcon },
        { name: 'K8S Alarm Analysis For Report', icon: kubernetesIcon },
      ],
    },
    {
      name: '데이터베이스',
      items: [
        { name: 'MySQL 통합 대시보드', icon: mysqlIcon },
        { name: 'MySQL 세션 대시보드', icon: mysqlIcon },
        { name: 'Oracle 세션 모니터링', icon: oracleIcon },
        { name: 'Oracle 시스템 리소스', icon: oracleIcon },
        { name: 'PostgreSQL 통합 대시보드', icon: postgreSqlIcon },
        { name: 'Redis 통합 대시보드', icon: redisIcon },
        { name: 'Redis 시스템 리소스', icon: redisIcon },
        { name: '통합 모니터링 대시보드', icon: databaseIcon },
      ],
    },
  ]

  return (
    <div className="dashboard-list-container">
      {categories.map((category, idx) => (
        <div key={idx} className="dashboard-category">
          <div className="dashboard-category-header">
            <span className="dashboard-category-name">{category.name}</span>
          </div>
          <div
            ref={idx === 0 ? containerRef : null}
            className="dashboard-category-items"
            style={
              idx === 0
                ? {
                    '--scrollbar-default': `url("${getScrollbarSVGPath(scrollbarState?.percent || 100, scrollbarState?.position || 'Center', 'Default')}")`,
                    '--scrollbar-hovered': `url("${getScrollbarSVGPath(scrollbarState?.percent || 100, scrollbarState?.position || 'Center', 'hovered')}")`,
                    '--scrollbar-pressed': `url("${getScrollbarSVGPath(scrollbarState?.percent || 100, scrollbarState?.position || 'Center', 'pressed')}")`,
                  }
                : {}
            }
            onMouseEnter={
              idx === 0
                ? (e) => {
                    e.currentTarget.classList.add('hovered')
                    onScrollbarStateChange && onScrollbarStateChange((prev) => ({ ...prev, hoverState: 'hovered' }))
                  }
                : undefined
            }
            onMouseLeave={
              idx === 0
                ? (e) => {
                    e.currentTarget.classList.remove('hovered')
                    onScrollbarStateChange && onScrollbarStateChange((prev) => ({ ...prev, hoverState: 'Default' }))
                  }
                : undefined
            }
          >
            {category.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="dashboard-item"
                onMouseEnter={(e) =>
                  onItemHover &&
                  onItemHover(
                    `${idx}-${itemIdx}`,
                    { title: item.name, thumbnail: getDashboardThumbnailByTitle(item.name), icon: item.icon },
                    e
                  )
                }
                onMouseLeave={() => onItemLeave && onItemLeave()}
              >
                <div className="dashboard-item-icon">
                  <img src={item.icon} alt={item.name} width="16" height="16" />
                </div>
                <span className="dashboard-item-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function WidgetList({ onAddWidget, scrollbarState, onScrollbarStateChange, getScrollbarSVGPath }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const containerEl = containerRef.current
    if (!containerEl) return

    const updateScrollbarState = () => {
      const scrollTop = containerEl.scrollTop
      const scrollHeight = containerEl.scrollHeight
      const clientHeight = containerEl.clientHeight
      const maxScroll = scrollHeight - clientHeight

      if (maxScroll <= 0) {
        onScrollbarStateChange && onScrollbarStateChange({ percent: 100, position: 'Center', hoverState: 'Default' })
        return
      }

      const thumbHeight = (clientHeight / scrollHeight) * 100
      const scrollPercent = (scrollTop / maxScroll) * 100
      let position = 'Center'
      if (scrollPercent < 10) position = 'top'
      else if (scrollPercent > 90) position = 'bottom'

      onScrollbarStateChange &&
        onScrollbarStateChange((prev) => ({
          percent: thumbHeight,
          position,
          hoverState: prev?.hoverState || 'Default',
        }))
    }

    updateScrollbarState()
    containerEl.addEventListener('scroll', updateScrollbarState)
    const resizeObserver = new ResizeObserver(updateScrollbarState)
    resizeObserver.observe(containerEl)

    return () => {
      containerEl.removeEventListener('scroll', updateScrollbarState)
      resizeObserver.disconnect()
    }
  }, [onScrollbarStateChange])

  const iconMap = {
    group: groupIcon,
    'tap-group': tapGroupIcon,
    timeseries: timeseriesIcon,
    scatter: scatterIcon,
    'day-compare': dayCompareIcon,
    equalizer: equalizerIcon,
    pie: pieIcon,
    stackedbar: stackedbarIcon,
    'gauge-circle': gaugeCircleIcon,
    heatmap: heatmapIcon,
    'action-view': actionViewIcon,
    scoreboard: scoreboardIcon,
    'tree-grid': treeGridIcon,
    'top-list': topListIcon,
    exclusive: exclusiveIcon,
    status: statusIcon,
    'status-summary': statusSummaryIcon,
    topology: topologyIcon,
    sever: severIcon,
    cluster: clusterIcon,
    'alert-cardfeed': alertCardfeedIcon,
    card: cardIcon,
  }

  const sections = [
    {
      name: '그룹 위젯 만들기',
      hasButton: true,
      buttonText: '어떻게 만드나요?',
      items: [
        { name: '그룹', icon: 'group' },
        { name: '탭 그룹', icon: 'tap-group' },
      ],
    },
    {
      name: '그래프',
      items: [
        { name: '타임시리즈', icon: 'timeseries' },
        { name: '스캐터', icon: 'scatter' },
        { name: '일일 비교', icon: 'day-compare' },
        { name: '이퀄라이저', icon: 'equalizer' },
        { name: '파이', icon: 'pie' },
        { name: '누적 바', icon: 'stackedbar' },
        { name: '게이지', icon: 'gauge-circle' },
        { name: '히트맵', icon: 'heatmap' },
        { name: '액션 뷰', icon: 'action-view' },
        { name: '스코어보드', icon: 'scoreboard' },
      ],
    },
    {
      name: '목록',
      items: [
        { name: '트리 그리드', icon: 'tree-grid' },
        { name: '상위 리스트', icon: 'top-list' },
      ],
    },
    {
      name: '아키텍쳐',
      items: [
        { name: '대상 전용 뷰', icon: 'exclusive' },
        { name: '상태(이벤트)', icon: 'status' },
        { name: '상태 서머리', icon: 'status-summary' },
        { name: '토폴로지', icon: 'topology' },
        { name: '서버', icon: 'sever' },
        { name: '클러스터', icon: 'cluster' },
        { name: '알람', icon: 'alert-cardfeed' },
      ],
    },
    {
      name: '비즈니스',
      items: [{ name: '카드', icon: 'card' }],
    },
  ]

  return (
    <div className="widget-list-container">
      {sections.map((section, idx) => (
        <div key={idx} className="widget-section">
          <div className="widget-section-header">
            <span className="widget-section-name">{section.name}</span>
            {section.hasButton && <button className="how-to-create-btn">{section.buttonText}</button>}
          </div>
          <div
            ref={idx === 0 ? containerRef : null}
            className="widget-type-container"
            style={
              idx === 0
                ? {
                    '--scrollbar-default': `url("${getScrollbarSVGPath(scrollbarState?.percent || 100, scrollbarState?.position || 'Center', 'Default')}")`,
                    '--scrollbar-hovered': `url("${getScrollbarSVGPath(scrollbarState?.percent || 100, scrollbarState?.position || 'Center', 'hovered')}")`,
                    '--scrollbar-pressed': `url("${getScrollbarSVGPath(scrollbarState?.percent || 100, scrollbarState?.position || 'Center', 'pressed')}")`,
                  }
                : {}
            }
            onMouseEnter={
              idx === 0
                ? (e) => {
                    e.currentTarget.classList.add('hovered')
                    onScrollbarStateChange && onScrollbarStateChange((prev) => ({ ...prev, hoverState: 'hovered' }))
                  }
                : undefined
            }
            onMouseLeave={
              idx === 0
                ? (e) => {
                    e.currentTarget.classList.remove('hovered')
                    onScrollbarStateChange && onScrollbarStateChange((prev) => ({ ...prev, hoverState: 'Default' }))
                  }
                : undefined
            }
          >
            <div className="widget-type-grid">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`widget-type-card ${item.disabled ? 'disabled' : ''}`}
                  onClick={() => !item.disabled && onAddWidget && onAddWidget(item.name, item.icon)}
                >
                  <div className="widget-type-button">
                    <div className="widget-type-icon">
                      {iconMap[item.icon] ? (
                        <img src={iconMap[item.icon]} alt={item.name} width="50" height="50" />
                      ) : (
                        <div className="widget-icon-placeholder"></div>
                      )}
                    </div>
                  </div>
                  <span className="widget-type-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


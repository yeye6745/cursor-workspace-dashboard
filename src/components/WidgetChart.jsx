import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// ECharts 모듈 등록
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

// SVG에서 추출한 색상 정보
const CHART_COLORS = {
  bar: ['#1A5EE6', '#27D9A9', '#7AD927', '#47B4EB', '#E45EED'], // PR11, PR20, PR40, C00, C80 순서
  equalizer: ['#1A5EE6', '#27D9A9', '#7AD927', '#47B4EB', '#E45EED'],
  pie: ['#1A5EE6', '#27D9A9', '#7AD927', '#47B4EB', '#E45EED'],
  timeseries: ['#1A5EE6', '#27D9A9', '#7AD927', '#47B4EB', '#E45EED'],
}

export default function WidgetChart({ icon, selectedTargets = [] }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current || selectedTargets.length === 0) return

    // 차트 인스턴스 생성
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current)
    }

    // 선택된 대상의 이름 추출
    const targetNames = selectedTargets.map(target => {
      // "Category::TargetName" 형태에서 TargetName만 추출
      if (target.includes('::')) {
        const parts = target.split('::')
        return parts[1] === '*' ? `${parts[0]}:*` : parts[1]
      }
      return target
    })

    // 더미 데이터 생성
    const dummyData = targetNames.map(() => Math.floor(Math.random() * 100))

    let option = null

    switch (icon) {
      case 'bar':
        option = {
          grid: {
            left: 40,
            right: 20,
            top: 20,
            bottom: 30,
          },
          xAxis: {
            type: 'category',
            data: targetNames,
            axisLine: {
              lineStyle: {
                color: '#D8DBDE',
              },
            },
            axisLabel: {
              color: '#626872',
              fontSize: 11,
              rotate: 0,
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: '#D8DBDE',
              },
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#626872',
              fontSize: 11,
            },
            splitLine: {
              lineStyle: {
                color: '#D8DBDE',
                type: 'solid',
              },
            },
          },
          series: [
            {
              data: dummyData,
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                color: (params) => {
                  return CHART_COLORS.bar[params.dataIndex % CHART_COLORS.bar.length]
                },
                borderRadius: [2, 2, 0, 0],
              },
              label: {
                show: false,
              },
            },
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
        }
        break

      case 'equalizer':
        option = {
          grid: {
            left: 40,
            right: 20,
            top: 20,
            bottom: 30,
          },
          xAxis: {
            type: 'category',
            data: targetNames,
            axisLine: {
              lineStyle: {
                color: '#D8DBDE',
              },
            },
            axisLabel: {
              color: '#626872',
              fontSize: 11,
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#626872',
              fontSize: 11,
            },
            splitLine: {
              lineStyle: {
                color: '#D8DBDE',
              },
            },
          },
          series: [
            {
              data: dummyData,
              type: 'bar',
              barWidth: '40%',
              itemStyle: {
                color: (params) => {
                  return CHART_COLORS.equalizer[params.dataIndex % CHART_COLORS.equalizer.length]
                },
                borderRadius: [2, 2, 0, 0],
              },
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
        }
        break

      case 'pie':
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: {
              color: '#282C32',
              fontSize: 11,
            },
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 4,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 12,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: targetNames.map((name, index) => ({
                value: dummyData[index],
                name: name,
                itemStyle: {
                  color: CHART_COLORS.pie[index % CHART_COLORS.pie.length],
                },
              })),
            },
          ],
        }
        break

      case 'timeseries':
        option = {
          grid: {
            left: 40,
            right: 20,
            top: 20,
            bottom: 50,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLine: {
              lineStyle: {
                color: '#D8DBDE',
              },
            },
            axisLabel: {
              color: '#626872',
              fontSize: 11,
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#626872',
              fontSize: 11,
            },
            splitLine: {
              lineStyle: {
                color: '#D8DBDE',
              },
            },
          },
          series: targetNames.map((name, index) => ({
            name: name,
            type: 'line',
            smooth: true,
            data: Array(7)
              .fill(0)
              .map(() => Math.floor(Math.random() * 100)),
            lineStyle: {
              width: 2,
              color: CHART_COLORS.timeseries[index % CHART_COLORS.timeseries.length],
            },
            itemStyle: {
              color: CHART_COLORS.timeseries[index % CHART_COLORS.timeseries.length],
            },
            showSymbol: false,
          })),
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            bottom: 0,
            textStyle: {
              color: '#282C32',
              fontSize: 11,
            },
          },
        }
        break

      default:
        option = null
    }

    if (option) {
      chartInstance.current.setOption(option)
    }

    // 창 크기 변경 시 차트 리사이즈
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)

    // ResizeObserver로 위젯 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    })

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeObserver && chartRef.current) {
        resizeObserver.unobserve(chartRef.current)
        resizeObserver.disconnect()
      }
      if (chartInstance.current) {
        chartInstance.current.dispose()
        chartInstance.current = null
      }
    }
  }, [icon, selectedTargets])

  if (selectedTargets.length === 0) {
    return null
  }

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

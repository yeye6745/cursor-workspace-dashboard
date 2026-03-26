import React from 'react'

// 뷰팩 리스트의 실제 카테고리 이름을 태그로 사용
const VIEWPACK_CATEGORY_TAGS = [
  '커스텀 뷰팩',
  '인프라스트럭쳐',
  '쿠버네티스',
  '애플리케이션',
  '데이터베이스',
]

export function ViewpackTagFilter({ selectedTags = [], onToggleTag }) {
  return (
    <div className="viewpack-tag-filter">
      <div className="viewpack-tag-filter-title">
        <div className="viewpack-tag-filter-title-inner">
          <div className="viewpack-tag-filter-title-icon" />
          <div className="viewpack-tag-filter-title-text">태그 필터</div>
        </div>
      </div>
      <div className="viewpack-tag-filter-content">
        {VIEWPACK_CATEGORY_TAGS.map((tag) => {
          const selected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              className={`tag-filter-btn ${selected ? 'selected' : ''}`}
              onClick={() => onToggleTag && onToggleTag(tag)}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}


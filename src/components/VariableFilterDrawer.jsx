import closeIcon from '../assets/figma/icon/close.svg'

export function VariableFilterDrawer({ title = '변수 필터', onClose, children }) {
  return (
    <div className="variable-filter-drawer">
      <div className="variable-filter-header">
        <div className="variable-filter-title">{title}</div>
        <button className="close-btn" onClick={onClose}>
          <img src={closeIcon} alt="close" width="20" height="20" />
        </button>
      </div>
      {children}
    </div>
  )
}


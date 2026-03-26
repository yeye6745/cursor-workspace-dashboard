export function EditModeBar({ onCancel, onSave }) {
  return (
    <div className="edit-mode-bar">
      <div className="edit-mode-title">Edit Mode</div>
      <div className="edit-mode-actions">
        <button className="btn-cancel" onClick={onCancel}>
          취소
        </button>
        <button className="btn-save" onClick={onSave}>
          저장
        </button>
      </div>
    </div>
  )
}


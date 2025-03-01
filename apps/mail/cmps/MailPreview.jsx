export function MailPreview({ mail, onRemove, handleChange }) {
  const { id, createdAt, subject, body, isRead, isStar, isSelected, sentAt, removedAt, from, to } = mail

  let sentFrom = from
  if (mail.from === 'user@appsus.com'){
    sentFrom = `To: ${to}`
  }
  
  // const starActive = isStar ? '\u2B50' : '\u2606'
  const selectActive = isSelected ? 'select-active' : ''

  function onHandleChange({ target }) {
    if (target.type === 'checkbox') {
      handleChange({ target })
      return
    }

    let { id, name, value } = target.dataset

    value = value === 'true' ? false : true
    target = { dataset: { id }, name, value }

    handleChange({ target })
  }

 

    return (
      <div className="mail-item">
        <input
          type="checkbox"
          name="isSelected"
          checked={isSelected || false}
          className="mail-checkbox"
          data-id={id}
          onChange={onHandleChange}
        />
        <span
          className={`mail-star ${isStar ? 'starred' : ''}`}
          data-id={id}
          data-name="isStar"
          data-value={isStar || false}
          value={isStar || false}
          onClick={onHandleChange}
        >
          {/* {starActive} */}
          {isStar ? '⭐' : '☆'}
        </span>
        <span className="mail-from">{sentFrom}</span>
        <span className="mail-subject">{subject}</span>
        <span className="mail-body">{body}</span>
        {/* createdAt || sentAt */}

        <span className="mail-date">{new Date(createdAt).toLocaleDateString('he')}</span>

        <button className="mail-remove-btn" onClick={() => onRemove(id)}>
          <img src="/apps/mail/img/icon/trash.png" alt="icon-img" className="trash-icon" />
        </button>
      </div>
    )
}

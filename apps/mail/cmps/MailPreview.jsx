export function MailPreview({mail, onRemove, handleChange}) {

    const { id, createdAt, subject, body, isRead, isStar, isSelected, sentAt, removedAt, from, to } = mail

    // const starActive = isStar ? '\u2B50' : '\u2606'
    const selectActive = isSelected ? 'select-active' : ''

    

    return (
      <div className="mail-item">
        {/* <div key={id} onClick={() => function()}> */}
        {/* In the function I change the isRead and go to MailDetails comp */}

        <input
          type="checkbox"
          checked={isSelected || false}
          className="mail-checkbox"
          data-id={id}
          data-type="checkbox"
          data-field="isSelected"
          onChange={handleChange}
        />
        <span
          className={`mail-star ${isStar ? 'starred' : ''}`}
          data-id={id}
          data-field="isStar"
          value={isStar || false}
          onClick={handleChange}
        >
          {/* {starActive} */}
          {isStar ? '⭐' : '☆'}
        </span>
        <span className="mail-from">{from}</span>
        <span className="mail-subject">{subject}</span>
        <span className="mail-body">{body}</span>
        {/* createdAt || sentAt */}
        
        <span className="mail-date">{new Date(createdAt).toLocaleDateString('he')}</span>
      
        <button className="mail-remove-btn" onClick={() => onRemove(id)}>
            <img src="/apps/mail/img/icon/trash.png" alt="icon-img" className="trash-icon"/>
        </button>
      </div>
    )
}

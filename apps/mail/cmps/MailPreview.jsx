
const { useNavigate } = ReactRouterDOM


export function MailPreview({ mail, onRemove, onRead, handleChange, openCompose }) {
  const { id, createdAt, subject, body, isRead, isStar, isSelected, isDraft, sentAt, removedAt, from, to } = mail

  const navigate = useNavigate()

  let sentFrom = from
  if (mail.from === 'user@appsus.com'){
    sentFrom = `To: ${to}`
  }
  
  // const starActive = isStar ? '\u2B50' : '\u2606'
  const selectActive = isSelected ? 'select-active' : ''

  const readIcon = isRead ? 'read': 'unread'

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

  function mailClicked(){
    // if(isDraft && openCompose){
    if(isDraft){
      openCompose(id)
      return
    }
    
    navigate('/mail/details')
  }
 

    return (
      <div className={`mail-item ${isRead ? 'active': ''}`}>
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

        {/* <div onClick={mailClicked}> */}

        <span className="mail-from" onClick={mailClicked}>{sentFrom}</span>
        <span className="mail-subject" onClick={mailClicked}>{subject}</span>
        <span className="mail-body" onClick={mailClicked}>{body}</span>
        {/* createdAt || sentAt */}

        <span className="mail-date" onClick={mailClicked}>{new Date(createdAt).toLocaleDateString('he')} </span>
    
        {/* </div> */}

      <div className="btns-action" >

      <button className="btn-action" onClick={() => onRead(id)}>
      <img src={`/apps/mail/img/icon/${readIcon}.png`} alt="read-unread-icon" className="read-unread-icon" />
      </button>

        <button className="btn-action" onClick={() => onRemove(id)}>
          <img src="/apps/mail/img/icon/trash.png" alt="trash-icon" className="trash-icon" />
        </button>
      </div>

      </div>
    )
}

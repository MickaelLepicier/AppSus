import { mailService } from '../services/mail.service.js'

const { useState, useEffect, useRef } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailCompose() {
  // TODOs
  // Make it happen ;)
  // Edit and Add component

  // this is a modal that is hidden
  // after clicking Compose btn it appear
  // this modal has - form with: to, subject and body
  // add a mail to the list

  // mailService.getEmptyMail

  const [mail, setMail] = useState(mailService.getEmptyMail())

  const { mailId } = useParams()

  const navigate = useNavigate()

  // const header = mail.subject || 'New Message'

  useEffect(() => {
    if (!mailId) return

    loadMail()
  }, [])

  function loadMail() {
    mailService.get(mailId).then(setMail)
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    console.log('submit clicked ')
    // onSend(mail)
    // onClose()
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setMail((prevMail) => ({ ...prevMail, [field]: value }))
  }

  function onClose() {
    //
    navigate('/mail/inbox')
  }

  if (!mail) return <div>Loading...</div>

  return (
    // <section className="mail-edit-container">
    <section className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>'New Message'</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="to"
            placeholder="To"
            value={mail.to || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={mail.subject || ''}
            onChange={handleChange}
            required
          />
          <textarea
            name="body"
            placeholder="Compose your mail..."
            value={mail.body || ''}
            onChange={handleChange}
            required
          />
          <button className="send-btn">Send</button>
        </form>
      </div>
    </section>
  )
}

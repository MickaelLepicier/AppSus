import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect, useRef } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

// const { useNavigate, useSearchParams, Link, Outlet } = ReactRouterDOM

export function MailCompose({ mailId, onClose }) {
  // TODOs
  // Make it happen ;)
  // Edit and Add component

  // this is a modal that is hidden
  // after clicking Compose btn it appear
  // this modal has - form with: to, subject and body
  // add a mail to the list

  const [mail, setMail] = useState(mailService.getEmptyMail())

  console.log('mailId: ', mailId)

  // const { mailId } = useParams()

  // const navigate = useNavigate()

  // const header = mail.subject || 'New Message'

  useEffect(() => {
    if (mailId === 'new') return

    loadMail()
  }, [mailId])

  function loadMail() {
    mailService
      .get(mailId)
      .then(setMail)
      .catch((err) => console.log('Fail to load the mail: ', err))
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    const msg = mailId === 'new' ? 'Added' : 'Updated'

    mailService
      .save(mail)
      .then(() => {
        showSuccessMsg(`The mail is ${msg}`)
        onClose()
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg(`Fail to ${msg} the mail`)
      })
      .finally(onClose)
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setMail((prevMail) => ({ ...prevMail, [field]: value }))
  }

  if (!mail) return <div>Loading...</div>

  // TODO draft, close-btn send them to draft
  // make the height of the textarea to the bottom

  return (
    // <section className="mail-edit-container">
    <section className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{mailId === 'new' ? 'New Message' : 'Edit Message'}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <input type="email" name="to" placeholder="To" value={mail.to || ''} onChange={handleChange} required />
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

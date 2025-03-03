const { useOutletContext, useParams } = ReactRouterDOM

const { useState, useEffect, useRef } = React

export function MailDetails() {
  const { mails, handleChange, onRemove, onRead } = useOutletContext()

  const { mailId } = useParams()

  const mail = mails.find((mail) => mail.id === mailId)

  function onClose() {}

console.log('mail: ',mail);

  // TODO make functions work + Css
  
  if (!mail) return <div>Loading... </div>
  return (
    <section className="mail-details">
    
      <header className="mail-details-header">
        <h2>{mail.subject}</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </header>

    <main>
      <div className="mail-meta">
        <p>
          <strong>From:</strong> {mail.from}
        </p>
        {/* <p>
          <strong>To:</strong> {mail.to}
        </p> */}
        {/* <p className="mail-date">{mail.date}</p> */}
        <p className="mail-date">3\3\2025</p>
      </div>

      <div className="mail-body">
        <p>{mail.body}</p>
      </div>
      </main>
      
      <footer className="mail-actions">
        <button className="action-btn">Reply</button>
        <button className="action-btn">Forward</button>
        <button
          className="action-btn delete"
          onClick={() => console.log('Delete mail')}
        >
          Delete
        </button>
      </footer>
    </section>
  )
}

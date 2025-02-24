import { mailService } from '../services/mail.service.js'
import { MailList } from './MailList.jsx'
import { MailPreview } from './MailPreview.jsx'

//
const { useState, useEffect } = React

export function MailIndex({ mails, setMails }) {
  //   console.log('MailIndex: ', mails)

  function renderMails() {
    // TODO change the malis state instead of creating for each mail new state
    // Orgenize the code with copms

    return mails.map((currMail) => {
      const [mail, setMail] = useState({ ...currMail })
      // console.log('mail: ',mail)

      const { id, createdAt, subject, body, isRead, isStar, isSelected, sentAt, removedAt, from, to } = mail

      // const starActive = isStar ? '\u2B50' : '\u2606'
      const selectActive = isSelected ? 'select-active' : ''

      function handleChange({ target }) {
        let { type, field } = target.dataset

        mail[field] = !mail[field]

        if (type === 'checkbox') mail[field] = target.checked

        setMail((prevMail) => ({ ...prevMail, [field]: mail[field] }))

        mailService
          .save(mail)
          .then((mailSaved) => console.log('The mail has been updated '))
          .catch((err) => console.log('The mail has NOT been updated ', err))

        // TODO:
        // find mail
        // update mail
        // save and return mail

        // render the mail
        // update the mail into the mails service
      }

      return (
        <div key={id}>
          {/* <div key={id} onClick={() => function()}> */}
          {/* In the function I change the isRead and go to MailDetails comp */}

          <input
            type="checkbox"
            checked={isSelected || false}
            className="mail-checkbox"
            data-type="checkbox"
            data-field="isSelected"
            onChange={handleChange}
          />
          <span
            className={`mail-star ${isStar ? 'starred' : ''}`}
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
          <button className="mail-delete" onClick={() => handleDelete(id)}>🗑️</button>
        </div>
      )
    })
  }

  return <section className="container">{renderMails()}</section>
}

/*

{
    id: 'e101',
    createdAt: 1551133930500,    // date at the end
    subject: 'Miss you!',       // Title at the second part
    body: 'Would love to catch up sometimes', // third part
    isRead: false,             // change the background
    isStar: false,            // send to Starred comp
    isSelected: false,       // select the 
    sentAt: 1551133930594,
    removedAt: null,          // send to trash
    from: 'momo@momo.com', // first part
    to: 'user@appsus.com'
  },

  
*/

import { MailList } from './MailList.jsx'
import { MailPreview } from './MailPreview.jsx'

//
const { useState, useEffect } = React

export function MailIndex({ mails, setMails }) {
  //   console.log('MailIndex: ', mails)

  // const [mails, setMails] = useState()

  // renderMails()

  function renderMails() {
    return mails.map((mail) => {
      // console.log('mail: ',mail)

      const {
        id,
        createdAt,
        subject,
        body,
        isRead,
        isStar,
        isSelected,
        sentAt,
        removedAt,
        from,
        to
      } = mail

      //   const starActive = isStar ? '&#11088;' : '&star;'
      const starActive = isStar ? '\u2B50' : '\u2606'
      const selectActive = isSelected ? 'select-active' : ''

      function handleChange({ target }) {
        // console.log('target: ', target.dataset.id)
        let { type, field, value } = target.dataset
        // const id = target.dataset.id

        //  find checked
        if (type === 'checkbox') value = target.checked

        // TODO FIND mail[field] and change its value
        console.log('mail[field]: ', mail[field])

        // console.log('target: ',target)
        // console.log('id: ',id)
        // console.log('type: ',type)
        console.log('field: ', field)
        // console.log('value: ',value)

        // setMails(prevMail)

        // find mail
        // update mail
        // save and return mail
      }

      return (
        <div key={id}>
          {/* <div key={id} onClick={() => function()}> */}
          {/* In the function I change the isRead and go to MailDetails comp */}

          <input
            type="checkbox"
            data-type="checkbox"
            data-field="isSelected"
            data-value={isSelected || false}
            onClick={handleChange}
          />
          <span
            data-field="isStar"
            data-value={isStar || false}
            onClick={handleChange}
          >
            {starActive}
          </span>
          <span>{from}</span>
          <span>{subject}</span>
          <span>{body}</span>
          {/* createdAt || sentAt */}
          <span>{new Date(createdAt).toLocaleDateString('he')}</span>
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

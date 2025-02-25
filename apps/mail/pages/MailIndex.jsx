// TODOs:
// MailIndex

// MailFilterSearch
// MailFilterBar

// UNTIL THIRSDAY :
// Do more Branches
// orginze the code with MailsList ...
// crud - add and delete mails
// css for the mails

// filter from the search bar and navBar
// Update mail in draft
// notes for Neama in the github (insie the projects)
// create in the NoteIndex the basic functions for Neama to start

import { mailService } from '../services/mail.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFilterBar } from '../cmps/MailFilterBar.jsx'
import { MailList } from '../cmps/MailList.jsx'

const { useState, useEffect, useRef } = React

const { useNavigate, useSearchParams, Link, Outlet } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState(null)
  console.log('mails: ', mails)

  // const [filterBy, setFilterBy] = useState(searchParams)
  const [filterBy, setFilterBy] = useState({})

  // const [mailId, setMailId] = useState('')
  // const [mailsSelected, setMailsSelected] = useState([])

  const [selectedComp, setSelectedComp] = useState('index')
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.log('Could not get the Mails Data: ', err)
      })
  }

  function getSelectedComp() {
    const compsMap = {
      compose: <MailCompose />,
      index: <MailList />,
      star: <div>Star</div>,
      sent: <div>sent</div>,
      draft: <div>draft</div>,
      trash: <div>trash</div>
    }
    return compsMap[selectedComp]
  }

  function onRemove(mailId) {
    console.log('remove')
  }

  function handleChange({ target }) {
    let { id, type, field } = target.dataset
    console.log('handle: ', id, type, field)

    // Fix bug
    setMails((prevMails) => {
      prevMails.map((mail) => {
        if (mail.id === id) {
          mailService
            .save(mail)
            .then((mail) => console.log('The mail has been updated: ', mail))
            .catch((err) =>
              console.log('The mail has Not been updated: ', err)
            )

          return { ...mail, [field]: mail }
        } else return mail
        //  return mail.id === id ? {...mail, [field] : mail} : mail
      })
    })

    //TODO find mail with id and change it with setMail

    // mail[field] = !mail[field]

    // if (type === 'checkbox') mail[field] = target.checked

    // setMail((prevMail) => ({ ...prevMail, [field]: mail[field] }))

    // mailService
    //   .save(mail)
    //   .then((mailSaved) => console.log('The mail has been updated '))
    //   .catch((err) => console.log('The mail has NOT been updated ', err))

    // TODO:
    // find mail
    // update mail
    // save and return mail

    // render the mail
    // update the mail into the mails service
  }

  if (!mails) return <div>Loading...</div>

  return (
    <section className="mail-index-container">
      <MailHeader setIsWide={setIsWide} />

      <main>
        <MailFilterBar onHandleSelect={setSelectedComp} />

        {/* {getSelectedComp()} no need because I use Link */}

        <MailList
          mails={mails}
          handleChange={handleChange}
          onRemove={onRemove}
        />

        <Outlet />
      </main>
    </section>
  )
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

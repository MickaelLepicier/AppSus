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
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect, useRef } = React

const { useNavigate, useSearchParams, Link, Outlet } = ReactRouterDOM

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [mails, setMails] = useState(null)
  // console.log('mails: ', mails)

  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

  // const [mailId, setMailId] = useState('')
  // const [mailsSelected, setMailsSelected] = useState([])

  const [selectedComp, setSelectedComp] = useState('index')
  const [isWide, setIsWide] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams(filterBy)
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.log('Could not get the Mails Data: ', err)
      })
  }

  function onRemove(mailId) {
    const mail = mails.find((mail) => mail.id === mailId)
    if (!mail) {
      console.log('Failed to find the mail')
      return
    }

    if (!mail.removedAt) {
      const updatedMail = { ...mail, removedAt: true }

      setMails((prevMails) => prevMails.map((mail) => (mail.id === mailId ? updatedMail : mail)))

      mailService
        .save(updatedMail)
        .then((mail) => {
          // console.log('Mail Updated', mail)

          showSuccessMsg('Mail has been removed to Trash')
        })
        .catch((err) => {
          console.log('Fail to Update', err)
          showErrorMsg('Mail has not been Deleted')
          navigate('/mail')
        })
      return
    }

    mailService
      .remove(mailId)
      .then(() => {
        setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
        showSuccessMsg('Mail has been Deleted')
      })
      .catch((err) => {
        console.log('Fail to delete the mail', err)
        showErrorMsg('Fail to delete the mail')
        // navigate('/mail')
      })
  }

  function handleChange({ target }) {
    let { type, name: field, value } = target
    const id = target.dataset.id

    if (type === 'checkbox') value = target.checked
    // console.log(type, field, value);

    setMails((prevMails) => {
      return prevMails.map((mail) => (mail.id === id ? { ...mail, [field]: value } : mail))
    })

    const mail = mails.find((mail) => mail.id === id)
    if (!mail) {
      console.log('Could not find the mail')
      return
    }

    const updatedMail = { ...mail, [field]: value }

    mailService
      .save(updatedMail)
      .then((mail) => console.log('The mail has been updated: '))
      .catch((err) => console.log('Failed to updated the mail: ', err))
  }

  if (!mails) return <div>Loading...</div>

  return (
    <section className="mail-index-container">
      <MailHeader setIsWide={setIsWide} />

      <main>
        <MailFilterBar onHandleSelect={setSelectedComp} />

        <Outlet context={{ mails, handleChange, onRemove }} />
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

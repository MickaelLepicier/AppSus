// TODOs:
// MailFilter
// MailNavBar
// MailIndex


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
import { MailIndex } from '../cmps/MailIndex.jsx'
import { MailNavBar } from '../cmps/MailNavBar.jsx'

const { useState, useEffect, useRef } = React

const { useNavigate, Link, useSearchParams } = ReactRouterDOM


export function MailPage() {


  
  const [mails, setMails] = useState([])
  // console.log('mails: ',mails)

  // const [filterBy, setFilterBy] = useState(searchParams)
  const [filterBy, setFilterBy] = useState({})
  const [selectedComp, setSelectedComp] = useState('index')
  const [mailId, setMailId] = useState('')

  const [mailsSelected, setMailsSelected] = useState([])
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
      compose: <MailCompose mailId={mailId} />,
      index: <MailIndex mails={mails} setMails ={setMails}/>,
      star: <div>Star</div>,
      sent: <div>sent</div>,
      draft: <div>draft</div>,
      trash: <div>trash</div>
    }
    return compsMap[selectedComp]
  }

  return (
    <section className="mail-page-container">
      <MailHeader setIsWide={setIsWide} />

      <main>
        <MailNavBar onHandleSelect={setSelectedComp} />

        {getSelectedComp()}
      </main>
    </section>
  )
}

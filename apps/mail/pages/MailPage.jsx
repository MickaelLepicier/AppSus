// TODOs:
// MailFilter
// MailNavBar
// MailIndex

import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailIndex } from '../cmps/MailIndex.jsx'
import { MailNavBar } from '../cmps/MailNavBar.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect, useRef } = React

const { useNavigate, Link, useSearchParams } = ReactRouterDOM

// TODO make MailIndex - look at bookIndex

export function MailPage() {
  const [mails, setMails] = useState([])

  // const [filterBy, setFilterBy] = useState(searchParams)
  const [filterBy, setFilterBy] = useState({})
  const [selectedComp, setSelectedComp] = useState('index')
  const [mailId, setMailId] = useState()

  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.log('Could not get the Books Data: ', err)
      })
  }

  function getSelectedComp() {
    const compsMap = {
      compose: <MailCompose mailId={mailId} />,
      index: <MailIndex />,
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

import { MailList } from './MailList.jsx'

const { useState, useEffect, useRef } = React

const { useNavigate, useSearchParams, useOutletContext, Link } = ReactRouterDOM

export function MailInbox() {
  const { mails, handleChange, onRemove } = useOutletContext()

  const filteredMails = getFilteredMails(mails, 'removedAt', null)

  if (!filteredMails || !filteredMails.length) return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList mails={filteredMails} handleChange={handleChange} onRemove={onRemove} />
    </section>
  )
}
export function MailStarred() {
  const { mails, handleChange, onRemove } = useOutletContext()

  let filteredMails = getFilteredMails(mails, 'isStar', true)
  filteredMails = getFilteredMails(filteredMails, 'removedAt', null)

  if (!filteredMails || !filteredMails.length) return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList mails={filteredMails} handleChange={handleChange} onRemove={onRemove} />
    </section>
  )
}

export function MailSent() {
  const { mails, handleChange, onRemove } = useOutletContext()

  // loggedinUser.email = 'user@appsus.com'
  let filteredMails = getFilteredMails(mails, 'from', 'user@appsus.com')
  filteredMails = getFilteredMails(filteredMails, 'removedAt', null)

  if (!filteredMails || !filteredMails.length) return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList mails={filteredMails} handleChange={handleChange} onRemove={onRemove} />
    </section>
  )
}

export function MailTrash() {
  const { mails, handleChange, onRemove } = useOutletContext()

  const filteredMails = getFilteredMails(mails, 'removedAt', true)

  if (!filteredMails || !filteredMails.length) return <div>There are no mails in the trash</div>

  return (
    <section className="trash-container">
      <MailList mails={filteredMails} handleChange={handleChange} onRemove={onRemove} />
    </section>
  )
}

function getFilteredMails(mails, field, booleon) {
  return mails.filter((mail) => mail[field] === booleon)
}

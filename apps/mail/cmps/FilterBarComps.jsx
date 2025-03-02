import { MailList } from './MailList.jsx'

const { useState, useEffect, useRef } = React

const { useNavigate, useSearchParams, useOutletContext, Link } = ReactRouterDOM

export function MailInbox() {
  const { mails, handleChange, onRemove } = useOutletContext()

  let filteredMails = getFilteredMails(mails, 'from', 'user@appsus.com', false)
  filteredMails = getFilteredMails(filteredMails, 'removedAt', null)
  filteredMails = getFilteredMails(mails, 'isDraft', false)

  // if(mail.from === 'user@appsus.com') return

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
      />
    </section>
  )
}
export function MailStarred() {
  const { mails, handleChange, onRemove } = useOutletContext()

  let filteredMails = getFilteredMails(mails, 'isStar', true)
  filteredMails = getFilteredMails(filteredMails, 'removedAt', null)

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
      />
    </section>
  )
}

export function MailSent() {
  const { mails, handleChange, onRemove } = useOutletContext()

  // loggedinUser.email = 'user@appsus.com'
  let filteredMails = getFilteredMails(mails, 'from', 'user@appsus.com')
  filteredMails = getFilteredMails(filteredMails, 'removedAt', null)

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
      />
    </section>
  )
}

export function MailDraft() {
  const { mails, handleChange, onRemove, openCompose } = useOutletContext()

  // loggedinUser.email = 'user@appsus.com'
  let filteredMails = getFilteredMails(mails, 'isDraft', true)
  filteredMails = getFilteredMails(filteredMails, 'removedAt', null)

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="draft-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
        openCompose={openCompose}
      />
    </section>
  )
}

export function MailTrash() {
  const { mails, handleChange, onRemove } = useOutletContext()

  const filteredMails = getFilteredMails(mails, 'removedAt', true)

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails in the trash</div>

  return (
    <section className="trash-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
      />
    </section>
  )
}

function getFilteredMails(mails, field, boolean, isEqual = true) {
  if (isEqual) return mails.filter((mail) => mail[field] === boolean)
  else return mails.filter((mail) => mail[field] !== boolean)
}

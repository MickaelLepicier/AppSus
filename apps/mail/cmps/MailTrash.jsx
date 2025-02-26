import { MailList } from './MailList.jsx'

const { useState, useEffect, useRef } = React

const { useNavigate, useSearchParams, useOutletContext, Link } = ReactRouterDOM

export function MailTrash() {
  const { mails, handleChange, onRemove } = useOutletContext()

  // TODOs:
  // Understand how the filter is working and then keep going

  // bring all the mails
  // filter them at the MailList

  console.log('mails: ', mails)
  return <div>Trash</div>
}

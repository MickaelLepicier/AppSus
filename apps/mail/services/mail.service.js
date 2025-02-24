import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

// const {loadFromStorage, saveToStorage, makeId, makeLorem, getRandomIntInclusive} = utilService

const MAIL_KEY = 'mailDB'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createMails()

export const mailService = {
  query,
  get,
  post,
  put,
  remove,
  save,
  getEmptyMail,
  getDefaultFilter,
  getFilterFromSearchParams
}

window.ms = mailService

const mailsData = [
  {
    id: 'e101',
    createdAt: 1551133930500,
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStar: false,
    isSelected: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e102',
    createdAt: 1551133930500,
    subject: 'SECOND MAIL!',
    body: 'You are amazing and yada yada!!',
    isRead: false,
    isStar: false,
    isSelected: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'bobo@bobo.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e103',
    createdAt: 1551133930500,
    subject: 'THIRD MAIL',
    body: 'YuGiOh for all time longgggg!!',
    isRead: false,
    isStar: false,
    isSelected: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'roro@roro.com',
    to: 'user@appsus.com'
  }
]

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (!mails || !mails.length) {
      mails = mailsData
      utilService.saveToStorage(MAIL_KEY, mails)
    }

    const filteredMails = [...mails]

    // Filter functionality
    // if(...)

    return filteredMails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function post(newEntity) {
  return storageService.post(MAIL_KEY, newEntity)
}

function put(updatedEntity) {
  return storageService.put(MAIL_KEY, updatedEntity)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    // console.log('put');
    return put(mail)
  } else {
    // console.log('post');
    return post(mail)
  }
}

function getEmptyMail(
  createdAt = '',
  subject = '',
  body = '',
  isRead = false,
  sentAt = '',
  removedAt = null,
  from = '',
  to = ''
) {
  return {
    createdAt,
    subject,
    body,
    isRead,
    sentAt,
    removedAt,
    from,
    to
  }
}

function getDefaultFilter() {
  return { status: '', txt: '', isRead: false, isStared: false, lables: [] }
}

// const filterBy = {
//   status: 'inbox/sent/trash/draft',
//   txt: 'puki',
//   isRead: true,
//   isStared: true,
//   lables: ['important', 'romantic']
// }

function getFilterFromSearchParams() {}

function _createMails() {
  const mails = utilService.loadFromStorage(MAIL_KEY) || []

  if (mails || mails.length) return

  for (let i = 0; i < 20; i++) {
    const mail = {
      id: utilService.makeId(),
      createdAt: 1551133930500,
      subject: utilService.makeLorem(2),
      body: utilService.makeLorem(10),
      isRead: false,
      isStar: false,
      isSelected: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com'
    }
    mails.push(mail)
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}

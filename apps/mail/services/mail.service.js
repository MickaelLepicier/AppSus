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

// TODO no need for isDraft I have sentAt for this
// removedAt is not true but timestemp
const mailsData = [
  {
    id: 'e101',
    createdAt: 1551133930500,
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStar: false,
    isSelected: false,
    isDraft: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e102',
    createdAt: 1551133930500,
    subject: 'SECOND MAIL!',
    body: 'You are amazing and mikey Miss you!!',
    isRead: false,
    isStar: false,
    isSelected: false,
    isDraft: false,
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
    isDraft: false,
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

    let filteredMails = [...mails]

    if (filterBy.subject) {
      const regExp = new RegExp(filterBy.subject, 'i')

      filteredMails = filteredMails.filter(
        (mail) =>
          regExp.test(mail.subject) ||
          regExp.test(mail.body) ||
          regExp.test(mail.from)
      )
    }

    // if(!filterBy.removedAt){
    //   console.log('removedAt: False')
    //   filteredMails = filteredMails.filter(mail=> mail.removedAt === null)

    // } else if(filterBy.removedAt){
    //   console.log('removedAt: True')

    //   filteredMails = filteredMails.filter(mail=> mail.removedAt === true)
    // }

    // console.log('filteredMails: ', filteredMails)
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
  console.log('mail: ',mail);
  if (mail.id) {
    // console.log('put');
    return put(mail)
  } else {
    // console.log('post');
    return post(mail)
  }
}

function getEmptyMail(to = '', subject = '', body = '') {
  return {
    // id: utilService.makeId(),
    createdAt: Date.now(),
    subject,
    body,
    isRead: false,
    isStar: false,
    isSelected: false,
    isDraft: false,
    sentAt: Date.now(),
    removedAt: null,
    from: loggedinUser.email,
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

function getFilterFromSearchParams(searchParams) {

  const subject = searchParams.get('subject') || ''

  return { subject }
  // return {removedAt}
}

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
      isDraft: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com'
    }
    mails.push(mail)
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}

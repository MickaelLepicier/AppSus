export function MailNavBar({ onHandleSelect }) {
  // TODO
  // make ['Inbox', 'Starred'...].map(....) or with a function
  // put inbox as a default

  return (
    <section className="mail-navBar-container">
      <button className="compose-btn" onClick={() => onHandleSelect('compose')}>
        <i className="fas fa-pen"></i> Compose
      </button>

      <p onClick={() => onHandleSelect('index')}>
        <img src="/apps/mail/img/icon/inbox.png" alt="icon-img" />
        <span>Inbox</span>
      </p>

      <p onClick={() => onHandleSelect('star')}>
        <img src="/apps/mail/img/icon/star.png" alt="icon-img" />
        <span>Starred</span>
      </p>

      <p value="sent">
        <img src="/apps/mail/img/icon/sent.png" alt="icon-img" />
        <span>Sent</span>
      </p>

      <p value="draft">
        <img src="/apps/mail/img/icon/draft.png" alt="icon-img" />
        <span>Draft</span>
      </p>

      <p value="trash">
        <img src="/apps/mail/img/icon/trash.png" alt="icon-img" />
        <span>Trash</span>
      </p>
    </section>
  )
}

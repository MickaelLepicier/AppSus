const { useNavigate, Link, useSearchParams } = ReactRouterDOM

export function MailFilterBar({ onHandleSelect }) {
  // TODO
  // make ['Inbox', 'Starred'...].map(....) or with a function
  // put inbox as a default

  return (
    <section className="mail-filterBar-container">
      {/* no need - onHandleSelect('compose') because I use Link */}
      <Link to="/mail/edit">
        {/* <button className="compose-btn" onClick={() => onHandleSelect('compose')}> */}
        <button className="compose-btn">
          <i className="fas fa-pen"></i> Compose
        </button>
      </Link>

      <Link to="/mail/inbox">
        <p>
          <img src="/apps/mail/img/icon/inbox.png" alt="icon-img" />
          <span>Inbox</span>
        </p>
      </Link>

      <Link to="/mail/starred">
        <p>
          <img src="/apps/mail/img/icon/star.png" alt="icon-img" />
          <span>Starred</span>
        </p>
      </Link>

      <Link to="/mail/sent">
        <p>
          <img src="/apps/mail/img/icon/sent.png" alt="icon-img" />
          <span>Sent</span>
        </p>
      </Link>

      <Link to="/mail/edit:mailId">
        <p>
          <img src="/apps/mail/img/icon/draft.png" alt="icon-img" />
          <span>Draft</span>
        </p>
      </Link>

      <Link to="/mail/trash">
        <p>
          <img src="/apps/mail/img/icon/trash.png" alt="icon-img" />
          <span>Trash</span>
        </p>
      </Link>
    </section>
  )
}

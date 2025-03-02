import { MailFilterSearch } from './MailFilterSearch.jsx'

export function MailHeader({ setIsWide, filterBy, onSetFilter }) {
 
function test(){
  // test test
}

  return (
    <section className="mail-header">
      <i
        className="fas fa-bars wide-btn"
        onClick={() => setIsWide(!isWide)}
      ></i>

      <h1 className="logo-container">
        <img src="apps/mail/img/logo.png" alt="logo-img" />
        <span> Gmail</span>
      </h1>

      <MailFilterSearch filterBy={filterBy} onSetFilter={onSetFilter}/>
    </section>
  )
}

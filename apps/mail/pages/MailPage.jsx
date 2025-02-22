

// TODOs:
// NavBar
// MailFilter
// MailIndex

const {useState, useEffect, useRef} = React

export function MailPage() {

    const [isWide, setIsWide] = useState(false)

  return <section className="mail-page-container">

    <i className="fas fa-bars" onClick={()=> setIsWide(!isWide)}></i>
    {/* Gmail logo*/}
    {/* FilterBar*/}
  </section>
}

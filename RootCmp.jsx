const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mail" element={<MailIndex />}>
              <Route path="/mail/edit" element={<MailCompose />} />
              <Route path="/mail/edit:mailId" element={<MailCompose />} />
            </Route>
            <Route path="/note" element={<NoteIndex />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}

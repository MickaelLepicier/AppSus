const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { MailList } from './apps/mail/cmps/MailList.jsx'
import { MailStarred } from './apps/mail/cmps/MailStarred.jsx'
import { MailSent } from './apps/mail/cmps/MailSent.jsx'
import { MailTrash } from './apps/mail/cmps/MailTrash.jsx'


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
              <Route path="/mail/inbox" element={<MailList />} />
              <Route path="/mail/starred" element={<MailStarred />} />
              <Route path="/mail/sent" element={<MailSent />} />
              <Route path="/mail/trash" element={<MailTrash />} />
            
            </Route>
            <Route path="/note" element={<NoteIndex />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}

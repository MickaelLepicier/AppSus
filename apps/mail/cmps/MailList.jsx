import { MailPreview } from './MailPreview.jsx'

const { Fragment } = React

// const {useOutletContext} = ReactRouterDOM


export function MailList({ mails, handleChange, onRemove }) {

if(!mails) return <div>Loading...</div>

  return (
    <section className="mail-items">
      {mails.map((mail) => {

        return (
          <Fragment key={mail.id}>
             {/* TODO - input type="checkbox" to catch all */}
            <MailPreview
              mail={mail}
              onRemove={onRemove}
              handleChange={handleChange}
            />

            {/* <button className="mail-delete" onClick={() => onRemove(id)}>🗑️</button> */}
          </Fragment>
        )
      })}
    </section>
  )
}

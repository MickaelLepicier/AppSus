import { MailPreview } from './MailPreview.jsx'

const { Fragment } = React

export function MailList({ mails, handleChange, onRemove }) {
  // TODO change the malis state instead of creating for each mail new state
  // Orgenize the code with copms

if(!mails) return <div>Loading</div>

  return (
    <section className="mail-items">
      {mails.map((mail) => {

        return (
          <Fragment key={mail.id}>
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

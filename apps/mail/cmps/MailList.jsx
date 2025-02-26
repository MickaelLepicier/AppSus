import { MailPreview } from './MailPreview.jsx'

const { Fragment } = React

const {useOutletContext} = ReactRouterDOM


export function MailList() {
  // TODO change the malis state instead of creating for each mail new state
  // Orgenize the code with copms

 const { mails, handleChange, onRemove } = useOutletContext()
  // console.log('mails: ',mails)
  
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

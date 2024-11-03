import classes from './Ticket.module.scss'

const Ticket = ({ ticket }) => {
  const price = String(ticket.price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
  const stops = (num) => {
    switch (num) {
      case 1:
        return 'ПЕРЕСАДКА'
      case 2:
      case 3:
      case 4:
        return 'ПЕРЕСАДКИ'
      default:
        return 'ПЕРЕСАДОК'
    }
  }
  const formatDate = (hour, min, indicateHandM = false) => {
    if (indicateHandM) {
      return `${hour < 10 ? `0${hour}` : hour}ч  ${min < 10 ? `0${min}` : min}м`
    }
    return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
  }

  const formatDuration = (duration) => {
    const hours = Math.trunc(duration / 60)
    const min = duration % 60
    return formatDate(hours, min, true)
  }

  const startTime = (startDate) => {
    const date = new Date(startDate)
    const hours = date.getHours()
    const min = date.getMinutes()
    return formatDate(hours, min)
  }

  const finishTime = (startDate, duration) => {
    const date = new Date(startDate)
    let hours = date.getHours() + Math.trunc(duration / 60)
    const min = (date.getMinutes() + duration) % 60
    if (hours > 24) hours -= 24

    return formatDate(hours, min)
  }

  return (
    <div className={classes.ticket}>
      <div className={classes['price-and-carrier']}>
        <div className={classes.price}>{price}</div>
        <img className={classes.carrier} alt="logo" src={`//pics.avs.io/99/36/${ticket.carrier}.png`} />
      </div>
      <div className={classes['there-segment']}>
        <div className={classes['ticket_1-c']}>
          <div className={classes['ticket_style-f-line']}>
            {ticket.thereOrigin} - {ticket.thereDestination}
          </div>
          <div className={classes['ticket_style-s-line']}>
            {startTime(ticket.thereDate)} - {finishTime(ticket.thereDate, ticket.thereDuration)}
          </div>
        </div>
        <div className={classes['ticket_2-c']}>
          <div className={classes['ticket_style-f-line']}>В ПУТИ</div>
          <div className={classes['ticket_style-s-line']}>{formatDuration(ticket.thereDuration)}</div>
        </div>
        <div className={classes['ticket_3-c']}>
          <div className={classes['ticket_style-f-line']}>
            {ticket.thereStops.length} {stops(ticket.thereStops.length)}
          </div>
          <div className={classes['ticket_style-s-line']}>{ticket.thereStops.join(', ')}</div>
        </div>
      </div>
      <div className={classes['back-segment']}>
        <div className={classes['ticket_1-c']}>
          <div className={classes['ticket_style-f-line']}>
            {ticket.thereDestination} - {ticket.thereOrigin}
          </div>
          <div className={classes['ticket_style-s-line']}>
            {startTime(ticket.backDate)} - {finishTime(ticket.backDate, ticket.backDuration)}
          </div>
        </div>
        <div className={classes['ticket_2-c']}>
          <div className={classes['ticket_style-f-line']}>В ПУТИ</div>
          <div className={classes['ticket_style-s-line']}>{formatDuration(ticket.backDuration)}</div>
        </div>
        <div className={classes['ticket_3-c']}>
          <div className={classes['ticket_style-f-line']}>
            {ticket.backStops.length} {stops(ticket.backStops.length)}
          </div>
          <div className={classes['ticket_style-s-line']}>{ticket.backStops.join(', ')}</div>
        </div>
      </div>
    </div>
  )
}

export default Ticket

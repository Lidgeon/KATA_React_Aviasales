import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import { showMoreTickets } from './../../../actions'
import classes from './MoreTicketButton.module.scss'

const MoreTicketButton = () => {
  const dispatch = useDispatch()
  const onClickButtonMoreTickets = () => {
    dispatch(showMoreTickets())
  }

  return (
    <Button className={classes['more-tickets']} type="primary" block onClick={onClickButtonMoreTickets}>
      Показать еще 5 билетов!
    </Button>
  )
}

export default MoreTicketButton

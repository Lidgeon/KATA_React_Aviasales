import { Radio } from 'antd'
import { useDispatch } from 'react-redux'
//import { useEffect } from 'react'

import { lowPrice, mostFast, optimal } from './../../../actions'
import classes from './PriceFilter.module.scss'

const PriceFilter = () => {
  // const sortedFilter = useSelector((state) => state.priceFilterReducer.value)
  // const selectedFilters = useSelector((state) => state.transferFilterReducer.checkedList)

  const dispatch = useDispatch()
  const onClickLowPrice = () => {
    dispatch(lowPrice())
  }
  const onClickMostFast = () => {
    dispatch(mostFast())
  }
  const onClickOptimal = () => {
    dispatch(optimal())
  }

  // useEffect(() => {
  //   dispatch(sortedTickets(sortedFilter))
  // }, [sortedFilter, selectedFilters])

  return (
    <div>
      <Radio.Group className={classes['price-filter']} block optionType="button" buttonStyle="solid" size="large">
        <Radio.Button value="Самый дешевый" onClick={onClickLowPrice}>
          Самый дешевый
        </Radio.Button>
        <Radio.Button value="Самый быстрый" onClick={onClickMostFast}>
          Самый быстрый
        </Radio.Button>
        <Radio.Button value="Оптимальный" onClick={onClickOptimal}>
          Оптимальный
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default PriceFilter

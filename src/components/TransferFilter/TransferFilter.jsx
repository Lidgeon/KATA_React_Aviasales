import { Checkbox } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { inputCheckbox } from './../../actions'
import classes from './TransferFilter.module.scss'

const TransferFilter = () => {
  const selectedFilters = useSelector((state) => state.transferFilterReducer.checkedList)
  const dispatch = useDispatch()

  const CheckboxGroup = Checkbox.Group
  const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']

  const [checkedList, setCheckedList] = useState(selectedFilters)

  const checkAll = plainOptions.length === checkedList.length
  const onChangeTransferFilter = (list) => {
    dispatch(inputCheckbox(list))
    setCheckedList(list)
  }

  const onAllChangeTransferFilter = (e) => {
    dispatch(inputCheckbox(e.target.checked ? plainOptions : []))
    setCheckedList(e.target.checked ? plainOptions : [])
  }

  return (
    <div className={classes['transfer-filter']}>
      <span className={classes['transfer-filter__title']}>Количество пересадок</span>
      <Checkbox onChange={onAllChangeTransferFilter} checked={checkAll}>
        Все
      </Checkbox>
      <CheckboxGroup
        className={classes['transfer-filter__checkbox']}
        options={plainOptions}
        value={checkedList}
        onChange={onChangeTransferFilter}
      />
    </div>
  )
}

export default TransferFilter

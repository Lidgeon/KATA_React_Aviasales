import { Radio } from 'antd'
import { connect } from 'react-redux'

import { lowPrice, mostFast, optimal } from './../../../actions'
import classes from './PriceFilter.module.scss'

const PriceFilter = (props) => {
  //console.log('выбрана кнопка ' + props.value)
  return (
    <div>
      <Radio.Group className={classes['price-filter']} block optionType="button" buttonStyle="solid" size="large">
        <Radio.Button value="Самый дешевый" onClick={props.lowPrice}>
          Самый дешевый
        </Radio.Button>
        <Radio.Button value="Самый быстрый" onClick={props.mostFast}>
          Самый быстрый
        </Radio.Button>
        <Radio.Button value="Оптимальный" onClick={props.optimal}>
          Оптимальный
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}

//через connect

const mapStateToProps = (state) => {
  const { priceFilterReducer } = state
  return {
    value: priceFilterReducer.value,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    lowPrice: () => dispatch(lowPrice()),
    mostFast: () => dispatch(mostFast()),
    optimal: () => dispatch(optimal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter)

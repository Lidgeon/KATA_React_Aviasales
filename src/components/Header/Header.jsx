import logo from '../../resourсes/logo.png'

import classes from './Header.module.scss'

const Header = () => {
  return (
    <header className={classes['header']}>
      <img src={logo} className={classes['logo']} />
    </header>
  )
}

export default Header

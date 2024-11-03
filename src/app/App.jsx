import Header from '../components/Header/Header'
import MainList from '../components/MainList/MainList'
import TransferFilter from '../components/TransferFilter/TransferFilter'

import classes from './App.module.scss'

const App = () => {
  return (
    <section className={classes.app}>
      <Header />
      <main className={classes['ticket-app']}>
        <TransferFilter />
        <MainList />
      </main>
    </section>
  )
}

export default App

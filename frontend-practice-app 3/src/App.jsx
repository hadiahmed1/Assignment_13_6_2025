import React from 'react'
import './assets/styles.scss'
import Header from './header'
import Footer from './footer'
import UserTable from './userTable'


function App() {
  return (
    <>
      <Header />
      <div className='main_page_holder'>
        <div className='table_outer_holder'>
          <UserTable />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App

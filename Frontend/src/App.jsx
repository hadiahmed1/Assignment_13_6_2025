import React from 'react'
import './assets/styles.scss'
import Header from './header'
import Footer from './footer'
import UserTable from './userTable'
import { Route, Routes } from 'react-router-dom'
import FilmInfo from './component/FilmInfo'


function App() {
  return (
    <>
      <Header />
      <div className='main_page_holder'>
        <div className='table_outer_holder'>
          <Routes>
            <Route index element={<UserTable />} />
            <Route path='/filminfo/:id' element={<FilmInfo />} />
          </Routes>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default App

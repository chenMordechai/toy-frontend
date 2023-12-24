// import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useState } from 'react';
import './assets/style/main.scss'

import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { store } from './store/store'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { AppHeader } from './cpms/AppHeader'
import { NavSide } from './cpms/NavSide'
import { CategoryList } from './cpms/CategoryList'
// import { Signup } from './pages/Signup'
import { ReviewExplore } from './pages/ReviewExplore'
import { UserDetails } from './pages/UserDetails'

export function App() {

  const [isScreenOpen, setIsScreenOpen] = useState(false)

  function onOpenScreen(){
    setIsScreenOpen(true)
  }

  function onCloseScreen(){
    setIsScreenOpen(false)
  }

  return (
    <Provider store={store}>
      <Router>
        <section className={'main-layout app ' + (isScreenOpen?'screen-open':'')}>
        <section className="screen" onClick={onCloseScreen}></section>
          <AppHeader isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} />
          <NavSide />
          <CategoryList />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              {/* <Route element={<Signup />} path="/signup" /> */}
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<About />} path="/about" />
              <Route element={<Blog />} path="/blog" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<UserDetails />} path="/user/:userId" />
              <Route element={<ReviewExplore />} path="/review" />
              {/* <Route element={<h1 >Not Found..</h1>} path="*" /> */}
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
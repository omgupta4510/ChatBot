import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from "../src/components/Header"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

const App = () => {
  const auth=useAuth();
  return (
    <main>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            { auth?.isLoggedIn && auth.user && <Route path="/chat" element={<Chat/>}/>}
            <Route path="*" element={<Home/>}/>
        </Routes>
    </main>
  )
}

export default App
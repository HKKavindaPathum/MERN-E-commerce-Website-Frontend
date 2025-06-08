import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
//import Header from './components/header'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'

function App() {
 

  return (
    <BrowserRouter>
      <div >
        <Toaster position='top-right'/>
        {/* <Header/> */}
        <Routes path="/*">
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/signup" element={<RegisterPage/>}/>
          <Route path="/testing" element={<TestPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/*' element={<HomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
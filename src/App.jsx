import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
//import Header from './components/header'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPassword'

function App() {
 

  return (
    <GoogleOAuthProvider clientId="710310374914-k2ppkh6c549gqq13qg35ltkv8phb7prr.apps.googleusercontent.com">
      <BrowserRouter>
        <div >
          <Toaster position='top-right'/>
          {/* <Header/> */}
          <Routes path="/*">
            <Route path='/login' element={<LoginPage/>}/>
            <Route path="/forget" element={<ForgetPasswordPage/>}/>
            <Route path="/signup" element={<RegisterPage/>}/>
            <Route path="/testing" element={<TestPage/>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
            <Route path='/*' element={<HomePage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  )
}

export default App
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import { Routes, Route,Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

const App = () => {
  return (
    <>
      <SignedIn>
        <Routes>

          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/auth'
            element={<Navigate to={'/'} replace/>}
          />

        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route
            path='/auth'
            element={<AuthPage />}        
          /> 
          <Route
            path='*'
            element={<Navigate to={'/auth'} replace />}
          />
        </Routes>
      </SignedOut>
    </>
  )
}

export default App

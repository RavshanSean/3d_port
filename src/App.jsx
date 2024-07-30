import { Route, BrowserRouter as Router, Routes } from 
'react-router-dom';

import { Home, SignIn, Projects, SignUp } from './pages';
import Navbar from './components/Navbar';

const App = () => {
  return (
      <main className='bg-slate-300/20'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </main>
  )
}

export default App
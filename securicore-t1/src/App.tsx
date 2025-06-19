import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {

  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const toggleDark = () => setDark(!dark);

  return (
    <Router>
      <Routes>
    <Route path="/login" element={<Login dark={dark} toggleDark={toggleDark} />} />
        <Route path="/home" element={<Home dark={dark} toggleDark={toggleDark} />} />
        <Route path="*" element={<Login dark={dark} toggleDark={toggleDark} />} />
      </Routes>
    </Router>
  )
}

export default App

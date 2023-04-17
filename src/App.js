import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import HotelList from './pages/HotelList'
import Hotel from './pages/Hotel';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<HotelList />} />
        <Route path='/hotels/:id' element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;

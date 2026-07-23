import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Amenities from './pages/Amenities'
import Calendar from './pages/Calendar'
import Location from './pages/Location'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="amenities" element={<Amenities />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="location" element={<Location />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
